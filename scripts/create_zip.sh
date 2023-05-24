#!/bin/bash

# Get the parent directory of the script and navigate to project root
cd "$(dirname "$0")/.."

# Get the current date
now=$(date +"%Y-%m-%d")

# Create zip file excluding certain directories and files
zip -r dds-grupo-6-tpi-$now.zip ./ -x \
"*.next/*" \
"*.vscode/*" \
"*node_modules/*" \
"*.git/*" \
"*scripts/*" \
"package-lock.json" \
"next-env.d.ts"
