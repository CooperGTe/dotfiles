const user = Variable("", {listen: ['whoami']})
const host = Variable("", {listen: 'bash -c "uname -n"'})
const os = Variable("", {
  listen: ['bash', '-c', `grep '^PRETTY_NAME=' /etc/os-release | cut -d '=' -f2 | tr -d '"'`],
})


export function Profile() {
  const ProfilePicture = Widget.Box({
    class_name: "profilepicture",
  }) 
  function ProfileID() {
    function User() {   
      const Userdt = Widget.Label({
        label: user.bind(),
        halign: 'start',
      })
      const Userlb = Widget.Label({
        label: "User : ",
        halign: 'start',
      })
      return Widget.Box ({
        children: [Userlb, Userdt]
      })
    }
    function Host() {
      const Hostdt = Widget.Label({
        label: host.bind(),
        halign: 'start',
      })
      const Hostlb = Widget.Label({
        label: "Host : ",
        halign: 'start',
      })
      return Widget.Box ({
        children: [Hostlb, Hostdt]
      })
    }
    function OS() {
      const OSdt = Widget.Label({
        label: os.bind(),
        halign: 'start',
      })
      const OSlb = Widget.Label({
        label: "OS    : ",
        halign: 'start',
      })
      return Widget.Box ({
        children: [OSlb, OSdt]
      })
    }
    return Widget.Box({
      class_name: "profile-id",
      spacing: 0,
      vertical: true,
      children: [
        User(),
        Host(),
        OS(),
      ]
    })
  }
  return Widget.Box({
    class_name: "profile",
    spacing: 8,
    children: [
      ProfilePicture,
      ProfileID(),
    ]
  })
}
