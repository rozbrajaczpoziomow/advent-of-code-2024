import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const arreq = (a, b) => a.length == b.length && a.every((v, i) => v == b[i]);
const { abs, sqrt, sin, cos, floor, ceil, round, min, max, trunc } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let ns = [], n = 0;

	const pr = 1 << 24, prn = BigInt(pr);

	const next = sn => {
		sn = ((sn << 6) ^ sn)  % pr;
		sn = ((sn >> 5) ^ sn)  % pr;
		sn = BigInt(sn);
		sn = ((sn * 2048n) ^ sn) % prn;
		// console.log(typeof sn);
		sn = Number(sn);
		// console.log(typeof sn);
		// sn = ((sn * 64) ^ sn) % pr;
		// sn = (trunc(sn / 32) ^ sn) % pr;
		// sn = ((sn * 2048) ^ sn) % pr;
		return sn;
	}

	// let t = 123;
	// for(let i = 0; i < 10; ++i) {
	// 	console.log(t);
	// 	t = next(t);
	// }
	// console.log(t);
	for(const line of input) {
		let sn = +line;
		for(let i = 0; i < 2000; ++i)
			sn = next(sn);
		// console.log(`${line}: ${sn}`);
		n += sn;
	}
	return n;
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let ns = [], n = 0;

	const pr = 1 << 24, prn = BigInt(pr);

	const next = sn => {
		sn = ((sn << 6) ^ sn)  % pr;
		sn = ((sn >> 5) ^ sn)  % pr;
		sn = BigInt(sn);
		sn = ((sn * 2048n) ^ sn) % prn;
		// console.log(typeof sn);
		sn = Number(sn);
		// console.log(typeof sn);
		// sn = ((sn * 64) ^ sn) % pr;
		// sn = (trunc(sn / 32) ^ sn) % pr;
		// sn = ((sn * 2048) ^ sn) % pr;
		return sn;
	}

	let i = 0;
	for(const line of input) {
		let sn = +line;
		let arr = [sn%10];
		for(let i = 0; i < 2000; ++i) {
			sn = next(sn);
			arr.push(sn % 10);
		}
		ns.push(arr);
	}
	let deltas = [];
	for(let arr of ns) {
		let na = [];
		for(let i = 1; i < arr.length; ++i) {
			na.push(arr[i] - arr[i-1]);
		}
		deltas.push(na);
	}
	// console.log(deltas[0]);
	// find every possible combination
	let possible = new Set;
	for(let d of deltas) {
		for(let i = 3; i < d.length; ++i) {
			possible.add([d[i-3],d[i-2],d[i-1],d[i]].join());
		}
	}
	let bans = [];
	// console.log(possible.size);
	for(let seq of possible) {
		seq = seq.split(',').map(x=>+x);
		let bananas = 0;
		// simulate
		for(let s of ns) {
			let last = [];
			for(let n of s) {
				last.push(n);
				if(last[last.length-4] - last[last.length-5] == seq[0] && last[last.length-3] - last[last.length-4] == seq[1] && last[last.length-2] - last[last.length-3] == seq[2] && last[last.length-1] - last[last.length-2] == seq[3]) {
					bananas += n;
					break;
				}
			}
		}
		// bans.push([seq,bananas]);
		bans.push(bananas);
	}
	// bans.sort((a,b) => desc(a[1], b[1]));
	return max(...bans);
}