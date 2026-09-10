#!/usr/bin/env python3
"""Rename Experiment 05 files/folders to camelCase (no underscores) and update references."""

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
    "c360LwcDtoInventoryEx05.csv": "c360LwcDtoInventoryEx05.csv",
    "c360LwcDtoInventoryEx05.xlsx": "c360LwcDtoInventoryEx05.xlsx",
    "handoffChecklistEx05.md": "handoffChecklistEx05.md",
    "orgWiringRunbookEx05.md": "orgWiringRunbookEx05.md",
    "planSummaryEx05.md": "planSummaryEx05.md",
    "moduleRegistryEx05.md": "moduleRegistryEx05.md",
    "moduleSpec.md": "moduleSpec.md",
    "apexMergeGuideEx05.md": "apexMergeGuideEx05.md",
    "packageLwcEx05.xml": "packageLwcEx05.xml",
    "restoreLog.txt": "restoreLog.txt",
    "generateDtoInventory.py": "generateDtoInventory.py",
    "restoreLwcHtml.py": "restoreLwcHtml.py",
    "sanitizeDtoInventory.py": "sanitizeDtoInventory.py",
    "renameToCamelCase.py": "renameToCamelCase.py",  # self stays camelCase already
}

CONTENT_REPLACEMENTS = [
    ("ex05", "ex05"),
    ("Ex05", "Ex05"),
    ("c360LwcExperimentEx05", "c360LwcExperimentEx05"),
    ("classesStubsEx05", "classesStubsEx05"),
    ("packageLwcEx05", "packageLwcEx05"),
    ("c360LwcDtoInventoryEx05", "c360LwcDtoInventoryEx05"),
    ("handoffChecklistEx05", "handoffChecklistEx05"),
    ("orgWiringRunbookEx05", "orgWiringRunbookEx05"),
    ("planSummaryEx05", "planSummaryEx05"),
    ("moduleRegistryEx05", "moduleRegistryEx05"),
    ("moduleSpec.md", "moduleSpec.md"),
    ("moduleSpec", "moduleSpec"),
    ("apexMergeGuideEx05", "apexMergeGuideEx05"),
    ("generateDtoInventory.py", "generateDtoInventory.py"),
    ("restoreLwcHtml.py", "restoreLwcHtml.py"),
    ("sanitizeDtoInventory.py", "sanitizeDtoInventory.py"),
    ("restoreLog.txt", "restoreLog.txt"),
    ("(ex05)", "(ex05)"),
]


def lwc_name(name: str) -> str:
    if "Ex05" in name:
        return name.replace("Ex05", "Ex05")
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
    if "Ex05" in name:
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
            if not new_dir and "Ex05" in dirname:
                new_dir = lwc_name(dirname)
            elif dirname == "classesStubsEx05":
                new_dir = "classesStubsEx05"
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
