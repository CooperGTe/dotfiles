import { Profile } from './controlpanel/profile.js'
import { Control } from './controlpanel/control.js'
import { Data } from './controlpanel/data.js'
import { DateMenu } from './controlpanel/datemenu.js'
import { Media } from './controlpanel/media.js'

export function TopPanel() {
  return Widget.Box({
    class_name: "toppanel",
    spacing: 0,
    vertical: true,
    children: [
      Profile(),
      Control(),
      Data(),
      DateMenu(),
    ]
  })
}
export function CenterPanel() {
  return Widget.Box({
    class_name: "centerpanel",
    vpack: "start",
    spacing: 8,
    children: [
    ]
  })
}
export function BottomPanel() {
  return Widget.Box({
    class_name: "bottompanel",
    vpack: "end",
    spacing: 8,
    children: [
      Media(),
      //Fetch(),
      //Settings(),
    ]
  })
}

