"""Check every image and video the site references actually exists in the repo.

Usage (from the repo root):  python tools/check_refs.py
Exits 1 and lists the missing files if anything is broken.
"""
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
missing = set()

html = (root / "index.html").read_text(encoding="utf-8")
for ref in re.findall(r'assets/[\w./-]+\.(?:webp|mp4)', html):
    if not (root / ref).exists():
        missing.add(ref)

data = (root / "js" / "data.js").read_text(encoding="utf-8")
names = set(re.findall(r"'([a-z0-9-]+)'", data))
for name in names:
    for w in (800, 1600):
        ref = f"assets/img/{name}-{w}.webp"
        if not (root / ref).exists():
            missing.add(ref)

if missing:
    print("Missing:\n  " + "\n  ".join(sorted(missing)))
    sys.exit(1)
print(f"All references present ({len(names)} photo names in data.js, plus index.html).")
