import { Gtk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import { bind, Variable } from "astal";

//Rewrite ToDo
//- remove useless thing
//- make the code readable somehow

function WorkspaceButton({ ws, character }: any) {
    const hyprland = Hyprland.get_default();

    const classNames = Variable.derive(
        [bind(hyprland, "focused_workspace"), bind(hyprland, "clients"), bind(hyprland, "events")],
        (fws) => {
            let classes = "workspace-button";
            const active = fws.id == ws.id;
            if (active) classes += " focused";

            const occupied = hyprland.get_workspace(ws.id)?.get_clients().length > 0;
            if (occupied) classes += " occupied";
            return classes
        },
    );
    return <button
        className={classNames()}
        valign={Gtk.Align.CENTER}
        halign={Gtk.Align.CENTER}

        onClicked={() => ws.focus()}
        setup={(self) => {
              self.hook(hyprland, 'event', () => {
                self.toggleClassName('occupied', hyprland.get_workspace(ws.id)?.get_clients().length > 0)
              })
            }}
    >
        {character}
    </button>
}

export default function Workspaces() {
    const hyprland = Hyprland.get_default();

    const customCharacters = [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六"
    ];
    const ID_RANGE = { min: 1, max: 6 };

    const allWorkspaces = Array.from(
        { length: ID_RANGE.max - ID_RANGE.min + 1 }, 
        (_, i) => ({ id: ID_RANGE.min + i })
    )
    return <eventbox
        onScroll={(_, event) => 
            event.delta_y > 0 
            ? hyprland.message(`dispatch workspace r+1`) 
            : hyprland.message(`dispatch workspace r-1`) 
            
        }
    >
    <box className="Workspaces" vertical="true">
    {allWorkspaces.map((ws, index) => (
        <WorkspaceButton
            key={ws.id}
            ws={Hyprland.Workspace.dummy(ws.id, null)}
            character={customCharacters[index % customCharacters.length]}
        />
    ))}
    </box> 
    </eventbox>
}

