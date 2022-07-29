export default async function getStream(constraints: MediaStreamConstraints, muted: boolean) {
  // console.log('getStream', constraints);
  
	const stream = await navigator.mediaDevices.getUserMedia(constraints);
<<<<<<< HEAD
	stream.getTracks().forEach(x => {
=======
	stream.getTracks().forEach((x) => {
>>>>>>> 16a38d3b1c538c950864e5fe4334ca4f8867450f
		/* x.onmute = x => {
			console.log('track.onmute', x);
		};
		x.onunmute = x => {
			console.log('track.onunmute', x);
		}; */

		x.enabled = !muted;
	});

	// console.log('getStream result', stream);
	return stream;
}

(window as any).getStream = getStream;
