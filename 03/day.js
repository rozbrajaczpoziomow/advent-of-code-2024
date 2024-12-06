import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round } = Math;

export async function part1() {
	let input = (await readFile('input.txt')).toString().split('\n');
	let ns = [], n = 0;

	for(const line of input) {
		for(const m of [...line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)]) {
			const a = +m[1]
			const b = +m[2];
			n += a*b;
		}
	}
	return n;
}

export async function part2() {
	let input = (await readFile('input.txt')).toString().split('\n');
	let ns = [], n = 0;

	let on = true;

	for(const line of input) {
		for(const m of [...line.matchAll(/(mul\((\d{1,3}),(\d{1,3})\)|(do\(\))|(don't\(\)))/g)]) {
			const inst = m[1];
			// console.log(inst);
			if(inst === 'don\'t()') {
				on = false;
				continue;
			} else if(inst === 'do()') {
				on = true;
				continue
			}
			if(!on)
				continue;
			const a = +m[2]
			const b = +m[3];
			n += a*b;
		}
	}
	return n;

}