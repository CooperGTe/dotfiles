const battery = await Service.import("battery")

export function Data() {
  function CPURAM() { 
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
    return Widget.Box ({
      class_name: "cpuram",
      children: [
        Widget.Box ({
          vertical: true,
          children: [
            Widget.Box ({
              class_name: "panel-ram-box",
              children: [
                Widget.CircularProgress({
                  rounded: false,
                  class_name: "panel-ram",
                  value: ram.bind()
                })
              ]
            }),
            Widget.Box ({
              class_name: "panel-cpu-box",
              children: [
                  Widget.CircularProgress({
                  rounded: false,
                  class_name: "panel-cpu",
                  value: cpu.bind(),
                })
              ]
            })
          ]
        }),
        Widget.Box({
          class_name: "datalabel",
          vertical: true,
          children: [
            Widget.Label({
              class_name: "ramlabel",
              label: "RAM",
            }),
            Widget.Label({
              class_name: "cpulabel",
              label: "CPU",
            })
          ]
        })
      ]
    })
  }
  function BatteryStatus() {
    function acpi() {
      const acpi = Variable("", {
        poll: [5000, 'acpi' ]
      })
      return Widget.Label ({
        label: acpi.bind(),
        class_name: "acpi",
        wrap: true,
      })
    }
    function Battery() {
      const value = battery.bind("percent").as(p => p > 0 ? p / 100 : 0);
      const icon = battery.bind("percent").as(p =>
        `battery-level-${Math.floor(p / 10) * 10}-symbolic`);
      const percentageText = battery.bind("percent").as(p => `${p}%`);
      return Widget.Box({
        class_name: "pbattery",
        visible: battery.bind("available"),
        children: [
          Widget.Icon({ 
            icon, 
            size:15 
          }),
          Widget.Label({
            label: percentageText ,
            halign: 'end', // Adjust alignment as needed
          }),
          Widget.Label({
            label: "  " ,
            halign: 'end',
          }),
          Widget.LevelBar({
            widthRequest: 100,
            heightRequest: 20,
            class_name: "blb",
            hpack: "end",
            value,
          }),
        ]
      })
    }
    return Widget.Box({
      vertical: true,
      children:[Battery(), acpi()]
    })
  }
  return Widget.Box({
    class_name: "data",
    children: [CPURAM(), BatteryStatus()]
  })
}

