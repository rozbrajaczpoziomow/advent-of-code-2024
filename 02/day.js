import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round } = Math;

export async function part1() {
	let input = (await readFile('input.txt')).toString().split('\n');
	let ns = [], n = 0;

	for(const line of input) {
		ns = line.split(' ').map(x => +x);
		let dec = ns[0] > ns[1];
		let s = true;
		for(let i = 0; i < ns.length -1; ++i) {
			if(ns[i] > ns[i+1] && dec && abs(ns[i] - ns[i+1]) < 4) {
				continue;
			} else if(ns[i] < ns[i+1] && !dec && abs(ns[i] - ns[i+1]) < 4) {
				continue;
			} else {
				s = false;
				break;
			}
		}
		n += s;
	}
	return n;
}

export async function part2() {
	let input = (await readFile('input.txt')).toString().split('\n');
	let ns = [], n = 0;

	function safe(ns) {
				let dec = ns[0] > ns[1];
		for(let i = 0; i < ns.length -1; ++i) {
			if(ns[i] > ns[i+1] && dec && abs(ns[i] - ns[i+1]) < 4) {
				continue;
			} else if(ns[i] < ns[i+1] && !dec && abs(ns[i] - ns[i+1]) < 4) {
				continue;
			} else {
				return false;
			}
		}
		return true;
	}

	for(const line of input) {
		ns = line.split(' ').map(x => +x);
		console.log(ns);
		if(safe(ns)) {
			++n;
			continue;
		}
		for(let i = 0; i < ns.length; ++i) {
			let a = [...ns];
			a.splice(i, 1);
			if(safe(a)) {
				++n;
				break;
			}
		}
	}
	return n;
}