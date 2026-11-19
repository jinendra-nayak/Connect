#!/usr/bin/env python3
"""
Prepare site imagery from the raw reference files in /images.

 - erases third-party brand marks (vertical gradient fill from surrounding pixels)
 - crops away baked-in marketing text / logos
 - sets white-background product shots on a warm ivory studio backdrop
 - exports optimised JPEGs into public/images/{luxury,products-final}

Run:  python3 scripts/prepare-images.py     (needs Pillow)

NOTE: removing a visible logo does not transfer ownership of a photograph.
Replace these with ConnectCom-owned or licensed photography before launch; the
slot names in src/lib/photos.ts are unchanged, so no code edits are needed.
"""
from pathlib import Path
from PIL import Image, ImageChops, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images"
LUX = ROOT / "public/images/luxury"
PRD = ROOT / "public/images/products-final"
LUX.mkdir(parents=True, exist_ok=True)
PRD.mkdir(parents=True, exist_ok=True)


def load(name):
    im = Image.open(SRC / name)
    if im.mode in ("RGBA", "LA", "P"):  # transparent PNGs: flatten onto white, not black
        im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        im = Image.alpha_composite(bg, im)
    return im.convert("RGB")


def erase(im, box, pad=3):
    """Fill `box` with a vertical blend of the pixels just above and just below it."""
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    top = im.crop((x0, y0 - pad, x1, y0)).resize((w, 1), Image.BILINEAR).resize((w, h))
    bot = im.crop((x0, y1, x1, y1 + pad)).resize((w, 1), Image.BILINEAR).resize((w, h))
    mask = Image.linear_gradient("L").resize((w, h))
    patch = Image.composite(bot, top, mask).filter(ImageFilter.GaussianBlur(1.2))
    im.paste(patch, (x0, y0))
    return im


def fit_width(im, width):
    if im.width <= width:
        return im
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)


def save(im, path, width=None, q=80):
    if width:
        im = fit_width(im, width)
    im.save(path, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"{path.relative_to(ROOT)}  {im.size}  {path.stat().st_size // 1024} KB")


def upscale(im, factor):
    return im.resize((round(im.width * factor), round(im.height * factor)), Image.LANCZOS)


def ivory_canvas(size, centre=(238, 232, 222), edge=(206, 198, 185)):
    """Warm studio backdrop with a soft vignette."""
    w, h = size
    g = Image.radial_gradient("L").resize((w * 2, h * 2)).crop((w // 2, h // 2, w // 2 + w, h // 2 + h))
    g = g.filter(ImageFilter.GaussianBlur(20))
    c = Image.new("RGB", size, centre)
    e = Image.new("RGB", size, edge)
    return Image.composite(e, c, g)


def on_ivory(product, size, fill=0.84):
    """White-background shot -> multiplied onto warm ivory (blacks stay black)."""
    cw, ch = size
    target_w = int(cw * fill)
    p = fit_width(product, target_w)
    if p.height > ch * fill:
        p = p.resize((round(p.width * ch * fill / p.height), round(ch * fill)), Image.LANCZOS)
    bg = Image.new("RGB", size, (255, 255, 255))
    bg.paste(p, ((cw - p.width) // 2, (ch - p.height) // 2))
    return ImageChops.multiply(bg, ivory_canvas(size))


def trim_white(im, thr=245, pad=40):
    bw = im.convert("L").point(lambda v: 255 if v < thr else 0)
    box = bw.getbbox()
    x0, y0, x1, y1 = box
    return im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))


# ───────────────────────── luxury interiors (brand-neutral) ─────────────────────────
villa = load("Pasted image (10).png")
save(villa, LUX / "villa-evening.jpg", 1920, 78)
save(villa.crop((0, 0, 1570, 1047)), PRD / "control-main.jpg", 1600, 80)  # wall control installed

amber = load("Pasted image (9).png")
save(amber.crop((0, 0, 1560, 1080)), LUX / "amber-lounge.jpg", 1560, 78)

skyline = load("Pasted image (13).png")
save(skyline, LUX / "skyline-residence.jpg", 1792, 78)

night = load("example 2.png")
save(night.crop((890, 0, 1536, 1024)), LUX / "night-dining.jpg", 760, 78)  # no holographic overlay

# ───────────────────────── smart glass panels ─────────────────────────
pz = erase(load("Pasted image (4).png"), (3140, 1445, 3440, 1545))
pz = trim_white(pz, pad=120)
save(on_ivory(pz, (1800, 1200), 0.86), PRD / "panel-main.jpg", 1800, 82)

hg = erase(load("Pasted image (5).png"), (78, 812, 190, 846))
hg = trim_white(hg, pad=60)
save(on_ivory(hg, (1280, 720), 0.9), PRD / "panel-detail-1.jpg", 1280, 82)

iotty = load("Pasted image (7).png")
save(iotty.crop((0, 62, 1280, 782)), PRD / "panel-detail-2.jpg", 1280, 80)  # installed on wall

pz_life = erase(load("Pasted image (3).png"), (636, 314, 700, 336))
pz_life = pz_life.crop((300, 52, 768, 402))
save(upscale(pz_life, 2), LUX / "panel-installed.jpg", 940, 80)

# ───────────────────────── mobile control (phone + switch) ─────────────────────────
az = erase(load("Pasted image.png"), (568, 680, 636, 714))
az = trim_white(az, pad=50)
save(on_ivory(upscale(az, 1.5), (1200, 1200), 0.8), LUX / "mobile-control.jpg", 1200, 82)

# ───────────────────────── door lock ─────────────────────────
lock = erase(load("Pasted image (8).png"), (468, 326, 522, 346))
save(upscale(lock.crop((0, 150, 800, 683)), 2), PRD / "lock-main.jpg", 1600, 82)
save(upscale(lock.crop((400, 165, 640, 300)), 3), PRD / "lock-detail-1.jpg", 720, 84)
save(upscale(lock.crop((250, 165, 490, 300)), 3), PRD / "lock-detail-2.jpg", 720, 84)

# ───────────────────────── sensor ─────────────────────────
aq = erase(load("Pasted image (12).png"), (455, 712, 590, 758))
save(aq, PRD / "sensor-motion.jpg", 1000, 82)

# ───────────────────────── voice: everyday moment (logos + captions cropped away) ─────────────────────────
al = load("alexa.png")
al = erase(al, (50, 412, 362, 452))   # speech bubble
al = erase(al, (552, 478, 688, 520))  # speech bubble
save(upscale(al.crop((170, 330, 750, 600)), 2), LUX / "voice-moment.jpg", 1160, 80)

# ───────────────────────── free-licensed photos (Wikimedia Commons; see images/free-licensed/CREDITS.md) ─────────────────────────
FL = SRC / "free-licensed"
def fl(name):
    return Image.open(FL / name).convert("RGB")

def square_centre(im, side=None):
    side = side or min(im.size)
    x, y = (im.width - side) // 2, (im.height - side) // 2
    return im.crop((x, y, x + side, y + side))

echo = fl("echo-dot-3rd-gen-01.jpg")
save(on_ivory(echo, (1200, 1200), 0.92), PRD / "echo-device.jpg", 1200, 82)

nest = fl("google-nest-mini-202001-01.jpg").crop((410, 470, 1505, 1510))
save(on_ivory(nest, (1200, 1200), 1.0), PRD / "nest-speaker.jpg", 1200, 82)

save(square_centre(fl("2023-czujnik-temperatury-i-wilgotno-ci-xiaomi-1.jpg")), PRD / "sensor-temperature.jpg", 1000, 82)
save(square_centre(fl("2023-czujnik-temperatury-i-wilgotno-ci-xiaomi-2.jpg")), PRD / "sensor-humidity.jpg", 1000, 82)
