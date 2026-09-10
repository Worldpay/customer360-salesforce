"""Strip SharePoint/OneDrive junk from c360LwcDtoInventoryEx05.xlsx.

OneDrive can inject [trash]/*.dat and customXml/* into .xlsx files in synced folders,
which makes Excel hang on "Processing". Run this script immediately before opening in Excel:

    python scripts/sanitizeDtoInventory.py
"""

import tempfile
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "c360LwcDtoInventoryEx05.xlsx"

JUNK_PREFIXES = ("[trash]/", "customXml/")
JUNK_EXACT = {"docProps/custom.xml"}


def is_junk(name: str) -> bool:
    if name in JUNK_EXACT:
        return True
    return any(name.startswith(prefix) for prefix in JUNK_PREFIXES)


def sanitize(path: Path) -> int:
    removed = 0
    with tempfile.NamedTemporaryFile(suffix=".xlsx", delete=False) as tmp:
        tmp_path = Path(tmp.name)
    try:
        with zipfile.ZipFile(path, "r") as zin, zipfile.ZipFile(tmp_path, "w", zipfile.ZIP_DEFLATED) as zout:
            for info in zin.infolist():
                if is_junk(info.filename):
                    removed += 1
                    continue
                zout.writestr(info, zin.read(info.filename))
        tmp_path.replace(path)
    finally:
        if tmp_path.exists():
            tmp_path.unlink(missing_ok=True)
    return removed


def main():
    if not TARGET.exists():
        raise SystemExit(f"Not found: {TARGET}")
    removed = sanitize(TARGET)
    print(f"Sanitized {TARGET.name} — removed {removed} junk entries.")
    if removed:
        print("Open in Excel now (before OneDrive re-syncs).")
    else:
        print("File was already clean.")


if __name__ == "__main__":
    main()
