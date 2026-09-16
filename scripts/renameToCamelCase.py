#!/usr/bin/env python3
"""Rename Customer 360 files/folders to camelCase (no underscores) and update references."""

from __future__ import annotations

import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

TEXT_EXTENSIONS = {
    ".js", ".html", ".css", ".xml", ".md", ".json", ".py", ".csv", ".txt", ".yaml", ".yml"
}

# Explicit filename mappings (old basename without path -> new basename)
FILENAME_MAP = {
    "c360LwcDtoInventory.csv": "c360LwcDtoInventory.csv",
    "c360LwcDtoInventory.xlsx": "c360LwcDtoInventory.xlsx",
    "handoffChecklist.md": "handoffChecklist.md",
    "orgWiringRunbook.md": "orgWiringRunbook.md",
    "planSummary.md": "planSummary.md",
    "moduleRegistry.md": "moduleRegistry.md",
    "moduleSpec.md": "moduleSpec.md",
    "apexMergeGuide.md": "apexMergeGuide.md",
    "packageLwc.xml": "packageLwc.xml",
    "restoreLog.txt": "restoreLog.txt",
    "generateDtoInventory.py": "generateDtoInventory.py",
    "restoreLwcHtml.py": "restoreLwcHtml.py",
    "sanitizeDtoInventory.py": "sanitizeDtoInventory.py",
    "renameToCamelCase.py": "renameToCamelCase.py",  # self stays camelCase already
}

CONTENT_REPLACEMENTS = [
    ("ex05", "ex05"),
    ("", ""),
    ("customer360-salesforce", "customer360-salesforce"),
    ("classesStubs", "classesStubs"),
    ("packageLwc", "packageLwc"),
    ("c360LwcDtoInventory", "c360LwcDtoInventory"),
    ("handoffChecklist", "handoffChecklist"),
    ("orgWiringRunbook", "orgWiringRunbook"),
    ("planSummary", "planSummary"),
    ("moduleRegistry", "moduleRegistry"),
    ("moduleSpec.md", "moduleSpec.md"),
    ("moduleSpec", "moduleSpec"),
    ("apexMergeGuide", "apexMergeGuide"),
    ("generateDtoInventory.py", "generateDtoInventory.py"),
    ("restoreLwcHtml.py", "restoreLwcHtml.py"),
    ("sanitizeDtoInventory.py", "sanitizeDtoInventory.py"),
    ("restoreLog.txt", "restoreLog.txt"),
    ("(ex05)", "(ex05)"),
]


def lwc_name(name: str) -> str:
    if "" in name:
        return name.replace("", "")
    return name


def should_process_file(path: Path) -> bool:
    if path.suffix.lower() in TEXT_EXTENSIONS:
        return True
    if path.suffix == "" and path.name in FILENAME_MAP:
        return True
    return False


def update_file_contents(path: Path) -> None:
    if not should_process_file(path):
        return
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return
    original = text
    for old, new in CONTENT_REPLACEMENTS:
        text = text.replace(old, new)
    if text != original:
        path.write_text(text, encoding="utf-8", newline="\n")


def new_filename(name: str) -> str | None:
    if name in FILENAME_MAP:
        mapped = FILENAME_MAP[name]
        if mapped == name:
            return None
        return mapped
    if "" in name:
        return lwc_name(name)
    return None


def collect_renames() -> list[tuple[Path, Path]]:
    renames: list[tuple[Path, Path]] = []
    for dirpath, dirnames, filenames in os.walk(ROOT, topdown=False):
        root_path = Path(dirpath)
        for filename in filenames:
            new_name = new_filename(filename)
            if new_name and new_name != filename:
                renames.append((root_path / filename, root_path / new_name))
        for dirname in list(dirnames):
            new_dir = new_filename(dirname)
            if not new_dir and "" in dirname:
                new_dir = lwc_name(dirname)
            elif dirname == "classesStubs":
                new_dir = "classesStubs"
            if new_dir and new_dir != dirname:
                renames.append((root_path / dirname, root_path / new_dir))
    return renames


def main() -> None:
    for dirpath, _, filenames in os.walk(ROOT):
        for filename in filenames:
            update_file_contents(Path(dirpath) / filename)

    renames = collect_renames()
    # deepest paths first
    renames.sort(key=lambda pair: len(str(pair[0])), reverse=True)
    for src, dst in renames:
        if src.exists() and not dst.exists():
            src.rename(dst)
            print(f"renamed: {src.relative_to(ROOT)} -> {dst.name}")

    print("done")


if __name__ == "__main__":
    main()
