import { IS_APPLE_MOBILE, IS_SAFARI } from "./userAgent";

const IS_WEBM_SUPPORTED = !!document.createElement('video').canPlayType('video/webm') && !IS_SAFARI && !IS_APPLE_MOBILE;

<<<<<<< HEAD
(window as any).IS_WEBM_SUPPORTED = IS_WEBM_SUPPORTED;
=======
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
export default IS_WEBM_SUPPORTED;
