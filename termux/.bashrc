PROMPT_COMMAND='PS1_CMD1=$(mini_ip addr show | grep "wlan0" | awk "{print \$2}" | grep -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" | sed "s/\/24//")';
PS1='\[\e[38;5;208m\]\[\e[38;5;233;48;5;208m\] \[\e[1m\]\u\[\e[0;38;5;208m\]\[\e[0m\] ${PS1_CMD1} \[\e[38;5;235m\]\[\e[38;5;255;48;5;235m\] \[\e[39m\]\w\[\e[0;38;5;235m\]\n\[\e[0m\] \$ '

alias qssh="~/script.sh"
alias java25="/data/data/com.termux/files/usr/lib/jvm/java-25-openjdk/bin/java"
alias home="cd ~/storage/shared/"
