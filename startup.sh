#!/bin/bash

#  ___  ___ ___ _  _   _ _  _____   ___ _____ _   ___ _____ _   _ ___   
# |   \| __| __/_\| | | | ||_   _| / __|_   _/_\ | _ \_   _| | | | _ \ 
# | |) | _|| _/ _ \ |_| | |__| |   \__ \ | |/ _ \|   / | | | |_| |  _/ 
# |___/|___|_/_/ \_\___/|____|_|   |___/ |_/_/ \_\_|_\ |_|  \___/|_|   
#
# START UP DEFAULT VARIABLE

decoration="compact" #cozy, compact, glassy
waybar="snowmachine" #floating, compact
forcetransparentterminal="false" #true, false
border="2"
gapsin="25"
gapsout="50"
corner="5"
blur="false" #true, false
activeopacity="1"
inactiveopacity="1"
tilegap="0"

# START UP SCRIPT

#hyprland
cp $HOME/Dotfiles/hyprland/hyprland.conf /home/katsuro/.config/hypr/
cp $HOME/Dotfiles/hyprland/hypridle.conf /home/katsuro/.config/hypr/
#decoration
cp $HOME/Dotfiles/theme/decoration/"$decoration"/decoration.conf ~/.config/hypr/  
#waybar
rm -rf $HOME/.config/waybar/ 
cp -r $HOME/Dotfiles/theme/waybar/"$waybar"/waybar/ ~/.config/
#general
cp $HOME/Dotfiles/theme/general/general.conf ~/.config/hypr/ 

#modifying conf with variable
#forcetransparentterminal
if [[ $forcetransparentterminal == "false" ]]; then
  sed -i "s/opacity 0.85 override, class:.*/opacity 0.85 override, class:(kittydisabled)/g" ~/.config/hypr/hyprland.conf
elif [[ $forcetransparentterminal == "true" ]]; then
  sed -i "s/opacity 0.85 override, class:.*/opacity 0.85 override, class:(kitty)/g" ~/.config/hypr/hyprland.conf
fi
#border
sed -i "s/border_size = .*/border_size = "$border"/g" ~/.config/hypr/general.conf
#gapsin
sed -i "s/gaps_in = .*/gaps_in = "$gapsin"/g" ~/.config/hypr/general.conf
#gapsout
sed -i "s/gaps_out = .*/gaps_out = "$gapsout"/g" ~/.config/hypr/general.conf
#corner
sed -i "s/rounding = .*/rounding = "$corner"/g" ~/.config/hypr/decoration.conf
#blur
sed -i "s/enabled = .*/enabled = "$blur"/g" ~/.config/hypr/decoration.conf
#activeopacity
sed -i "s/active_opacity = .*/active_opacity = "$activeopacity"/g" ~/.config/hypr/decoration.conf
#inactiveopacity
sed -i "s/inactive_opacity = .*/inactive_opacity = "$inactiveopacity"/g" ~/.config/hypr/decoration.conf
#tilegap
sed -i '100s/.*/windowrulev2 = opacity '$tilegap', title:^(invis)$/' ~/.config/hypr/hyprland.conf 

cp -r $HOME/Dotfiles/hyprland/kitty/ /home/katsuro/.config/

sleep 10
echo > ~/Dotfiles/.tmp/knline

