import constraintSupported, { MyMediaTrackSupportedConstraints } from "../../../environment/constraintSupport";

export default function getAudioConstraints(): MediaTrackConstraints {
  const constraints: MediaTrackConstraints = {
    channelCount: 2
  };

  const desirable: (keyof MyMediaTrackSupportedConstraints)[] = [
    'noiseSuppression',
    'echoCancellation',
    'autoGainControl'
  ];

<<<<<<< HEAD
  desirable.forEach(constraint => {
=======
  desirable.forEach((constraint) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
    if(constraintSupported(constraint)) {
      // @ts-ignore
      constraints[constraint] = true;
    }
  });

  return constraints;
}
