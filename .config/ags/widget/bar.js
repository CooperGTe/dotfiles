import brightness from "../services/brightness.js";

const hyprland = await Service.import("hyprland")
const notifications = await Service.import("notifications")
const mpris = await Service.import("mpris")
const audio = await Service.import("audio")
const battery = await Service.import("battery")
const systemtray = await Service.import("systemtray")
const dateh = Variable("", {  poll: [1000, 'date "+%H"']})
const datem = Variable("", {  poll: [1000, 'date "+%M"']})

//const date = Variable("", {
//  poll: [1000, 'date "+%H:%M:%S | %A(%d) %b(%m) %Y"'],
//})

function Icon() {
  return Widget.Button({
    class_name: "icon-box",
    child: Widget.Label({
      label: "󰣇",
      class_name: "icon",
    }),
    on_clicked: () => {
      Utils.execAsync(['bash', '-c', 'ags --toggle-window controlpanel-0'])
    }
  })
}



function Brightness() {
  const icon = Widget.Icon ({
    icon : 'display-brightness-symbolic',
    size : 15,
  })
  const brightnessLabel = Widget.Label ({
    label: brightness.bind('screen-value').as(v => `${v}`),
    setup: self => self.hook(brightness, (self, screenValue) => {
    self.label = `${brightness.screenValue}`;
    self.label = `${brightness.screen_value}`;
    self.label = `${brightness['screen-value']}`;
    }, 'screen-changed'),
  })
  return Widget.Box ({
    class_name: "brightness",
    vertical: true,
    children: [icon, brightnessLabel],
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
    halign: 'end',  
  })
  return Widget.Box({
    class_name: "volume",
    vertical: true,
    children: [icon, volumeLabel],
  })
}





function Workspaces() {
  const activeId = hyprland.active.workspace.bind("id");
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
      vertical: true,
    }
  )
}



function Arrow() {
  return Widget.Label({
    class_name: "arrow",
    label: "",
  })
}



function ClientTitle() {
  return Widget.Label({
    class_name: "client-title",
    label: hyprland.active.client.bind("title"),
    justification: 'left',
    truncate: 'end',
    xalign: 0,
    maxWidthChars: 45,
    wrap: true,
    useMarkup: true,
  })
}



function Clock() {
  return Widget.Box({
    class_name: "clock-box",
    vertical: true,
    children: [ 
      Widget.Label({
        class_name: "clock",
        label: dateh.bind(),
      }),
      Widget.Label({
        class_name: "clock",
        label: datem.bind(),
      })
    ]
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
    child: Widget.Label({ 
      label, 
      justification: 'left',
      truncate: 'end',
      xalign: 0,
      maxWidthChars: 45,
      wrap: true,
      useMarkup: true,
    }),
  })
}


//CPU AND RAM status
const divide = ([total, free]) => free / total

const cpu = Variable(0, {
  poll: [2000, 'top -b -n 1', out => divide([100, out.split('\n')
    .find(line => line.includes('Cpu(s)'))
    .split(/\s+/)[1]
    .replace(',', '.')])],
  }
)

const ram = Variable(0, {
  poll: [2000, 'free', out => divide(out.split('\n')
    .find(line => line.includes('Mem:'))
    .split(/\s+/)
    .splice(1, 2))],
  }
)

function RAM() {
  return Widget.CircularProgress({
    rounded: true,
    class_name: "ram",
    value: ram.bind()
  })
}
function CPU() {
  return Widget.CircularProgress({
    rounded: true,
    class_name: "cpu",
    value: cpu.bind(),
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
        vertical: true,
        hpack: "center",
        children: [
            Widget.LevelBar({
                widthRequest: 8,
                heightRequest: 80,
                vertical: true,
                hpack: "center",
                value,
            }),
            Widget.Icon({ icon, size:15 }),
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
      child: Widget.Icon({ 
        icon: item.bind("icon"), 
        size: 15,
      }),
      on_primary_click: (_, event) => item.activate(event),
      on_secondary_click: (_, event) => item.openMenu(event),
      tooltip_markup: item.bind("tooltip_markup"),
      class_name: "tray",
  })))
  return Widget.Box({
    vertical: true,
    children: items,
  })
}

function Button1() {
  return Widget.Button({
    class_name: "button1",
    label: "O",
  })
}
function Button2() {
  return Widget.Button({
    class_name: "button2",
    label: "O",
    on_clicked: () => {
        Utils.execAsync(['bash', '-c', 'ags --toggle-window desktopwidget-0'])
      }
  })
}
function Button3() {
  return Widget.Button({
    class_name: "button3",
    label: "O",
  })
}


// layout of the bar
export function TopBar() {
  return Widget.Box(
    {
      class_name: "top",
      spacing: 8,
      vertical: true,
      children: [
        Icon(),
        Brightness(),
        Volume(),
        Workspaces(),
        Clock(),
        //Arrow(),
        //ClientTitle(),
      ],
    } 
  )
}

export function CenterBar() {
  return Widget.Box(
    {
      class_name: "center",
      spacing: 8,
      vertical: true,
      children: [
        //Media(),
        BatteryLabel(),
        RAM(),
        CPU(),
        SysTray(),
      ],
    }
  )
}

export function BottomBar() {
  return Widget.Box(
    {
      class_name: "bottom",
      spacing: 8,
      vpack: "end",
      vertical: true,
      children: [
        Button1(),
        Button2(),
        Button3(),
      ],
    }
  )
}

