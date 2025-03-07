import Mpris from "gi://AstalMpris"
import { Gtk } from "astal/gtk3"
import { Variable, bind } from "astal"


function MediaPlayer({ player }: { player: Mpris.Player }) {
    const playIcon = bind(player, "playbackStatus").as(s =>
        s === Mpris.PlaybackStatus.PLAYING
            ? "media-playback-pause-symbolic"
            : "media-playback-start-symbolic"
    )

    const progress = Variable.derive(
        [bind(player, "position"), bind(player, "length")],
        (p, l) => {
            let position = p / l;
            return position
        },
    );

    return (
    <box className="MediaPlayer" vertical>
        <box 
            vertical
            hexpand
            valign
            >
            <button
                onClicked={() => player.previous()}
                visible={bind(player, "canGoPrevious")}>
                <icon icon="media-skip-backward-symbolic"  css="font-size:10px;"/>
            </button>
            <button
                onClicked={() => player.play_pause()}
                onScroll={(_, event) => 
                    event.delta_y > 0 
                    ? player.position -= 5 
                    : player.position += 5 
                }
                visible={bind(player, "canControl")}
                css="padding:0;">
                <circularprogress
                    className="progress"
                    value={progress()}
                    startAt={.75}
                    endAt={0.75}>
                    <icon icon={playIcon}  css="font-size:10px;"/>
                </circularprogress>
            </button>
            <button
                onClicked={() => player.next()}
                visible={bind(player, "canGoNext")}>
                <icon icon="media-skip-forward-symbolic" css="font-size:10px;"/>
            </button>
        </box>
        <eventbox
            onScroll={(_, event) => 
                event.delta_y > 0 
                ? player.volume = Math.max(0, player.volume - 0.01)
                : player.volume = Math.min(1, player.volume + 0.01) 
            }
        > 
            <icon icon={"emblem-music-symbolic"} />
        </eventbox>
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

