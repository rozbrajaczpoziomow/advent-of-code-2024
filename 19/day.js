import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const arreq = (a, b) => a.length == b.length && a.every((v, i) => v == b[i]);
const { abs, sqrt, sin, cos, floor, ceil, round, min, max, trunc } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n\n');
	let n=0;
	const [_av, _t] = input;
	const avail = _av.split(', ');
	const towels = _t.split('\n');

	let hist = {};
	function tow(w) {
		if(hist[w] != null)
			return hist[w];
		let a = 0;
		if(!w)
			a = 1;
		for(let t of avail) {
			if(w.startsWith(t)) {
				a += tow(w.slice(t.length));
			}
		}
		hist[w]=a;
		return a;
	}

	for(const line of towels) {
		n+=(tow(line)>0);
	}
	return n;
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n\n');
	let n=0;
	const [_av, _t] = input;
	const avail = _av.split(', ');
	const towels = _t.split('\n');

	let hist = {};
	function tow(w) {
		if(hist[w] != null)
			return hist[w];
		let a = 0;
		if(!w)
			a = 1;
		for(let t of avail) {
			if(w.startsWith(t)) {
				a += tow(w.slice(t.length));
			}
		}
		hist[w]=a;
		return a;
	}

	for(const line of towels) {
		n+=tow(line);
	}
	return n;
}