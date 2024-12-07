import { parentPort, workerData } from 'node:worker_threads';

let n = 0;

const concat = (a, b) => {
	if(b < 10) return a * 10 + b;
	if(b < 100) return a * 100 + b;
	if(b < 1000) return a * 1000 + b;
	if(b < 10000) return a * 10000 + b;
	if(b < 100000) return a * 100000 + b;
	if(b < 1000000) return a * 1000000 + b;
	if(b < 10000000) return a * 10000000 + b;
	if(b < 100000000) return a * 100000000 + b;
	return a * (10 ** (floor(log10(b)) + 1)) + b
}

for(const line of workerData) {
	let [wa, tmp] = line.split(': ');
	wa = +wa;
	let ns = tmp.split(' ').map(x => +x);
	let poss = [[ns[0], ns.slice(1)]];
	while(poss.length > 0) {
		const [c, ns] = poss.shift();
		if(ns.length == 1) {
			if(c + ns[0] == wa || c * ns[0] == wa || concat(c, ns[0]) == wa) {
				n += wa;
				break;
			}
			continue;
		}
		if(c + ns[0] <= wa)
			poss.push([c + ns[0], ns.slice(1)]);
		if(c * ns[0] <= wa)
			poss.push([c * ns[0], ns.slice(1)]);
		const cc = concat(c, ns[0]);
		if(cc <= wa)
			poss.push([cc, ns.slice(1)]);
	}
}
// console.log(`finished ${workerData.length} lines in ${performance.now().toFixed(0)}ms => ${n}`);
parentPort.postMessage(n);