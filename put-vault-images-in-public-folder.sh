#!/bin/zsh
# Copies all images from vault/Images (and subfolders) to public/img/ (flat)

mkdir -p public/img
find vault/Images -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.gif' -o -iname '*.svg' -o -iname '*.webp' \) -exec cp {} public/img/ \;
