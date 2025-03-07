import { Astal, Gtk, Gdk, astalify, App } from "astal/gtk3"

import { Home, Notif } from "./modules/PanelButton"
import Workspaces from "./modules/Workspaces"
import SysTray from "./modules/Tray"
import MprisPlayers from "./modules/Mpris"
import Wifi from "./modules/Wifi"
import BatteryLevel from "./modules/Power"
import BrightnessSlider from "./modules/Brightness"
import AudioSlider from "./modules/Volume"
import Time from "./modules/Clock"

import Panel from "./Panel/Panel.tsx"
import NotificationCenter from "./NotificationCenter/NotificationCenter"

import { HomeRevealer, NotifRevealer, BarRevealer, HomeTime, NotifTime } from "./variable.ts"

export default function Bar(monitor: Gdk.Monitor) {
    const anchor = Astal.WindowAnchor.TOP
        | Astal.WindowAnchor.LEFT
        | Astal.WindowAnchor.BOTTOM

    return <window
        className="Bar"
        gdkmonitor={monitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={anchor}
        margin-right={-10}
        //margin-left={-5}
        >
        <box className="Panelcontainer" clickThrough={true}> 
            <revealer
                revealChild={HomeRevealer()}
                transitionDuration={HomeTime()}
                transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
            > 
            <Panel /> 
            </revealer>
            <revealer
                revealChild={NotifRevealer()}
                transitionDuration={NotifTime()}
                transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
            > 
            <NotificationCenter />
            </revealer>
            <revealer
                revealChild={BarRevealer()}
                transitionDuration={100}
                transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
            > 
            <box className="container">
                <centerbox vertical="true">
                    <box vexpand valign={Gtk.Align.START} vertical>
                        <Home />
                        <Workspaces />
                        <SysTray />
                    </box>
                    <box>
                        <MprisPlayers />
                    </box>
                    <box vexpand valign={Gtk.Align.END}  vertical="true">
                        <box vertical className="ctrl" spacing="0">
                            <Wifi />
                            <BatteryLevel />
                            <BrightnessSlider />
                            <AudioSlider />
                        </box>
                        <Time />
                        <Notif />
                    </box>
                </centerbox>
            </box>
            </revealer>
        </box>
    </window>
}
