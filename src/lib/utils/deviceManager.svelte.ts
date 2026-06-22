import { ScreenManager } from "./screenManager.svelte";
import { WindowManager } from "./windowManager.svelte";


class DeviceManager {
    public screen = new ScreenManager()
    public window = new WindowManager()
}