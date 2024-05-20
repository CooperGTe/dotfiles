NEWLINE=$'\n'
PROMPT="${NEWLINE}%B%F{black}%K{blue}%n%F{blue}%K{#444444}%F{#444444}%K{#262626}%F{bright_white}%m%F{#262626}%K{red}%F{black}%~%F{red}%K{#00000000} %b%F{bright_white}"
# The following lines were added by compinstall

zstyle ':completion:*' completer _expand _complete _ignored
zstyle :compinstall filename '/home/katsuro/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall

export HISTFILE=~/.zsh_history
export HISTSIZE=10000
export SAVEHIST=50000

# HISTORY
setopt EXTENDED_HISTORY          # Write the history file in the ':start:elapsed;command' format.
setopt HIST_EXPIRE_DUPS_FIRST    # Expire a duplicate event first when trimming history.
setopt HIST_FIND_NO_DUPS         # Do not display a previously found event.
setopt HIST_IGNORE_ALL_DUPS      # Delete an old recorded event if a new event is a duplicate.
setopt HIST_IGNORE_DUPS          # Do not record an event that was just recorded again.
setopt HIST_IGNORE_SPACE         # Do not record an event starting with a space.
setopt HIST_SAVE_NO_DUPS         # Do not write a duplicate event to the history file.
setopt SHARE_HISTORY             # Share history between all sessions.
# END HISTORY

# plugins
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh

export PF_COL3=6
export PF_COL3=6
pfetch
#aliases
alias skt='dunstify -h string:x-canonical-private-synchronous:katsuro -i ~/Dotfiles/profile/Katsuro_20240423174756.png katsuro'
alias ask='$HOME/Dotfiles/scripts/skt.sh'
alias brightness='brightnessctl -c backlight set'
alias volume='pactl set-sink-volume @DEFAULT_SINK@'
alias ls='ls --color=auto'
alias grep='grep --color=auto'
alias nmcliscan='nmcli device wifi list'
alias nmcliconnect='nmcli device wifi connect'
alias htm='$HOME/Dotfiles/scripts/thememanager.sh'
alias type='function _cats() { $HOME/Dotfiles/scripts/type.sh "$1"; }; _cats'
alias katsuro='sudo'
alias pls='sudo'

