export default function deepEqual(x: any, y: any): boolean {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
<<<<<<< HEAD
      ok(x).every(key => deepEqual(x[key], y[key]))
=======
      ok(x).every((key) => deepEqual(x[key], y[key]))
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
  ) : (x === y);
}
