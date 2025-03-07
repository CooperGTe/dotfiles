import { Gtk } from "astal/gtk3"
import Battery from "gi://AstalBattery"
import { bind, Variable } from "astal";

export default function BatteryLevel() {
    const bat = Battery.get_default()

    const revealer = Variable(true)

    return (
    <eventbox
        onClickRelease={() => {
            revealer.set(!revealer.get())
        }}>
        <box className="Battery" vertical
        visible={bind(bat, "isPresent")}>
        <icon icon={bind(bat, "batteryIconName")} />
        <revealer
            revealChild={revealer()}
            transitionDuration={500}
            transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
            <label label={bind(bat, "percentage").as(p =>
                `${Math.floor(p * 100)}%`
            )} />
        </revealer>
        </box>
    </eventbox>
    )
}

