"""Gera os ícones e a splash screen do app (paleta Cinema Noir).

Marca: um círculo dourado com um botão de "play" recortado no centro —
remete a filme/streaming e usa a cor de destaque da identidade visual.
"""
from PIL import Image, ImageDraw
import math
import os

BACKGROUND = (20, 18, 24, 255)      # #141218
GOLD = (232, 185, 76, 255)          # #E8B94C
TRANSPARENT = (0, 0, 0, 0)
WHITE = (255, 255, 255, 255)

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "assets")
os.makedirs(OUT_DIR, exist_ok=True)


def play_triangle_points(cx, cy, size):
    """Triângulo de 'play' apontando para a direita, centralizado opticamente."""
    h = size * 1.05
    w = size * 0.95
    offset_x = size * 0.12  # compensa o desequilíbrio visual do triângulo
    return [
        (cx - w / 2 + offset_x, cy - h / 2),
        (cx - w / 2 + offset_x, cy + h / 2),
        (cx + w / 2 + offset_x, cy),
    ]


def draw_mark(size, circle_color, triangle_color, bg_color, circle_ratio=0.62, cutout=True):
    img = Image.new("RGBA", (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    cx = cy = size / 2
    r = size * circle_ratio / 2

    if circle_color is not None:
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=circle_color)

    tri = play_triangle_points(cx, cy, r * 0.95)
    draw.polygon(tri, fill=triangle_color)
    return img


def save(img, name, size=None):
    if size:
        img = img.resize((size, size), Image.LANCZOS)
    path = os.path.join(OUT_DIR, name)
    img.save(path)
    print(f"gerado: {path} ({img.size[0]}x{img.size[1]})")


# 1. Ícone principal (iOS / geral) — fundo escuro sólido preenchendo o quadrado
icon = draw_mark(1024, GOLD, BACKGROUND, BACKGROUND, circle_ratio=0.62)
save(icon, "icon.png")

# 2. Android adaptive icon — camada de fundo (cor sólida)
bg_layer = Image.new("RGBA", (1024, 1024), BACKGROUND)
save(bg_layer, "android-icon-background.png")

# 3. Android adaptive icon — camada de frente (transparente, marca na safe zone ~66%)
# o triângulo é "recortado" do círculo (preenchido com a própria cor transparente)
fg_layer = draw_mark(1024, GOLD, TRANSPARENT, TRANSPARENT, circle_ratio=0.42)
save(fg_layer, "android-icon-foreground.png")

# 4. Android monochrome icon (Android 13+ themed icons) — silhueta branca, sem fundo
mono = draw_mark(1024, WHITE, (0, 0, 0, 0), TRANSPARENT, circle_ratio=0.42)
save(mono, "android-icon-monochrome.png")

# 5. Favicon (web)
save(icon.copy(), "favicon.png", size=196)

# 6. Splash icon — mesma marca, para usar centralizada sobre o background escuro
splash_icon = draw_mark(1024, GOLD, TRANSPARENT, TRANSPARENT, circle_ratio=0.5)
save(splash_icon, "splash-icon.png")

print("Concluído.")
