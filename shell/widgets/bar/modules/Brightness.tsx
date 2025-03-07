import { Gtk } from "astal/gtk3"
import Brightness from "../../../utils/brightness";
import { bind, Variable } from "astal";


export default function BrightnessSlider() {
    const brightness = Brightness.get_default();

    const brigRevealer = Variable(false)
    return (
    <eventbox
        onHover={() => {
            brigRevealer.set(true)
        }}
        onHoverLost={() => {
            brigRevealer.set(false)
        }}
        onScroll={(_, event) => 
            event.delta_y > 0 
            ? brightness.screen -= 0.01 
            : brightness.screen += 0.01 
        }>
        <box className="BrightnessSlider" vertical>
        <revealer
            revealChild={brigRevealer()}
            transitionDuration={500}
            transitionType={Gtk.RevealerTransitionType.SLIDE_UP}>
            <box vertical css="min-height:80px;">
                <slider 
                    vertical
                    vexpand
                    inverted
                    onChangeValue={(self) => {
                      brightness.screen = self.value;
                    }}
                    min={0.1}
                    value={bind(brightness, "screen")}
                />
                <label 
                    label={bind(brightness, "screen").as((volume) =>
                    Math.round(volume * 100).toString(),
                )}/>
            </box>
        </revealer>
        <icon icon={"display-brightness-symbolic"} css="font-size: 18px;"/>
        </box>
    </eventbox>
    )
}
