const date = Variable("", {
  poll: [1000, 'date "+%H:%M:%S:%N"'],
})
const daten = Variable("", {
  poll: [1000, ['bash', '-c', 'date "+%N"| cut -c 1-4'],],
})


export function LifeSupport() {
  const time = Widget.Label({
    label: date.bind(),
  })
  return Widget.Box ({
    class_name: "life",
    children: [time]
  })
}
