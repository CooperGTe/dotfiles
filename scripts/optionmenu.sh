#!/bin/bash


BLUE='\033[1;36m'               
string="       /\         Katsuro@Embodiment of Computer
      /  \        ┌──┐QUICK COMMAND┌─────┐
     /\   \        1.│ Theme Manager
    /      \       2.│ Change Wallpaper
   /   ,,   \      3.│ Reload Hyprconfig
  /   |  |  -\     4.│ Swayidle
 /_-''    ''-_\    5.│ Powermenu
                  └──┴───────────────────┘
> "
stringw="       /\         Katsuro@Em│   Wallpaper
      /  \        ┌──┐QUICK │─────────────────────
     /\   \        1.│ Theme│1. Plain Black
    /      \       2.│ Chang│2. Deso's Pizza
   /   ,,   \      3.│ Reloa│3. EVA-01
  /   |  |  -\     4.│ Swayi│4. Cozy
 /_-''    ''-_\    5.│ Power│5. Snow Mountain
                  └──┴──────│6. JapanPixAnimated
                            │7. Maiden
                            │8. Mountain
                            │9. Simpleton
"
stringwm="================
1.FULL
2.ONLY TOP
3.ONLY MIDDLE
4.ONLY BOTTOM
5.NO TOP
6.NO MIDDLE
7.NO BOTTOM
8.NO TEXT
"
stringp="       /\         Katsuro@Em│   PowerMenu
      /  \        ┌──┐QUICK │───────────────────
     /\   \        1.│ Theme│1. Sleep
    /      \       2.│ Chang│2. Exit Hyprland
   /   ,,   \      3.│ Reloa│3. Restart 
  /   |  |  -\     4.│ Swayi│4. Shutdown
 /_-''    ''-_\    5.│ Power│5. Remount
                  └──┴──────│
"
stringi="       /\         Katsuro@Em│   Swayidle
      /  \        ┌──┐QUICK │───────────────────
     /\   \        1.│ Theme│1. Toggle ON
    /      \       2.│ Chang│2. Toggle OFF
   /   ,,   \      3.│ Reloa│3. Ask Swayidle Status
  /   |  |  -\     4.│ Swayi│
 /_-''    ''-_\    5.│ Power│
                  └──┴──────│

"
while true; do
clear
printf "${BLUE}${string}"
read -s -n 1 input1

case $input1 in 
  1) $HOME/Dotfiles/scripts/thememanager.sh
    ;;
  2)
    while true; do
      clear
      export SWWW_TRANSITION_POS=0.99,0.985
      export SWWW_TRANSITION=grow
      export SWWW_TRANSITION_STEP=50
      export SWWW_TRANSITION_FPS=255
      export SWWW_TRANSITION_DURATION=1
      printf "${stringw}"
      read -s -n 1 inputw
      case "$inputw" in
        1) swww img $HOME/Dotfiles/wallpaper/black.png
        ;;
        2) swww img $HOME/Dotfiles/wallpaper/pizzacyberpunk2k.gif
        ;;
        3) swww img $HOME/Dotfiles/wallpaper/evangelion.png
        ;;
        4) swww img $HOME/Dotfiles/wallpaper/cozy.jpg
        ;;
        5) swww img $HOME/Dotfiles/wallpaper/snowmachine.jpg
        ;;
        6) swww img $HOME/Dotfiles/wallpaper/jpcitypixart.gif
        ;;
        7) swww img $HOME/Dotfiles/wallpaper/garden.png
        ;;
        8) swww img $HOME/Dotfiles/wallpaper/mountain.png
        ;;
        9) swww img $HOME/Dotfiles/wallpaper/smooth-art.jpg
        ;;
        *) break
      ;;
      esac
    done
    ;;
  3)
    exec $HOME/Dotfiles/startup.sh 
    ;;
  4)
    clear
    printf "${stringi}"
    read -s -n 1 inputi
    case "$inputi" in
      1) $HOME/Dotfiles/scripts/swayidle.sh &
        sleep 1
      ;;
      2) killall swayidle
      ;;
      3) 
        if ! pgrep -x "swayidle" >/dev/null; then
          dunstify -i $HOME/Dotfiles/profile/profile.png katsuro "The Swayidle Is not Active"
        else
          dunstify -i $HOME/Dotfiles/profile/profile.png katsuro "Swayidle Is Active"
        fi
      ;;
      *)
      ;;
    esac
    
    ;;
  5)
    clear
    printf "${stringp}"
    read -s -n 1 inputp
    case "$inputp" in
      1) $HOME/Dotfiles/scripts/swaylock.sh; killall swayidle; $HOME/Dotfiles/scripts/swayidle
      ;;
      2) hyprctl dispatch exit
      ;;
      3) reboot
      ;;
      4) shutdown -P now
      ;;
      5) sudo mount -a
      ;;
      *)
      ;;
    esac    
    ;;
  q)
    break
    ;;
esac
done
exit
