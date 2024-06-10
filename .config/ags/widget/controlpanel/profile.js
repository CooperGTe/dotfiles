const user = Variable("", {listen: ['whoami']})
const host = Variable("", {listen: 'bash -c "uname -n"'})
const os = Variable("", {
  listen: ['bash', '-c', `grep '^PRETTY_NAME=' /etc/os-release | cut -d '=' -f2 | tr -d '"'`],
})


export function Profile() {
  const ProfilePicture = Widget.Box({
    class_name: "profilepicture",
  }) 
  const User = Widget.Box([
    Widget.Label ({label: 'User : ',halign: 'start',}),
    Widget.Label ({label: user.bind(),halign: 'start',})
  ]) 
  const Host = Widget.Box([
    Widget.Label ({label: 'Host : ',halign: 'start',}),
    Widget.Label ({label: host.bind(),halign: 'start',})
  ])
  const OS = Widget.Box([
    Widget.Label ({label: "OS    : ",halign: 'start'}),
    Widget.Label ({label: os.bind(),halign: 'start'})
  ])
  return Widget.Box({class_name: "profile"},
    ProfilePicture,
    Widget.Box ({vertical: true,class_name: "profile-id"},
      User,
      Host,
      OS,
    )
  )
} 
