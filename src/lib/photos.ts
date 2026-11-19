import fs from "node:fs";
import path from "node:path";

/**
 * Product photo slots. A slot resolves to a file only if it exists in /public,
 * otherwise `null` and the UI renders a clearly labelled placeholder (never a fake device).
 *
 * To go live: drop ConnectCom's own photos into `public/images/products-final/`
 * using the filenames below (jpg), no code changes needed.
 */
const SLOTS = {
  panelMain: ["products-final/panel-main.jpg", "products/ref-panel-black-3gang.jpg"],
  panelInstalled: ["luxury/panel-installed.jpg"],
  mobileControl: ["luxury/mobile-control.jpg"],
  voiceMoment: ["luxury/voice-moment.jpg"],
  // Voice devices: drop licensed photos here. Until then the page shows a labelled placeholder (no invented hardware).
  echoDevice: ["products-final/echo-device.jpg"],
  nestSpeaker: ["products-final/nest-speaker.jpg"],
  panelDetailA: ["products-final/panel-detail-1.jpg", "products/ref-panel-gold-frame.jpg"],
  panelDetailB: ["products-final/panel-detail-2.jpg", "products/ref-panel-curved-black.jpg"],
  lockMain: ["products-final/lock-main.jpg"],
  lockDetailA: ["products-final/lock-detail-1.jpg"],
  lockDetailB: ["products-final/lock-detail-2.jpg"],
  sensorMotion: ["products-final/sensor-motion.jpg"],
  sensorDoor: ["products-final/sensor-door.jpg"],
  sensorTemp: ["products-final/sensor-temperature.jpg"],
  sensorHumidity: ["products-final/sensor-humidity.jpg"],
  sensorSecurity: ["products-final/sensor-security.jpg"],
  controlMain: ["products-final/control-main.jpg"],
} as const;

export type PhotoKey = keyof typeof SLOTS;
export type Photos = Record<PhotoKey, string | null>;

export function resolvePhotos(): Photos {
  const root = path.join(process.cwd(), "public", "images");
  const out = {} as Photos;
  for (const key of Object.keys(SLOTS) as PhotoKey[]) {
    const hit = SLOTS[key].find((rel) => fs.existsSync(path.join(root, rel)));
    out[key] = hit ? `/images/${hit}` : null;
  }
  return out;
}
