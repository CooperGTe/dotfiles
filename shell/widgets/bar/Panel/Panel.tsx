import { Astal, Gtk, Gdk, astalify, App } from "astal/gtk3"
import { Glib, bind, Variable } from "astal";

import UserHeader from "./modules/UserHeader.tsx"
import DesktopControls from "./modules/DesktopControls.tsx"
import MprisPlayers from "./modules/Mpris.tsx"
import Times from "./modules/Times.tsx"

import { HomeRevealer, NotifRevealer, BarRevealer, HomeTime, NotifTime } from "../variable.ts"

export default function Panel() {
    return <box className="Panel">
        <centerbox vertical="true">
            {/*Navigation Menu*/}
            <box 
                vertical
                vexpand 
                valign={Gtk.Align.START}>
                <box className="nav_menu">
                    <button 
                        onClickRelease={() => {
                            NotifTime.set(500)
                            HomeTime.set(500)
                            HomeRevealer.set(!HomeRevealer.get())
                            BarRevealer.set(true)
                        }}>
                            <icon icon="arrow-left-double" /> 
                        </button>
                    <button 
                        className="notif_button"
                        onClickRelease={() => {
                            NotifTime.set(0)
                            HomeTime.set(0)
                            NotifRevealer.set(!NotifRevealer.get())
                            HomeRevealer.set(!HomeRevealer.get())
                        }}>
                        <box> 
                            <icon icon="notification-symbolic" />
                            <label label="Notification Center" />
                        </box>
                    </button>
                </box>
                <UserHeader /> 
                <DesktopControls />
                <MprisPlayers />
            </box>
            <box vertical valign={Gtk.Align.START}>
            </box>
            <box vexpand valign={Gtk.Align.END}  vertical="true">
                <Times />
            </box>
        </centerbox>
    </box>
}
