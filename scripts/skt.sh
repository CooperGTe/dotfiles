#!/bin/bash

# Function to split the text into chunks of 20 words
split_text() {
    text="$1"
    # Split the text into chunks of 20 words
    chunks=$(echo "$text" | awk '{for(i=1;i<=NF;i+=1000){print substr($0,i,1000)}}')
    echo "$chunks"
}

# Check if input argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <text>"
    exit 1
fi

# Assign input text to a variable
input="$1"
# Process the input text using 'tgpt' command and store the result
result=$(tgpt -q "$input")

# Check if the result contains more than 20 words
word_count=$(echo "$result" | wc -w)
if [ "$word_count" -gt 100 ]; then
    # Split the result into chunks of 20 words
    chunks=$(split_text "$result")
    # Process each chunk and move the result to 'skt' command with a 5-second delay
    while read -r chunk; do
        dunstify -t 5000 -i $HOME/Dotfiles/profile/profile.png Katsuro "$chunk"
        sleep 5
    done <<< "$chunks"
else
    # Move the result to 'skt' command with a 5-second delay
    dunstify -t 5000 -i $HOME/Dotfiles/profile/profile.png Katsuro "$result"
    sleep 5
fi
