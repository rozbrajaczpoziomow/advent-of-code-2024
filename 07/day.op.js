import { readFile } from 'node:fs/promises';
import { Worker } from 'node:worker_threads';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round, log10 } = Math;

const alreadyDone = [];
let p1 = 0;

export async function part1() {
	let input = (await readFile('input.txt')).toString().split('\n');
	let ns = [], n = 0;
	let i = 0;

	for(const line of input) {
		let [wa, tmp] = line.split(': ');
		wa = +wa;
		ns = tmp.split(' ').map(x => +x);
		let poss = [[ns[0], ns.slice(1)]];
		while(poss.length > 0) {
			const [c, ns] = poss.shift();
			if(ns.length == 1) {
				if(c + ns[0] == wa || c * ns[0] == wa) {
					n += wa;
					alreadyDone.push(i);
					break;
				}
				continue;
			}
			if(c + ns[0] <= wa)
				poss.push([c + ns[0], ns.slice(1)]);
			if(c * ns[0] <= wa)
				poss.push([c * ns[0], ns.slice(1)]);
		}
		++i;
	}
	p1 = n;
	return n;
}

export async function part2() {
	let input = (await readFile('input.txt')).toString().split('\n').filter((x, i) => !alreadyDone.includes(i));
	let n = 0, workerCount = 0;

	// without Workers it takes about 6-7.5s on my input
	// with workers (depending on the array shuffle and just overall node jankiness), takes 3-4s
	let _res;
	input = input.sort(() => Math.random() - .5);
	const promise = new Promise(res => { _res = res });
	while(input.length > 0) {
		const worker = new Worker('./day.op-worker.js', {
			workerData: input.splice(0, 20)
		});
		++workerCount;
		worker.once('message', wn => {
			n += wn;
			if(--workerCount == 0)
				_res();
		});
	}

	await promise;

	return p1 + n;
}