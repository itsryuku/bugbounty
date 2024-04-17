#!/bin/bash

# MASS XSS HUNTING
# gau: https://github.com/lc/gau
# uro: https://github.com/s0md3v/uro
# kxss: https://github.com/Emoe/kxss

if [ $# -ne 1 ]; then
	echo "Usage: $0 <target>"
	exit 1
fi

TARGET="$1"

gau "$TARGET" --subs --blacklist jpg,jpeg,png,gif,svg,ico,css,js,woff,woff2,ttf,eot,map,json,txt --o "$TARGET.crawl"

uro -i "$TARGET.crawl" -o "$TARGET.uro"

cat "$TARGET.uro" | kxss
