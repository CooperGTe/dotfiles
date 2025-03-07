export LANG=en_US.UTF-8

export EDITOR=nvim
export VISUAL="$EDITOR"

NEWLINE=$'\n'
#PROMPT="%K{#ff0000} %n %~ %K{#00000000} >"
PROMPT="$NEWLINE┌ %F{#89B4FA}%F{bright_white}%K{#89B4FA}%n%F{#89B4FA}%K{#00000000} %F{#303030}%F{bright_white}%K{#303030}%m%F{#303030}%K{#202020} %F{bright_white}%~ %F{#202020}%K{#00000000}%F{bright_white}$NEWLINE└ > "
#PROMPT="$NEWLINE %F{#444444}%/%F{#ffffff}% $NEWLINE > "
#PROMPT="${NEWLINE}%B%F{black}%K{blue}%n%F{blue}%K{#444444}%F{#444444}%K{#262626}%F{bright_white}%m%F{#262626}%K{red}%F{black}%~%F{red}%K{#00000000} %b%F{bright_white}"
# The following lines were added by compinstall

zstyle ':completion:*' completer _expand _complete _ignored
zstyle :compinstall filename '/home/katsuro/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall

export HISTFILE=~/.zsh_history
export HISTSIZE=100000
export SAVEHIST=500000

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


# Declare the variable
typeset -A ZSH_HIGHLIGHT_STYLES

ZSH_HIGHLIGHT_STYLES[command]='fg=#afDfff'
ZSH_HIGHLIGHT_STYLES[builtin]='fg=#AAFFFF'
ZSH_HIGHLIGHT_STYLES[unknown-token]='fg=#ffbfbf'

# To have paths colored instead of underlined
ZSH_HIGHLIGHT_STYLES[path]='fg=cyan'


ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="fg=#4a4a4a,underline"


bindkey '^[[1;5A' history-substring-search-up
bindkey '^[[1;5B' history-substring-search-down


# ALIASES
export PF_COL3=6
export PF_COL3=6
export SWWW_TRANSITION_POS=0.99,0.985
export SWWW_TRANSITION=grow
export SWWW_TRANSITION_STEP=50
export SWWW_TRANSITION_FPS=255
export SWWW_TRANSITION_DURATION=1
#aliases
alias brightness='brightnessctl -c backlight set'
alias volume='pactl set-s`ink-volume @DEFAULT_SINK@'

alias ls='ls --color=auto -a'
alias grep='grep --color=auto'

alias nmcliscan='nmcli device wifi list'
alias nmcliconnect='nmcli device wifi connect'

alias htm='$HOME/Dotfiles/scripts/thememanager.sh'
alias type='function _cats() { $HOME/Dotfiles/scripts/type.sh "$1"; }; _cats'
alias pls='sudo'
alias nmrestart='sudo systemctl restart NetworkManager'
alias btrestart='sudo systemctl restart bluetooth'
alias yt-audio='yt-dlp -x --audio-format mp3 --audio-quality 0'
alias dramc='echo 3 | pkexec tee /proc/sys/wm/drop_caches'

