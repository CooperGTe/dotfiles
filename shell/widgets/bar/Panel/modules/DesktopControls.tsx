import NetworkService from 'gi://AstalNetwork'
import BluetoothService from 'gi://AstalBluetooth'
import WpService from 'gi://AstalWp'
import Mpris from 'gi://AstalMpris'
import NotifdService from 'gi://AstalNotifd'
import { execAsync } from "astal/process"

import Brightness from "../../../../utils/brightness.ts"

import { Gtk } from 'astal/gtk3'
import { bind, Binding, Variable, GLib } from 'astal'

import { HomeRevealer, NotifRevealer, BarRevealer, HomeTime, NotifTime } from "../../variable.ts"

export interface ButtonProps {
  name: string,
  className?: string | Binding<string | undefined> | undefined
  icon: string | Binding<string | undefined> | undefined
}

const network = NetworkService.get_default()
const bluetooth = BluetoothService.get_default()
const audio = WpService.get_default()!.get_audio()!
const notifyd = NotifdService.get_default()

function ButtonIcon({ name, className, status, icon = 'icon' }: ButtonProps) {
    return (
    <box
        className={className}
        spacing={6}
        hexpand={true}>
        <icon
            className={className}
            icon={icon}
        />
        <box 
            vertical={true}>
            <label
                className='name'
                label={name}
                halign={Gtk.Align.START}
            />
            <label
                className='status'
                label={status}
                halign={Gtk.Align.START}
            />
        </box>
    </box>
    )
}

function NetworkButton() {
    return (
    <button
        className='network_button'
        valign={Gtk.Align.CENTER}>
        {bind(network, 'primary').as(primary => (
            <stack shown={primary.toString()}>
                {/* Wired */}
                <box name={NetworkService.Primary.WIRED.toString()}>
                <ButtonIcon
                    name='WIRED'
                    className={bind(network.get_wired()!, 'state').as(state => {
                        switch (state) {
                            case NetworkService.DeviceState.ACTIVATED:
                                return 'active'
                            case NetworkService.DeviceState.DISCONNECTED:
                                return 'disconnected'
                            case NetworkService.DeviceState.UNKNOWN |
                                NetworkService.DeviceState.UNAVAILABLE:
                                return 'unavailable'
                            default:
                            return 'offline'
                        }
                    })}
                    icon={bind(network.get_wired()!, 'state').as(state => {
                        switch (state) {
                            case NetworkService.DeviceState.ACTIVATED:
                                return 'network-wired-symbolic'
                            case NetworkService.DeviceState.DISCONNECTED:
                                return 'network-wired-disconnected-symbolic'
                            case NetworkService.DeviceState.UNKNOWN |
                                NetworkService.DeviceState.UNAVAILABLE:
                                return 'network-wired-no-route-symbolic'
                            default:
                            return 'network-wireless-offline-symbolic'
                        }
                    })}
                    status={bind(network.get_wired()!, 'state').as(state => {
                        switch (state) {
                            case NetworkService.DeviceState.ACTIVATED:
                                return 'Enabled'
                            case NetworkService.DeviceState.DISCONNECTED:
                                return 'Disconnect'
                            case NetworkService.DeviceState.UNKNOWN |
                                NetworkService.DeviceState.UNAVAILABLE:
                                return 'Unavailable'
                            default:
                            return 'Offline'
                        }
                    })}
                />
                </box>
                {/* Wifi */}
                <box name={NetworkService.Primary.WIFI.toString()}>
                <ButtonIcon
                    name='WIFI'
                    className={bind(network.get_wired()!, 'state').as(state => {
                        switch (state) {
                            case NetworkService.DeviceState.ACTIVATED:
                                return 'active'
                            case NetworkService.DeviceState.DISCONNECTED:
                                return 'disconnected'
                            case NetworkService.DeviceState.UNKNOWN |
                                NetworkService.DeviceState.UNAVAILABLE:
                                return 'unavailable'
                            default:
                            return 'offline'
                        }
                    })}
                    icon={bind(network.get_wired()!, 'state').as(state => {
                        switch (state) {
                            case NetworkService.DeviceState.ACTIVATED:
                                return 'network-wireless-symbolic'
                            case NetworkService.DeviceState.DISCONNECTED:
                                return 'network-wireless-offline-symbolic'
                            case NetworkService.DeviceState.UNKNOWN |
                                NetworkService.DeviceState.UNAVAILABLE:
                                return 'network-wireless-no-route-symbolic'
                            default:
                            return 'network-wireless-offline-symbolic'
                        }
                    })}
                    status={bind(network.get_wired()!, 'state').as(state => {
                        switch (state) {
                            case NetworkService.DeviceState.ACTIVATED:
                                return network.wifi.ssid
                            case NetworkService.DeviceState.DISCONNECTED:
                                return 'Disconnect'
                            case NetworkService.DeviceState.UNKNOWN |
                                NetworkService.DeviceState.UNAVAILABLE:
                                return 'Unavailable'
                            default:
                            return 'Offline'
                        }
                    })}
                />
                </box>
            </stack>
        ))}
    </button>
  )
}

function BluetoothButton() {
  return (
    <button
      className='bluetooth_button'
      valign={Gtk.Align.CENTER}
      cursor='pointer'
      onClick={() => bluetooth.toggle()}>
      <stack
        shown={
          bind(bluetooth, 'isPowered')
            .as(isPowered => isPowered ? 'on' : 'off')
        }>
        <box name='on'>
          <ButtonIcon
            name='BLUETOOTH'
            className='icon active'
            icon='bluetooth-active-symbolic'
            status='Enabled'
          />
        </box>

        <box name='off'>
          <ButtonIcon
            name='BLUETOOTH'
            className='icon inactive'
            icon='bluetooth-disconnected-symbolic'
            status='Disabled'
          />
        </box>
      </stack>
    </button>
  )
}
/*
function MuteButton() {
  const isMute = Variable(false)

  isMute.subscribe((value) => {
    if (value) {
      audio
        .get_speakers()!
        .map(speaker => speaker.set_mute(true))
    }

    if (!value) {
      audio
        .get_speakers()!
        .map(speaker => speaker.set_mute(false))
    }
  })

  return (
    <button
      className='mute_button'
      cursor='pointer'
      valign={Gtk.Align.CENTER}
      onClick={() => isMute.set(!isMute.get())}
      onDestroy={() => isMute.drop()}>
      <stack shown={isMute().as(mute => !mute ? 'active' : 'silent')}>
        <box name='silent'>
          <ButtonIcon
            name='MUTE'
            className='icon active'
            icon='audio-volume-muted-symbolic'
            status='Enabled'
          />
        </box>

        <box name='active'>
          <ButtonIcon
            name='MUTE'
            className='icon inactive'
            icon='audio-volume-high-symbolic'
            status='Disabled'
          />
        </box>
      </stack>
    </button>
  )
}
*/

function FilterButton() {
    const isHyprshadeOn = Variable(false);

    async function checkHyprshade() {
        try {
            const output = await execAsync(['hyprshade', 'current']);
            isHyprshadeOn.set(output.trim().length > 0);
        } catch (error) {
            console.error('Failed to check Hyprshade status:', error);
            isHyprshadeOn.set(false);
        }
    }

    return (
        <button
            className='hyprshade_button'
            cursor='pointer'
            valign={Gtk.Align.CENTER}
            onClickRelease={() => {
                execAsync(["bash", "-c", `hyprshade toggle extradark`]) 
                setTimeout(() => {
                    checkHyprshade()
                }, 1000);        
            }}
            onDestroy={() => isHyprshadeOn.drop()}>
            <stack shown={isHyprshadeOn().as(active => (active ? 'on' : 'off'))}>
                <box name='on'>
                    <ButtonIcon
                        name='NIGHT MODE'
                        className='icon active'
                        icon='night-light-symbolic'
                        status='Enabled'
                    />
                </box>

                <box name='off'>
                    <ButtonIcon
                        name='NIGHT MODE'
                        className='icon inactive'
                        icon='night-light-disabled-symbolic'
                        status='Disabled'
                    />
                </box>
            </stack>
        </button>
    );
}

function DnDButton() {
  return (
    <button
      className='dnd_button'
      cursor='pointer'
      valign={Gtk.Align.CENTER}
      onClick={() => notifyd.set_dont_disturb(!notifyd.get_dont_disturb())}>
      <stack shown={bind(notifyd, 'dontDisturb').as(isDnD => !isDnD ? 'active' : 'dnd')}>
        <box name='active'>
          <ButtonIcon
            name='DND'
            className='icon active'
            icon='notification-symbolic'
            status='Enabled'
          />
        </box>

        <box name='dnd'>
          <ButtonIcon
            name='DND'
            className='icon inactive'
            icon='notifications-disabled-symbolic'
            status='Disabled'
          />
        </box>
      </stack>
    </button>
  )
}

function ButtonControls() {
    return (
        <box
        className='buttons'
        valign={Gtk.Align.CENTER}
        spacing={5} >
        <box vertical spacing={5} className='ctrl' hexpand={true}>
            <box spacing={5}>
                <NetworkButton />
                <BluetoothButton />
            </box>
            <box spacing={5}>
                <FilterButton />
                <DnDButton />
            </box>
        </box>
        <box vertical spacing={5} className='screenshot'>
            <button 
                hexpand={false}
                onClickRelease={() => {
                   execAsync(["bash", "-c", `grimblast --notify copysave`]) 
                }}>
                <icon icon='accessories-screenshot-symbolic'/>
            </button>
            <button 
                hexpand={false}
                onClickRelease={() => {
                    setTimeout(() => {
                        execAsync(["bash", "-c", `grimblast --freeze --notify copysave area`]);
                    }, 800);                
                    HomeRevealer.set(!HomeRevealer.get())
                    NotifRevealer.set(false)
                    BarRevealer.set(true)
                }}>
                <icon icon='screenshooter-symbolic'/>
            </button>
        </box>
    </box>
  )
}

function Sliders() {
    const brightness = Brightness.get_default();
    const mpris = Mpris.get_default();
    return (
    <box
        className='sliders'
        vertical={true}
        spacing={9}>
        {/* Volume Slider */}
        {bind(audio, 'defaultSpeaker').as(speaker => (
        <box
            className='volume_slider'
            spacing={12}>
            <button
                cursor='pointer'
                onClick={() => speaker.set_mute(!speaker.get_mute())}>
                <label
                    className='icon'
                    label={
                    bind(speaker, 'mute')
                    .as(isMute => !isMute ? '󰕾' : '󰸈')}
                />
            </button>
            <slider
                className={
                bind(speaker, 'mute')
                .as(isMute => isMute ?
                    'slider mute' : 'slider'
                )}
                cursor='pointer'
                value={bind(speaker, 'volume')}
                max={1.5}
                drawValue={false}
                hexpand={true}
                onChangeValue={( self ) => speaker.set_volume(self.value)}
            />
            <label 
                label={bind(speaker, "volume").as((volume) =>
                `${Math.round(volume * 100)}%`
            )} />
        </box>
        ))}
        {/* Brightness Slider */}
        <box className="brightness_slider"> 
            <box> 
                <icon icon={"display-brightness-symbolic"} css="font-size: 18px;"/>
            </box>
            <slider 
                hexpand
                onChangeValue={(self) => {
                  brightness.screen = self.value;
                }}
                min={0.1}
                value={bind(brightness, "screen")}
            />
            <label 
                label={bind(brightness, "screen").as((volume) =>
                `${Math.round(volume * 100)}%`,
            )}/>
        </box>
    </box>
    )
}

export default function() {
  return (
    <box
    vertical
      className='desktop_controls'
      spacing={12}>
      <ButtonControls />
      <Sliders />
    </box>
  )
}
