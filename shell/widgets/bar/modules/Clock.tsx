import { Variable, GLib, bind } from "astal"
import { Gtk } from "astal/gtk3"

export default function Time() {
    const time = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format("%H")!)
    const mtime = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format("%M")!)


    return <box vertical className="Time">
        <label
            onDestroy={() => time.drop()}
            label={time()}
        />
        <label
            onDestroy={() => mtime.drop()}
            label={mtime()}
        />
    </box>
}
