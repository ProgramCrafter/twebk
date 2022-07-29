import { RestrictionReason } from "../layer";

const platforms = new Set([
  'all',
  'web',
  'webk'
]);

const ignore = new Set();

export function getRestrictionReason(reasons: RestrictionReason[]) {
  // return reasons[0];
<<<<<<< HEAD
  return reasons.find(reason => platforms.has(reason.platform) && !ignore.has(reason.reason));
=======
  return reasons.find((reason) => platforms.has(reason.platform) && !ignore.has(reason.reason));
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
}

export function isRestricted(reasons: RestrictionReason[]) {
  return !!getRestrictionReason(reasons);
}

export function ignoreRestrictionReasons(reasons: string[]) {
  ignore.clear();
<<<<<<< HEAD
  reasons.forEach(reason => {
=======
  reasons.forEach((reason) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    ignore.add(reason);
  });
}
