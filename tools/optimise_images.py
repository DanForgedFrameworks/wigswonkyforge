"""Turn source photos into web-sized WebP files for the site.

Every source image becomes two files in the output folder:
    <name>-800.webp    used for tiles, thumbnails and phones
    <name>-1600.webp   used for large screens and high-density displays
Images narrower than a target width are never enlarged; that file is written
at the original width so the page can always reference both sizes.

Usage (from the repo root):
    python tools/optimise_images.py --src "<handoff>/assets/web" "<handoff>/assets" --out assets/img

Re-running only rebuilds images whose source is newer than the output, so it is
safe to point at a folder that has had a few photos added. --force rebuilds all.
"""
import argparse
import sys
from pathlib import Path

from PIL import Image, ImageOps

EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def collect(src_dirs):
    """Gather images from each folder (not recursive). Stems must be unique."""
    found = {}
    for d in src_dirs:
        for p in sorted(Path(d).iterdir()):
            if p.is_file() and p.suffix.lower() in EXTS:
                stem = p.stem.lower()
                if stem in found:
                    sys.exit(f"Two sources share the name '{stem}': {found[stem]} and {p}")
                found[stem] = p
    return found


def hydrate(path):
    """Read every byte so OneDrive downloads a cloud-only file before Pillow opens it.
    Skipping this can produce black images from placeholder files."""
    with open(path, "rb") as f:
        while f.read(1 << 20):
            pass


def convert(src, out_dir, stem, widths, quality, force):
    written = 0
    if not force and all((out_dir / f"{stem}-{w}.webp").exists()
                         and (out_dir / f"{stem}-{w}.webp").stat().st_mtime >= src.stat().st_mtime for w in widths):
        return written
    hydrate(src)
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)
        has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
        im = im.convert("RGBA" if has_alpha else "RGB")
        for w in widths:
            dest = out_dir / f"{stem}-{w}.webp"
            if not force and dest.exists() and dest.stat().st_mtime >= src.stat().st_mtime:
                continue
            frame = im
            if im.width > w:
                frame = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            frame.save(dest, "WEBP", quality=quality, method=6)
            written += dest.stat().st_size
    return written


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--src", nargs="+", required=True, help="one or more folders of source images")
    ap.add_argument("--out", required=True, help="output folder, e.g. assets/img")
    ap.add_argument("--widths", nargs="+", type=int, default=[800, 1600])
    ap.add_argument("--quality", type=int, default=80)
    ap.add_argument("--force", action="store_true", help="rebuild even if outputs are up to date")
    args = ap.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)
    images = collect(args.src)

    src_bytes = sum(p.stat().st_size for p in images.values())
    for stem, path in images.items():
        convert(path, out_dir, stem, args.widths, args.quality, args.force)

    out_bytes = sum(f.stat().st_size for f in out_dir.glob("*.webp"))
    print(f"{len(images)} source images, {src_bytes / 1e6:.1f} MB")
    print(f"{len(list(out_dir.glob('*.webp')))} WebP files in {out_dir}, {out_bytes / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
