
class BrightnessService extends Service {
    static {
        Service.register(
            this,
            {
                'screen-changed': ['float'],
            },
            {
                'screen-value': ['float', 'rw'],
            },
        );
    }

    #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'");
    #screenValue = 0;
    #max = Number(Utils.exec('brightnessctl max'));

    get screen_value() {
        return Math.round(this.#screenValue * 100); // Convert from 0-1 to 0-100 and round to an integer
    }

    set screen_value(percent) {
        if (percent < 0)
            percent = 0;

        if (percent > 100)
            percent = 100;

        Utils.execAsync(`brightnessctl set ${Math.round(percent)}% -q`); // Ensure the percent is rounded
    }

    constructor() {
        super();
        const brightness = `/sys/class/backlight/${this.#interface}/brightness`;
        Utils.monitorFile(brightness, () => this.#onChange());
        this.#onChange();
    }

    #onChange() {
        this.#screenValue = Number(Utils.exec('brightnessctl get')) / this.#max;
        this.emit('changed');
        this.notify('screen-value');
        this.emit('screen-changed', Math.round(this.#screenValue * 100)); // Emit the value as 0-100 and round it
    }

    connect(event = 'screen-changed', callback) {
        return super.connect(event, callback);
    }
}

const service = new BrightnessService;
export default service;
