// https://spicyyoghurt.com/tools/easing-functions
<<<<<<< HEAD
export default function easeInOutSine (t: number, b: number, c: number, d: number) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
=======
export default function easeInOutSine(t: number, b: number, c: number, d: number) {
  return t >= d ? b + c : -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
}
