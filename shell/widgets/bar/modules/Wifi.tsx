import { Gtk } from "astal/gtk3"
import Network from "gi://AstalNetwork"
import { bind, Variable } from "astal";

export default function Wifi() {
    const { wifi } = Network.get_default()

    return <icon
        tooltipText={bind(wifi, "ssid").as(String)}
        className="Wifi"
        icon={bind(wifi, "iconName")}
    />
}


