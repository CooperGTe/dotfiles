import { 
    HomeRevealer, 
    NotifRevealer, 
    BarRevealer, 
    HomeTime, 
    NotifTime 
} from "./widgets/bar/variable.ts"

export default function requestHandler(
    request: string,
    res: (response: any) => void,
): void {
    switch (request) {
        case "home":
            res("ok");
            if (NotifRevealer.get()) {
                HomeTime.set(0)
                NotifTime.set(0)
            }
            HomeRevealer.set(!HomeRevealer.get())
            NotifRevealer.set(false)
            BarRevealer.set(!HomeRevealer.get())
            if (!HomeRevealer.get()) {
                HomeTime.set(500)
                NotifTime.set(500)
            } else  {
                HomeTime.set(500)
                NotifTime.set(500)
            }
        break;
        case "notif":
            res("ok");
            if (HomeRevealer.get()) {
                HomeTime.set(0)
                NotifTime.set(0)
            }
            NotifRevealer.set(!NotifRevealer.get())
            HomeRevealer.set(false)
            BarRevealer.set(!NotifRevealer.get())
            if (!HomeRevealer.get()) {
                HomeTime.set(500)
                NotifTime.set(500)
            } else {
                HomeTime.set(500)
                NotifTime.set(500)
            }
        break;
        default:
            res("not ok");
            break;
    }
}
