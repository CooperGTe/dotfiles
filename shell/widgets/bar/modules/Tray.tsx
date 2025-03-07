import { Gtk, Gdk } from "astal/gtk3"
import { GtkWidget } from 'src/lib/types/widget';
import Tray from "gi://AstalTray"
import { Glib, bind, Variable } from "astal";
import { timeout } from "astal/time"

export default function SysTray() {
    const tray = Tray.get_default()

    const trayRevealer = Variable(false)
    let timeoutTray;
    return (
    <box vertical className="tray-box">
        <eventbox
        vertical
        cursor='pointer'
        onClickRelease={() => {
            trayRevealer.set(!trayRevealer.get())
            clearTimeout(timeoutTray)

            timeoutTray = setTimeout(() => {
                trayRevealer.set(false)
            }, 15000);
            print(trayRevealer())
        }}>
            <icon icon="setting-symbolic" className="tray-button"/>
        </eventbox>
        <revealer
            revealChild={trayRevealer()}
            transitionDuration={500}
            transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}
        > 
            <box className="SysTray" vertical>
                {bind(tray, "items").as(items => items.map(item => (
                    <menubutton
                        tooltipMarkup={bind(item, "tooltipMarkup")}
                        usePopover={false}
                        actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
                        menuModel={bind(item, "menuModel")}>
                        <icon gicon={bind(item, "gicon")} />
                    </menubutton>
                )))}
            </box>
        </revealer>
    </box>
    )
}

