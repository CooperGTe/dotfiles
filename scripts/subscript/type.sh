#!/bin/bash

string=$(cat "$1")

for ((i=0; i<=${#string}; i++)); do
  printf '%s' "${string:$i:1}"
  sleep 0.0$(( (RANDOM % 500000) + 1 ))
done
echo ""
