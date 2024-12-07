import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round } = Math;

export async function part1() {
	// let input = (await readFile('input.txt')).toString().split('\n');
	let input = [];
	let ns = [], n = 0;

	for(const line of input) {
		let [wa, tmp] = line.split(': ');
		wa = +wa;
		ns = tmp.split(' ').map(x => +x);
		let any = false;
		let poss = [{w: wa, c: ns[0], ns:ns.slice(1)}];
		while(poss.length > 0) {
			const {w, c, ns} = poss.shift();
			if(ns.length == 0) {
				if(c==w){any=true;break;}
				continue;
			}
			poss.push({w, c: c + ns[0], ns:ns.slice(1)});
			poss.push({w, c: c * ns[0], ns:ns.slice(1)});
		}
		if(any)
			n+=wa;
	}
	return n;
}

export async function part2() {
	let input = (await readFile(process.env.FILE ?? 'input.txt')).toString().split('\n');
	let ns = [], n = 0;

	for(const line of input) {
		let [wa, tmp] = line.split(': ');
		wa = +wa;
		ns = tmp.split(' ').map(x => +x);
		let any = false;
		let poss = [{w: wa, c: ns[0], ns:ns.slice(1)}];
		while(poss.length > 0) {
			const {w, c, ns} = poss.shift();
			if(ns.length == 0) {
				if(c==w){any=true;break;}
				continue;
			}
			poss.push({w, c: c + ns[0], ns:ns.slice(1)});
			poss.push({w, c: c * ns[0], ns:ns.slice(1)});
			poss.push({w, c: +(`${c}${ns[0]}`), ns:ns.slice(1)});
		}
		if(any)
			n+=wa;
	}
	return n;
}