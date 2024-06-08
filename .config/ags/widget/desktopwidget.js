const hour = Variable("", {
  poll: [1000, 'date "+%H"'],
})
const minute = Variable("", {
  poll: [1000, 'date "+%M"'],
})
const day = Variable("", {
  poll: [10000, 'date "+%A"'],
})
const month = Variable("", {
  poll: [10000, 'date "+%B"'],
})
const fulldate = Variable("", {
  poll: [10000, 'date "+%d:%m:%Y"'],
})


export function DesktopWidget() {
  const clock = Widget.Box({
    vertical: true,
    css: "border-right: 3px solid #ffffff; padding: 10px;",
    children: [
      Widget.Label ({
        label: hour.bind(),
        css: "font-size: 80px; font-weight: normal; margin: -20px 0px",
      }),
      Widget.Label ({
        label: minute.bind(),
        css: "font-size: 80px; font-weight: normal; margin: -20px 0px",
      }),
    ]
  })
  const days = Widget.Box ({
    vertical: true,
    children: [
      Widget.Label ({
        label: day.bind(),
        css: "font-size: 100px; font-weight: normal; padding-left: 50px; margin-bottom: -20px",
      }),
      Widget.Box ({
        css: "padding-left: 50px;",
        children: [
          Widget.Label ({
            label: month.bind(),
            css: "font-size: 20px; font-weight: normal; padding-right: 20px; margin-left: 5px;",
          }),
          Widget.Label ({
            label: fulldate.bind(),
            css: "font-size: 20px; font-weight: normal;",
          }),
        ]
      })
    ]
  })
  return Widget.Box ({
    class_name: "desktopwidget",
    children: [clock, days]
  })
}
