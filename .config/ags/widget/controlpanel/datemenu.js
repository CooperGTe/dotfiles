const date = Variable("", {
  poll: [1000, 'date "+%H:%M:%S:"'],
})
const daten = Variable("", {
  poll: [1000, ['bash', '-c', 'date "+%N"| cut -c 1-4'],],
})


export function DateMenu() {
  const calendar = Widget.Calendar({
    showDayNames: true,
    showDetails: false,
    showHeading: true,
    showWeekNumbers: true,
    onDaySelected: ({ date: [y, m] }) => {
        print(`${y}. ${m}.`)
    },
  })
  function Clock() {
    return Widget.Box ({
      class_name: "pclock",
      children: [
        Widget.Label ({
          label: date.bind(),
          class_name: "pclocka",
          halign: 'end',
        }),
        Widget.Label ({
          label: daten.bind(),
          class_name: "pclockb",
          vpack: 'end',
        }),
      ]
    })
  }
  return Widget.Box({
    class_name: "datemenu",
    vertical: true,
    children:[Clock(), calendar]
  })
}
