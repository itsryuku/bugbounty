#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 targets.txt"
    exit 1
fi

targets="$1"

while IFS= read -r domain || [[ -n "$domain" ]]; do
    subfinder -silent -d "$domain" >> scope.all
done < "$targets"

echo "Results saved in scope.all"

