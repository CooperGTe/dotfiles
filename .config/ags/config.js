import { TopBar } from "./widget/bar.js"
import { CenterBar } from "./widget/bar.js"
import { BottomBar } from "./widget/bar.js"
import { TopPanel } from "./widget/controlpanel.js"
import { CenterPanel } from "./widget/controlpanel.js"
import { BottomPanel } from "./widget/controlpanel.js"
import { DesktopWidget } from "./widget/desktopwidget.js"
import { LifeSupport } from "./widget/lifesupport.js"

function Bar(monitor = 0) {
  return Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    class_name: "bar",
    margins: [0, 0, 5, 0],
    monitor,
    anchor: ["top", "left", "bottom"],
    exclusivity: "exclusive",
    layer: "top",
    child: Widget.CenterBox({
      vertical: true,
      start_widget: TopBar(),
      center_widget: CenterBar(),
      end_widget: BottomBar(),
    }),
  })
}

function ControlPanelWin(monitor = 0) {
  return Widget.Window({
    name: `controlpanel-${monitor}`,
    class_name: "controlpanel",
    monitor,
    visible: false,
    anchor: ["left", "top", "bottom"],
    margins: [10, 0, 10, 10],
    exclusivity: "exclusive",
    layer: "top",
    child: Widget.CenterBox({
      vertical: true,
      start_widget: TopPanel(),
      center_widget: CenterPanel(),
      end_widget: BottomPanel(),
    }),
  })
}

function DesktopWidgetBox(monitor = 0) {
  return Widget.Window({
    name: `desktopwidget-${monitor}`,
    class_name: "desktopwidget",
    monitor,
    visible: false,
    layer: "background",
    margins: [0, 0, 0, 0],
    exclusivity: "ignore",
    child: DesktopWidget(),
  })
}

//function LifeOverlay(monitor = 0) {
//  return Widget.Window({
//    name: `lifeoverlay-${monitor}`,
//    class_name: "lifeoverlay",
//    monitor,
//    visible: false,
//    keymode: "none",
//    layer: "bottom",
//    exclusivity: "ignore",
//    child: LifeSupport(),
//  })
//}

App.config({
  style: "./style.css",
  closeWindowDelay: {
    "controlpanel-0": 0, // milliseconds
  },
  windows: [
    Bar(),
    ControlPanelWin(),
    DesktopWidgetBox(),
    //LifeOverlay(),
    // you can call it, for each monitor
    // Bar(0),
    // Bar(1)
   ],
})

export { }
