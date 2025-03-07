import NotifdService from 'gi://AstalNotifd'
import Notification from '../../notification/Notification'

import { Gtk } from 'astal/gtk3'
import { bind } from 'astal'

import { HomeRevealer, NotifRevealer, BarRevealer, HomeTime, NotifTime } from "../variable.ts"

const notifyd = NotifdService.get_default()

function Header() {
  return (
    <box
      className='header'
      valign={Gtk.Align.START}>
      {/* Title */}
      <label
        className='title'
        label='Notifications Center'
        halign={Gtk.Align.START}
        hexpand={true}
      />

      {/* Clear Notifications */}
      <button
        className='clear_notifications'
        cursor='pointer'
        halign={Gtk.Align.END}
        onClick={() =>
          notifyd
            .get_notifications()
            .forEach(notification => notification.dismiss())
        }>
        <box spacing={10}>
        <label label='Clear' className='clear' />
        <icon icon='trash-symbolic' />
        </box>
      </button>
    </box>
  )
}

function NotificationList({ notifications }: { notifications: NotifdService.Notification[] }) {
  return (
    <box
      className='notifications'
      vertical={true}
      spacing={8}>
      {notifications.map(notification => (
        <Notification notification={notification} showDismiss={true} />
      ))}
    </box>
  )
}

function NoNotification() {
  return (
    <box
      className='no_notification'
      halign={Gtk.Align.CENTER}
      vertical={true}>
      <label
        className='icon'
        label='󰂛'
        justify={Gtk.Justification.CENTER}
      />

      <label
        className='text'
        label='No Notification'
        justify={Gtk.Justification.CENTER}
      />
    </box>
  )
}

function Notifications() {
  return (
    <scrollable vexpand={true} className='notifications_scroller'>
      {bind(notifyd, 'notifications').as(notifications => (
        notifications.length > 0
          ? <NotificationList notifications={notifications} />
          : <NoNotification />
      ))}
    </scrollable>
  )
}

export default function() {
    return (
    <box className = 'notification_box'>
    <box
        className='notification_center'
        spacing={8}
        vertical={true}
        vexpand={true}>
        <box className="nav_menu">
            <button 
                onClickRelease={() => {
                    NotifTime.set(500)
                    HomeTime.set(500)
                    NotifRevealer.set(!NotifRevealer.get())
                    BarRevealer.set(true)
                }} 
            >
                <icon icon="arrow-left-double" /> 
            </button>
            <button 
                className="home_button"
                onClickRelease={() => {
                    NotifTime.set(0)
                    HomeTime.set(0)
                    NotifRevealer.set(!NotifRevealer.get())
                    HomeRevealer.set(!HomeRevealer.get())
                }} >
                <box> 
                    <icon icon="go-home-symbolic" />
                    <label label="Quick Control" />
                </box>
            </button>
       </box> 
        <Header />
        <Notifications />
    </box>
    </box>
    )
}
