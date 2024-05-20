#!/bin/bash

clear
string="======Theme Manager======
Script Write By Me Aka CooperGTe / Fathir 
OPTION
1    : General
2    : Waybar
3    : Decoration Preset
else : exit 
"
stringg="██╗  ██╗██ +====integer/float===
██║  ██║╚█|1. Border                      
███████║ ╚|2. Corner          
██╔══██║  |3. Gap Out           
██║  ██║  |4. Gap In   
╚═╝  ╚═╝  |5. Tilegap Opacity
======Them|6. Active Opacity
          |7. Inactive Opacity
Script Wri+=====true/false=====
> General |8. Blur
2    : Way|9. Force Transparent Terminal
3    : Dec|
else : exi|
"
stringgb="    Border 
+--------+----------------------
|A       | Border Active Color
|B       | Border Inactive Color
|Interger| Change Size 
|Q       | Back
--------+----------------------
> "
stringgbca=" Border Active Color
'input it like this 'rgba(ffaabb00)...''

> "
stringgbci=" Border Inactive Color
'input it like this 'rgba(ffaabb00)...''

> "
stringgc=" Corner
Enter Size : "
stringggo=" Gap Out
Enter Size : "
stringggi=" Gap In
Enter Size : "
stringggt=" TileGap Opacity
Enter Opacity : "
stringgao=" Active Opacity
Enter Opacity : "
stringgio=" Inactive Opacity
Enter Opacity : "
stringgbl="    Blur
1. Toggle Blur |
2. Blur Size   |
3. Blur Passes |
4. Toggle Xray |
> "
stringgbla=" Toggle Blur
> "
stringgblb=" Blur Size
> "
stringgblc=" Blur Passes
> "
stringgbld=" Toggle Xray
> "
stringgftt=" Force Transparent Terminal (true/false)
Enter Bool : "

stringw="     >_ Waybar
1. Floating
2. Compact
3. Snow Machine
(position). left, right, top, bottom 
> "
stringww="
"
stringd="     >_ Decoration Preset
1. Cozy
2. Compact
3. Glassy
"
#for ((i=0; i<=${#string}; i++)); do
#    printf '%s' "${string:$i:1}"
#    sleep 0.0$(( (RANDOM % 1) + 1 ))
#done 
while true; do
  clear
  echo ""
  echo "██╗  ██╗██╗   ██╗██████╗ ██████╗ "
  echo "██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗"
  echo "███████║ ╚████╔╝ ██████╔╝██████╔╝"
  echo "██╔══██║  ╚██╔╝  ██╔═══╝ ██╔══██╗"
  echo "██║  ██║   ██║   ██║     ██║  ██║"
  echo "╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝  ╚═╝"
  printf "${string}"
  read -s -n 1 input

  case $input in 
    1)
      while true; do
        clear
        printf "${stringg}"
        read -s -n 1 inputg
        #+==================+
        #|   GENERAL TAB    |
        #+======+===========+
        case "$inputg" in
          1) # BORDER
            while true; do
              clear
              printf "${stringgb}"
              read inputgb
              if [[ $inputgb == "a" ]] || [[ $inputgb == "A" ]]; then
                clear
                printf "${stringgbca}"
                read inputgbca
                sed -i "s/col.active_border = .*/col.active_border = "$inputgbca"/g" ~/.config/hypr/general.conf
              elif [[ $inputgb == "b" ]] || [[ $inputgb == "B" ]]; then
                clear
                printf "${stringgbci}"
                read inputgbci
                sed -i "s/col.inactive_border = .*/col.inactive_border = "$inputgbci"/g" ~/.config/hypr/general.conf
              elif [[ $inputgb == "q" ]] || [[ $inputgb == "Q" ]]; then
                break
              else
                sed -i "s/border_size = .*/border_size = "$inputgb"/g" ~/.config/hypr/general.conf
              fi
            done
          ;;
          2) # CORNER
            clear
            printf "${stringgc}"
            read inputgc
            sed -i "s/rounding = .*/rounding = "$inputgc"/g" ~/.config/hypr/decoration.conf
          ;;
          3) # GAPS OUT
            clear
            printf "${stringggo}"
            read inputggo
            sed -i "s/gaps_out = .*/gaps_out = "$inputggo"/g" ~/.config/hypr/general.conf
          ;;
          4) # GAPS IN
            clear
            printf "${stringggi}"
            read inputggi
            sed -i "s/gaps_in = .*/gaps_in = "$inputggi"/g" ~/.config/hypr/general.conf
          ;;
          5) # Tile Gaps Opacity
            clear
            printf "${stringggt}"
            read inputggt
            sed -i '100s/.*/windowrulev2 = opacity '$inputggt', title:^(invis)$/' ~/.config/hypr/hyprland.conf 
          ;;
          6)
            clear
            printf "${stringgao}"
            read inputgao
            sed -i "/^[[:space:]]*active_opacity[[:space:]]*=/c\  active_opacity = $inputgao" ~/.config/hypr/decoration.conf
          ;;
          7)
            clear
            printf "${stringgio}"
            read inputgio
            sed -i "/^[[:space:]]*inactive_opacity[[:space:]]*=/c\  inactive_opacity = $inputgio" ~/.config/hypr/decoration.conf
          ;;
          8)
            while true; do
              clear
              printf "${stringgbl}"
              read -s -n 1 inputgbl
              case "$inputgbl" in
                1)
                  clear
                  printf "${stringgbla}"
                  read inputgbla
                  sed -i "s/enabled = .*/enabled = "$inputgbla"/g" ~/.config/hypr/decoration.conf
                ;;
                2)
                  clear
                  printf "${stringgblb}"
                  read inputgblb
                  sed -i "s/size = .*/size = "$inputgblb"/g" ~/.config/hypr/decoration.conf
                ;;
                3)
                  clear
                  printf "${stringgblc}"
                  read inputgblc
                  sed -i "s/passes = .*/passes = "$inputgblc"/g" ~/.config/hypr/decoration.conf
                ;;
                4)
                  clear 
                  printf "${stringgbld}"
                  read inputgbld
                  sed -i "s/xray = .*/xray = "$inputgbld"/g" ~/.config/hypr/decoration.conf
                ;;
                *) break
                ;;
              esac
            done
          ;;
          9)
            clear
            printf "${stringgftt}"
            read inputgftt
            if [[ $inputgftt == "false" ]]; then
              sed -i "s/opacity 0.85 override, class:.*/opacity 0.85 override, class:(kittydisabled)/g" ~/.config/hypr/hyprland.conf
            elif [[ $inputgftt == "true" ]]; then
              sed -i "s/opacity 0.85 override, class:.*/opacity 0.85 override, class:(kitty)/g" ~/.config/hypr/hyprland.conf
            fi
          ;;
          *)
            break
          ;;
        esac
      done
      ;;
    2)
      clear
      printf "${stringw}"
      read inputw
      if [[ $inputw == "1" ]]; then
        rm -rf $HOME/.config/waybar/ 
        cp -r $HOME/Dotfiles/theme/waybar/floating/waybar/ ~/.config/
        cp $HOME/Dotfiles/theme/waybar/floating/optionmenu.conf ~/.config/hypr/  
      elif [[ $inputw == "2" ]]; then 
        rm -rf $HOME/.config/waybar/ 
        cp -r $HOME/Dotfiles/theme/waybar/compact/waybar/ ~/.config/
        cp $HOME/Dotfiles/theme/waybar/compact/optionmenu.conf ~/.config/hypr/  
      elif [[ $inputw == "3" ]]; then 
        rm -rf $HOME/.config/waybar/ 
        cp -r $HOME/Dotfiles/theme/waybar/snowmachine/waybar/ ~/.config/
        cp $HOME/Dotfiles/theme/waybar/snowmachine/optionmenu.conf ~/.config/hypr/  
 cp $HOME/Dotfiles/theme/waybar/snowmachine/optionmenu.conf ~/.config/hypr/  
      elif [[ $inputw == "q" ]]; then
        echo out
      else
        sed -i '3s/.*/  "position": "'$inputw'",/' ~/.config/waybar/config 
      fi
      killall waybar
      nohup waybar>/dev/null 2>&1 &
      ;;
    3)
      clear
      printf "${stringd}"
      read -s -n 1 inputd
      case "$inputd" in
        1) cp $HOME/Dotfiles/theme/decoration/cozy/decoration.conf ~/.config/hypr/
        ;;
        2) cp $HOME/Dotfiles/theme/decoration/compact/decoration.conf ~/.config/hypr/
        ;;
        3) cp $HOME/Dotfiles/theme/decoration/glassy/decoration.conf ~/.config/hypr/ 
        ;;
        *) 
        ;;
      esac 
      ;;
    *)
      echo "Type 'htm' to open this menu again"
      break 
      ;;
  esac
done
exit
#old code
#if [[ "$number" -eq 1 ]]; then
#  exec $HOME/Dotfiles/theme/cozy/startup.sh & 
#  exec Hyprland
#elif [[ "$number" -eq 2 ]]; then
#  exec $HOME/Dotfiles/theme/simple/startup.sh &
#  exec Hyprland
#else
#    echo "Type 'htm' to open this menu again"
#fi

