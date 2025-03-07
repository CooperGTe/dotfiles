#!/bin/bash



file_path=/opt/discord/resources/build_info.json
# Find the line containing "version": "X.X.X" and extract the version number
current_version=$(grep -Po '"version": "\K\d+\.\d+\.\d+' "$file_path")

# Extract the last number from the version string
last_number=$(echo "$current_version" | grep -oE '[0-9]+$')

# Increment the last number by 1
next_number=$((last_number + 1))

# Construct the new version string
new_version=$(echo "$current_version" | sed "s/$last_number$/$next_number/")

# Replace the old version with the new version in the file
sed -i "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" "$file_path"

echo "Version updated to $new_version"

