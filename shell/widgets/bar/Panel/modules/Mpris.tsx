import Mpris from "gi://AstalMpris"
import { Gtk } from "astal/gtk3"
import { Variable, bind } from "astal"



function lengthStr(length: number) {
    const min = Math.floor(length / 60)
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? "0" : ""
    return `${min}:${sec0}${sec}`
}


function MediaPlayer({ player }: { player: Mpris.Player }) {
    const { START, END } = Gtk.Align

    const title = bind(player, "title").as(t =>
        t || "Unknown Track")

    const artist = bind(player, "artist").as(a =>
        a || "Unknown Artist")

    const coverArt = bind(player, "coverArt").as(c =>
        `background-image: url('${c}')`
    )

    const playerIcon = bind(player, "entry").as(e =>
        Astal.Icon.lookup_icon(e) ? e : "audio-x-generic-symbolic")

    const position = bind(player, "position").as(p => player.length > 0
        ? p / player.length : 0)

    const playIcon = bind(player, "playbackStatus").as(s =>
        s === Mpris.PlaybackStatus.PLAYING
            ? "media-playback-pause-symbolic"
            : "media-playback-start-symbolic"
    )

    return (
    <box className="MediaPlayer" css={coverArt}>
        <box className="coverfilter" >
            <box>
                <box vertical>
                    <box className="title">
                        <label truncate maxWidthChars={35} hexpand halign={START} label={title} />
                    </box>
                    <label halign={START} valign={START} vexpand wrap label={artist} />
                    <box hexpand>
                        <label
                            className="position"
                            halign={START}
                            visible={bind(player, "length").as(l => l > 0)}
                            label={bind(player, "position").as(lengthStr)}
                        />
                        <slider
                            hexpand
                            visible={bind(player, "length").as(l => l > 0)}
                            onChangeValue={(self) => {player.position = self.value * player.length}}
                            value={position}
                        />
                        <label
                            className="length"
                            halign={END}
                            visible={bind(player, "length").as(l => l > 0)}
                            label={bind(player, "length").as(l => l > 0 ? lengthStr(l) : "0:00")}
                        />
                    </box>
                </box>
                <box className="control">
                    <centerbox className="actions" vertical>
                        <box vertical>
                            <button
                                onClicked={() => player.previous()}
                                visible={bind(player, "canGoPrevious")}>
                                <icon icon="media-skip-backward-symbolic" />
                            </button>
                            <button
                                onClicked={() => player.play_pause()}
                                visible={bind(player, "canControl")}>
                                <icon icon={playIcon} />
                            </button>
                            <button
                                onClicked={() => player.next()}
                                visible={bind(player, "canGoNext")}>
                                <icon icon="media-skip-forward-symbolic" />
                            </button>
                        </box>
                    </centerbox>
                    <slider 
                        vexpand
                        className="musicvolume"
                        inverted
                        vertical
                        onChangeValue={(self) => {
                          player.volume = self.value;
                        }}
                        min={0.1}
                        value={bind(player, "volume")}
                    />
                </box>
            </box>
        </box>
    </box>
    )
}

function isMPDPlayer(player) {
    return player.bus_name.includes("mpd") || player.identity === "MPD";
}

export default function MprisPlayers() {
    const mpris = Mpris.get_default();
    return (
        <box vertical>
            {bind(mpris, "players").as(arr =>
                arr
                    .filter(isMPDPlayer) // Filter to include only MPD players
                    .map(player => <MediaPlayer player={player} />)
            )}
        </box>
    );
}

