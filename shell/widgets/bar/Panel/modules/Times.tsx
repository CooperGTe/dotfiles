import { Gtk } from "astal/gtk3"
import { bind, GLib, Variable } from 'astal'
import Calendar from "../../../../utils/calendar.ts" 

export default function () {
    const time = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format("%H")!)
    const mtime = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format("%M")!)
    const date = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format("%a, %b %-d")!)

    return (
    <box vertical className="timesbox">
    <box className="dates" halign={Gtk.Align.FILL}>
    <label
        onDestroy={() => date.drop()}
        label={date()} 
        hexpand={true}
        halign={Gtk.Align.START}
        />
    </box>
    <box className="cal">
        <Calendar className="calendar"/> 
        <box 
            vertical
            vexpand
            hexpand
            > 
            <label
                onDestroy={() => time.drop()}
                label={time()} />
            <label
                onDestroy={() => mtime.drop()}
                label={mtime()} />
            </box>
        </box>
    </box>
    )
}
