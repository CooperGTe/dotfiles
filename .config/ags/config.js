const hyprland = await Service.import("hyprland")
const notifications = await Service.import("notifications")
const mpris = await Service.import("mpris")
const audio = await Service.import("audio")
const battery = await Service.import("battery")
const systemtray = await Service.import("systemtray")

const date = Variable("", {
    poll: [1000, 'date "+%H:%M:%S %b %e. %y"'],
})

// widgets can be only assigned as a child in one container
// so to make a reuseable widget, make it a function
// then you can simply instantiate one by calling it

function Icon() {
  return Widget.Label(
    {
      class_name: "icon",
      label: " 󰣇 ",
    }
  )
}
//  const activeId = hyprland.active.workspace.bind("id")
//  const workspaces = hyprland.bind("workspaces")
//    .as(ws => ws.filter(({ id }) => id !== -98) // Filter out the special workspace
//    .sort((a, b) => a.id - b.id)
//    .map(({ id }) => Widget.Button(
//      {
//       on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
//        child: Widget.Label(`${id}`),
//        class_name: activeId.as(i => `${i === id ? "focused" : ""}`),
//      }
//    )))
  
function Workspaces() {
  const activeId = hyprland.active.workspace.bind("id");
  // Define the persistent workspaces
  const persistentWorkspaces = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 }
  ];
  const characters = ['一', '二', '三', '四', '五', '六'];
  const workspaces = persistentWorkspaces.map(
    ({ id }, index) => Widget.Button(
      {
        on_clicked: () => hyprland.messageAsync(`dispatch workspace ${id}`),
        child: Widget.Label(characters[index]),
        class_name: activeId.as(i => `${i === id ? "focused" : ""}`),
      }
    )
  );
  return Widget.Box(
    {
      class_name: "workspaces",
      children: workspaces,
    }
  )
}

function Arrow() {
  return Widget.Label(
    {
      class_name: "arrow",
      label: "",
    }
  )
}

function ClientTitle() {
  return Widget.Label(
    {
      class_name: "client-title",
      label: hyprland.active.client.bind("title"),
    }
  )
}


function Clock() {
    return Widget.Label({
        class_name: "clock",
        label: date.bind(),
    })
}


// we don't need dunst or any other notification daemon
// because the Notifications module is a notification daemon itself
function Notification() {
    const popups = notifications.bind("popups")
    return Widget.Box({
        class_name: "notification",
        visible: popups.as(p => p.length > 0),
        children: [
            Widget.Icon({
                icon: "preferences-system-notifications-symbolic",
            }),
            Widget.Label({
                label: popups.as(p => p[0]?.summary || ""),
            }),
        ],
    })
}


function Media() {
    const label = Utils.watch("", mpris, "player-changed", () => {
        if (mpris.players[0]) {
            const { track_artists, track_title } = mpris.players[0]
            return `${track_artists.join(", ")} - ${track_title}`
        } else {
            return "Nothing is playing"
        }
    })

    return Widget.Button({
        class_name: "media",
        on_primary_click: () => mpris.getPlayer("")?.playPause(),
        on_scroll_up: () => mpris.getPlayer("")?.next(),
        on_scroll_down: () => mpris.getPlayer("")?.previous(),
        child: Widget.Label({ label }),
    })
}


function Volume() {
    const icons = {
        101: "overamplified",
        67: "high",
        34: "medium",
        1: "low",
        0: "muted",
    }

    function getIcon() {
        const icon = audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
            threshold => threshold <= audio.speaker.volume * 100)

        return `audio-volume-${icons[icon]}-symbolic`
    }

    function getVolumeText() {
        return `${Math.round(audio.speaker.volume * 100)}%`
    }

    const icon = Widget.Icon({
        icon: Utils.watch(getIcon(), audio.speaker, getIcon),
        size: 15,
    })

    const volumeLabel = Widget.Label({
        label: Utils.watch(getVolumeText, audio.speaker, getVolumeText),
        halign: 'end',  // Align text to the end if needed
    })

    return Widget.Box({
        class_name: "volume",
        css: "min-width: 10px",
        children: [icon, volumeLabel],
    })
}




function BatteryLabel() {
    const value = battery.bind("percent").as(p => p > 0 ? p / 100 : 0);
    const icon = battery.bind("percent").as(p =>
        `battery-level-${Math.floor(p / 10) * 10}-symbolic`);

    const percentageText = battery.bind("percent").as(p => `${p}%`);

    return Widget.Box({
        class_name: "battery",
        visible: battery.bind("available"),
        children: [
            Widget.Icon({ icon, size:15 }),
            Widget.LevelBar({
                widthRequest: 80,
                heightRequest: 8,
                vpack: "center",
                value,
            }),
            Widget.Label({
                label: percentageText,
                halign: 'end', // Adjust alignment as needed
            }),
        ],
    });
}



function SysTray() {
    const items = systemtray.bind("items")
        .as(items => items.map(item => Widget.Button({
            child: Widget.Icon({ icon: item.bind("icon") }),
            on_primary_click: (_, event) => item.activate(event),
            on_secondary_click: (_, event) => item.openMenu(event),
            tooltip_markup: item.bind("tooltip_markup"),
        })))

    return Widget.Box({
        children: items,
    })
}


// layout of the bar
function Left() {
  return Widget.Box(
    {
      spacing: 8,
      children: [
        Icon(),
        Workspaces(),
        Arrow(),
        ClientTitle(),
      ],
    } 
  )
}

function Center() {
  return Widget.Box(
    {
      spacing: 8,
      children: [
        Media(),
        Notification(),
      ],
    }
  )
}

function Right() {
  return Widget.Box(
    {
      class_name: "right",
      hpack: "end",
      spacing: 8,
      children: [
        Volume(),
        BatteryLabel(),
        Clock(),
        SysTray(),
      ],
    }
  )
}

function Bar(monitor = 0) {
    return Widget.Window({
        name: `bar-${monitor}`, // name has to be unique
        class_name: "bar",
        margins: [5, 6, 0, 5],
        monitor,
        anchor: ["top", "left", "right"],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            start_widget: Left(),
            center_widget: Center(),
            end_widget: Right(),
        }),
    })
}

App.config({
    style: "./style.css",
    windows: [
        Bar(),

        // you can call it, for each monitor
        // Bar(0),
        // Bar(1)
    ],
})

export { }
