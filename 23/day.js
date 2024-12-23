import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const arreq = (a, b) => a.length == b.length && a.every((v, i) => v == b[i]);
const { abs, sqrt, sin, cos, floor, ceil, round, min, max, trunc } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let ns = [], n = 0;

	let nw = {};

	for(const line of input) {
		let [fr,to] = line.split('-');
		nw[fr] ??= [];
		nw[fr].push(to);
		nw[to] ??= [];
		nw[to].push(fr);
	}

	let keys = Object.keys(nw);

	for(let i = 0; i < keys.length; ++i)
		for(let j = i+1; j < keys.length; ++j)
			for(let k = j+1; k < keys.length; ++k) {
				let a = keys[i], b = keys[j], c = keys[k];
				// console.log(a,b,c);
				if(nw[b].includes(a) && nw[c].includes(a) && nw[c].includes(b))
					if(a[0] == 't' || b[0] == 't' || c[0] == 't')
						++n;
			}
	return n;
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let ns = [], n = 0;

	let nw = {};

	for(const line of input) {
		let [fr,to] = line.split('-');
		nw[fr] ??= [];
		nw[fr].push(to);
		nw[to] ??= [];
		nw[to].push(fr);
	}

	let keys = Object.keys(nw);

	let best = [];
	for(let i = 0; i < 1500; ++i) {
		keys.sort(() => Math.random() < .5? 1 : -1);
		let curr = [];
		for(let comp of keys) {
			let conn = true;
			for(let ccomp of curr) {
				if(!nw[ccomp].includes(comp)) {
					conn = false;
					break;
				}
			}
			if(conn)
				curr.push(comp);
		}
		if(curr.length > best.length)
			best = curr;
	}
	return best.toSorted().join(',');
}