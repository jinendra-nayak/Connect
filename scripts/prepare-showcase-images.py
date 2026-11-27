#!/usr/bin/env python3
"""
Hero corridor cards, smart switch and app-control imagery, built from /images.

Only crops, resizes and pads: no brand mark is erased here. Confirm you hold the
rights to every source photograph before launch.

Run after prepare-images.py:  python3 scripts/prepare-showcase-images.py   (needs Pillow)
"""
from pathlib import Path
from PIL import Image, ImageChops, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images"
PUB = ROOT / "public/images"
OUT = {k: PUB / k for k in ("showcase", "tech", "products-final")}
for d in OUT.values():
    d.mkdir(parents=True, exist_ok=True)
CARD = (600, 800)


def load(path):
    return Image.open(path).convert("RGB")


def save(im, path, q=80):
    im.save(path, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"{path.relative_to(ROOT)}  {im.size}  {path.stat().st_size // 1024} KB")


def cover(im, size, centre=(0.5, 0.5)):
    return ImageOps.fit(im, size, Image.LANCZOS, centering=centre)


def extend(im, mirror=False):
    """Full width of a wide or square shot on a 3:4 card, backdrop continued above and below."""
    w, h = CARD
    im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    top = (h - im.height) // 2
    bottom = h - top - im.height
    card = Image.new("RGB", CARD)
    if mirror:  # textured backdrops: only use when the product sits well inside the frame
        flip = ImageOps.flip(im).filter(ImageFilter.GaussianBlur(6))
        card.paste(flip, (0, top - im.height))
        card.paste(flip, (0, top + im.height))
    else:  # smooth backdrops: stretch the outermost rows
        card.paste(im.crop((0, 0, w, 3)).resize((w, top), Image.BILINEAR), (0, 0))
        card.paste(im.crop((0, im.height - 3, w, im.height)).resize((w, bottom), Image.BILINEAR), (0, h - bottom))
    card.paste(im, (0, top))
    return card


def studio(product, size, fill):
    """White-background shot multiplied onto warm ivory."""
    bw = product.convert("L").point(lambda v: 255 if v < 245 else 0)
    p = product.crop(bw.getbbox())
    scale = min(size[0] * fill / p.width, size[1] * fill / p.height)
    p = p.resize((round(p.width * scale), round(p.height * scale)), Image.LANCZOS)
    white = Image.new("RGB", size, (255, 255, 255))
    white.paste(p, ((size[0] - p.width) // 2, (size[1] - p.height) // 2))
    return ImageChops.multiply(white, Image.new("RGB", size, (232, 226, 215)))


wall = load(SRC / "smart-panel/image.png")
switch = load(SRC / "smart-panel/image copy 2.png")
villa = load(SRC / "smart-panel/image copy.png")
app = load(SRC / "Tech-folder/image copy.png")
home = load(SRC / "Tech-folder/image.png")
prd = PUB / "products-final"

# hero corridor: products first
cards = [
    extend(wall, mirror=True),
    studio(switch, CARD, 0.84),
    cover(load(prd / "panel-detail-2.jpg"), CARD),
    extend(load(PUB / "luxury/mobile-control.jpg")),
    extend(load(prd / "panel-main.jpg")),
    cover(app, CARD, (0.86, 0.5)),
    extend((lambda im: im.crop((28, 0, im.width, im.height - 10)))(load(PUB / "luxury/panel-installed.jpg"))),
    cover(villa, CARD, (0.5, 0.5)),
    extend(load(prd / "panel-detail-1.jpg")),
    cover(load(prd / "lock-main.jpg"), CARD, (0.55, 0.5)),
]
for i, card in enumerate(cards, 1):
    save(card, OUT["showcase"] / f"p{i}.jpg")

save(studio(switch, (900, 675), 0.82), OUT["products-final"] / "switch-main.jpg", 84)
save(app, OUT["tech"] / "app-control.jpg", 80)
save(home, OUT["tech"] / "connected-home.jpg", 86)
save(wall.resize((1000, 1000), Image.LANCZOS), OUT["tech"] / "wall-panel.jpg", 82)
