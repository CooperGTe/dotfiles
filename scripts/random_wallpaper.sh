#!/bin/bash

# Check if the directory containing images is provided as an argument
if [[ $# -lt 1 ]] || [[ ! -d $1 ]]; then
    echo "Usage: $0 <dir containing images>"
    exit 1
fi
export SWWW_TRANSITION_POS=0.99,0.985
export SWWW_TRANSITION=grow
export SWWW_TRANSITION_STEP=50
export SWWW_TRANSITION_FPS=255
export SWWW_TRANSITION_DURATION=1
# Select a random image from the provided directory
random_img=$(find "$1" -type f | shuf -n 1)

# Set the randomly selected image as the wallpaper
swww img "$random_img"

