#!/usr/bin/env bash

# Navigate to the folder
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR/../src/styles/Icons/assets"

# Transform spinal case to camel case
# icon-canton-zurich => IconCantonZurich
spinal_to_upper() {
    IFS=- read -ra str <<<"$1"
    printf '%s' "${str[@]^}"
}

# Iterate in folders
find . -maxdepth 1 -mindepth 1 -type d | sort -k2,2 -k1,1n |while read dname; do
    cd "$dname";
    # Clear the content of the previous generate
    > index.js

    # Iterate all files in folders
    find ./ -name '*.svg' |while read fname; do
      fname=$(basename "$fname")
      exportName=$(echo "${fname%.*}" | perl -pe 's/(^|-)(\w)/\U$2/g')
      echo "export $exportName from \"./$fname\"" >> index.js
    done

    # Go back one level
    cd ..
done