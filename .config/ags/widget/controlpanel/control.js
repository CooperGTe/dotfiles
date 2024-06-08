import brightnessf from '../../services/brightnessfloat.js';

const audio = await Service.import("audio")


export function Control() {  
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
    const icon = Widget.Icon({
      icon: Utils.watch(getIcon(), audio.speaker, getIcon),
      size: 15,
    })
    const slider = Widget.Slider({
      hexpand: true,
      draw_value: false,
      class_name: "pslider",
      on_change: ({ value }) => audio.speaker.volume = value,
      setup: self => self.hook(audio.speaker, () => {
        self.value = audio.speaker.volume || 0
      }),
    })
    return Widget.Box({
      css: "min-width: 180px",
      children: [icon, slider],
    })
  }
  function Brightness() {
    const icon = Widget.Icon ({
      icon : 'display-brightness-symbolic',
      size : 15,
    })
    const slider = Widget.Slider({
      hexpand: true,
      draw_value: false,
      class_name: "pslider",
      on_change: self => brightnessf.screen_value = self.value,
      value: brightnessf.bind('screen-value'),
    });
    return Widget.Box({
      children: [icon, slider],
    })
  }
  return Widget.Box({
    class_name: "control",
    vertical: true,
    children: [
      Volume(),
      Brightness(),
    ]
  })
}

