#!/usr/bin/env bash

set -e

# Directory containing this script
MOVIE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
IMAGE_DIR="${MOVIE_DIR}/../images"

mkdir -p "$IMAGE_DIR"

for movie in "$MOVIE_DIR"/*.mp4; do
    # Do nothing if there are no .mp4 files
    [ -e "$movie" ] || continue

    filename="$(basename "$movie")"
    name="${filename%.*}"

    poster="${IMAGE_DIR}/${name}-poster.jpg"

    # Skip if the poster already exists
    if [ -f "$poster" ]; then
        echo "Poster already exists: $(basename "$poster")"
        continue
    fi

    echo "Creating poster for: $filename"

    ffmpeg \
        -ss 00:00:01 \
        -i "$movie" \
        -frames:v 1 \
        -q:v 2 \
        "$poster"

    echo "Created: $(basename "$poster")"
done

echo "Done." 
