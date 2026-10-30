"""Compose the logo PNG files from the icon master and the wordmark (optional Pillow)."""
from pathlib import Path
import os
from PIL import Image, ImageDraw, ImageFont
OUT=Path(__file__).resolve().parents[1]/"assets"
S=3
copper="#ba8056"
# Wordmark colors per background; the icon is identical on both.
themes={
    "light":{"ink":"#123b40","tagline":"#466669"},
    "dark":{"ink":"#e8f2f1","tagline":"#9cc0be"},
}
fontpath=os.environ.get("HC_LOGO_FONT","/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
master=Image.open(OUT/"logo-icon-master.png").convert("RGBA")

def text(draw,x,y,value,size,color,spacing=0):
    font=ImageFont.truetype(fontpath,size*S)
    cursor=x*S
    for ch in value:
        draw.text((cursor,y*S),ch,font=font,fill=color,anchor="ls")
        cursor+=draw.textlength(ch,font=font)+spacing*S

for name,colors in themes.items():
    im=Image.new("RGBA",(1000*S,240*S),(0,0,0,0))
    im.alpha_composite(master.resize((224*S,224*S),Image.Resampling.LANCZOS),(8*S,8*S))
    draw=ImageDraw.Draw(im)
    text(draw,264,108,"HC DIRECT",69,colors["ink"])
    text(draw,268,166,"CARDS",40,copper,11)
    text(draw,268,204,"LOCAL CARDS FOR HOME ASSISTANT",15,colors["tagline"],1)
    im.resize((1000,240),Image.Resampling.LANCZOS).save(OUT/("logo.png" if name=="light" else "logo-dark.png"))
master.resize((512,512),Image.Resampling.LANCZOS).save(OUT/"logo-icon.png")
print("Logo PNG exports generated.")
