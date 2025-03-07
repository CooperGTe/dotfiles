import { Gtk } from "astal/gtk3"
import Wp from "gi://AstalWp"
import { bind, Variable } from "astal";

export default function AudioSlider() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!

    const audioRevealer = Variable(false)
    return (
    <eventbox
        onHover={() => {
            audioRevealer.set(true)
        }}
        onHoverLost={() => {
            audioRevealer.set(false)
        }}
        onScroll={(_, event) => 
            event.delta_y > 0 
            ? speaker.volume -= 0.01 
            : speaker.volume += 0.01 
        }>
        <box className="AudioSlider" vertical>
            <revealer
                revealChild={audioRevealer()}
                transitionDuration={500}
                transitionType={Gtk.RevealerTransitionType.SLIDE_UP}>
                <box vertical css="min-height: 80px" >
                <slider
                    vexpand
                    vertical
                    inverted
                    onChangeValue={(self) => {speaker.volume = self.value}}
                    value={bind(speaker, "volume")}
                />
                <label 
                    label={bind(speaker, "volume").as((volume) =>
                    Math.round(volume * 100).toString(),
                )} />
                </box>
            </revealer>
            <icon icon={bind(speaker, "volumeIcon")} />
        </box>
    </eventbox>
    )
}
