echo " quick option"

printf "
1.Over the home network
2.Over the phone network
3.Over Tailscale Tunnel
4.EndFrame Server SSH (Tailscale)
5.Ping 1.1.1.1
6.Ping google.com
- Quit

input: "
read -n 1 input
echo "
"
case ${input} in
  1)
   echo 192.168.1.150
   ssh katsuro@192.168.1.150
   ;;
  2)
   echo 192.168.43.37
   ssh katsuro@192.168.43.37
   ;;
  3)
   ssh katsuro@100.107.184.78
   ;;
  4)
   ssh -p 8022 a0_a121@100.123.175.107
   ;;
  5)
    ping 1.1.1.1
   ;;
  6)
    ping google.com
   ;;
  *)
   echo Quit
   ;;
esac
