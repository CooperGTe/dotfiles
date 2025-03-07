import { Gtk } from "astal/gtk3";
import { bind, Variable } from "astal";
import GLib from "gi://GLib"

import { HomeRevealer, NotifRevealer, BarRevealer } from "../variable.ts"

const HOME = GLib.getenv("HOME")

export function Home() {
    return ( 
    <button 
        css={`background-image: url('${HOME}/Dotfiles/profile/profile.png');`}
        className="home-button"
        onClickRelease={() => {
            HomeRevealer.set(!HomeRevealer.get())
            NotifRevealer.set(false)
            if (!HomeRevealer && !NotifRevealer) {
                BarRevealer.set(true)
            } else {
                BarRevealer.set(false)
            }
        }} 
    />
    )
}
export function Notif() {
    return (
    <button 
        onClickRelease={() => {
            NotifRevealer.set(!NotifRevealer.get())
            HomeRevealer.set(false)
            if (!HomeRevealer && !NotifRevealer) {
                BarRevealer.set(true)
            } else {
                BarRevealer.set(false)
            }
        }} 
    > 
        <icon icon="notification-symbolic"/>
    </button>
    )
}
