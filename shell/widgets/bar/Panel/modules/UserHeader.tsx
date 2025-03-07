import { Gtk } from 'astal/gtk3'
import { execAsync, Variable, bind } from 'astal'
import GLib from "gi://GLib"
import Battery from "gi://AstalBattery"

const HOME = GLib.getenv("HOME")
const USER = GLib.getenv("USER")

export default function() {
    const battery = Battery.get_default()
    return (
    <box
        className='user_box'
        spacing={12}>
        {/* Face */}
        <circularprogress 
            value={bind(battery, "percentage")} 
            className="batterystat"
            startAt=".76" 
            endAt=".75">
            <box
                className='face'
                css={`background-image: url('${HOME}/Dotfiles/profile/profile.png');`}>
                
            </box>
        </circularprogress>
        {/* Details */}
        <box
            className='details'
            valign={Gtk.Align.CENTER}
            spacing={2}
            vertical={true}>
        {/* Username */}
        <label
            className='username'
            label={USER}
            xalign={0} />
        {/* WM */}
        <label
            className='wm'
            label='HYPRLAND'
            xalign={0} />
        </box>
        <box>
                
        </box>
    </box>
    )
}
