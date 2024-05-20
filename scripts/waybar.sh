

while true; do
  if ! pgrep -x "waybar" >/dev/null; then
    exec waybar &
    waypid=$(pgrep waybar)
    renice --priority -11 -p "$waypid"
    if [[ -f ~/Dotfiles/.tmp/knline ]]; then
      prefixes=("Waybar get killed again lmao" "Ops.. my bad" "waybar trippin again" "augh fuck you waybar" "fixed" "waybar suck" "STOP CRASHING Goddamnit" "too fast chucklenut" "learn javascript man, this is suck ass" "im tired fixing this waybar" "waybar suckfull" "You know what, just dont use waybar" "man... this waybar stability is questionable")
      num_prefixes=${#prefixes[@]}
      random_index=$((RANDOM % num_prefixes))
      random_prefix=${prefixes[random_index]}
      dunstify -i $HOME/Dotfiles/profile/profile.png katsuro "$random_prefix"
    fi
  fi
  sleep 10
done
