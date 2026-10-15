#!/usr/bin/env python3
"""Detektor drift layout: pastikan navbar, dock, modal, dan footer legal
konsisten di semua halaman. Jalankan: python3 docs/scripts/check_layout.py
Keluar dengan kode 1 bila ada halaman yang menyimpang."""
import pathlib, re, sys
root = pathlib.Path(__file__).resolve().parents[2]
problems = []
for p in sorted(root.rglob("*.html")):
    if ".git" in p.parts or 'http-equiv="refresh"' in p.read_text():
        continue
    t = p.read_text()
    if "site-navbar" not in t:
        continue
    rel = p.relative_to(root)
    nav = t[t.find("site-navbar"):t.find("</header>")]
    for label, ok in [
        ("menu Kerja Sama masih di navbar", "kerja-sama" not in nav),
        ("tombol Cari usaha", "Cari usaha" in nav),
        ("tombol Kontribusi", "Kontribusi" in nav),
        ("modal pencarian", t.count('id="searchModal"') == 1),
        ("dock 7 item", t.count("dock-item") >= 7),
        ("dock Info Jalan", ">Info Jalan<" in t),
        ("footer legal", "footer-legal" in t and "kebijakan-privasi" in t and "pedoman-redaksi" in t),
        ("SRI phosphor", "integrity=\"sha384-" in t or "phosphor" not in t.lower()),
    ]:
        if not ok:
            problems.append(f"{rel}: {label}")
print("\n".join(problems) if problems else "Layout konsisten di semua halaman.")
sys.exit(1 if problems else 0)
