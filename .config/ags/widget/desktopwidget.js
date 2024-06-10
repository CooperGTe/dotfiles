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
  const clock = Widget.Box(
    {
      vertical: true,
      class_name: "border-right",
    },
    Widget.Label ({
      label: hour.bind(),
      class_name: "hour",
    }),
    Widget.Label ({
      label: minute.bind(),
      class_name: "minute",
    }),
  )
  const days = Widget.Box ({vertical: true},
    Widget.Label ({
      label: day.bind(),
      class_name: "day",
    }),
    Widget.Box ({css: "padding-left: 50px;"},
      Widget.Label ({
        label: month.bind(),
        class_name: "month",
      }),
      Widget.Label ({
        label: fulldate.bind(),
        class_name: "fulldate",
      })
    )
  )
  return Widget.Box ({class_name: "desktopwidget"},
    clock, 
    days
  )
}
