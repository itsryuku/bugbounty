#!/bin/bash

# Check if xclip is installed
if ! command -v xclip &>/dev/null; then
	echo "xclip is not installed."
	exit 1
fi

if [ -n "$1" ]; then
	cat "$1" | xclip -selection clipboard
else
	cat | xclip -selection clipboard
fi

echo "Copied to clipboard."
