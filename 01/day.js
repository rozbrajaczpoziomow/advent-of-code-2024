import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round } = Math;

export async function part1() {
	let input = (await readFile('input.txt')).toString().split('\n');
	let n = 0;
	let a = [], b = [];

	for(const line of input) {
		const [n, m] = line.split('   ').map(x => +x);
		a.push(n);
		b.push(m);
	}

	a.sort(asc);
	b.sort(asc);

	for(let i = 0; i < a.length; ++i)
		n += abs(a[i] - b[i]);
	return n;
}

export async function part2() {
	let input = (await readFile('input.txt')).toString().split('\n');
	let n = 0;
	let a = [], b = [];

	for(const line of input) {
		const [n, m] = line.split('   ').map(x => +x);
		a.push(n);
		b.push(m);
	}

	a.sort(asc);
	b.sort(asc);

	for(const x of a)
		n += x * count(b, x);
	return n;
}