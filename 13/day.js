import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round, min, max } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n\n');
	let ns = [], n = 0;

	for(let l of input) {
		const [[ax, ay], [bx, by], [gx, gy]] = l.split('\n').map(x => x.slice(x.indexOf(': ')+2).split(', ').map(y => +y.slice(2)));
		let sols = [];
		for(let i = 0; i <= 100; ++i)
			for(let j = 0; j <= 100; ++j)
				if(gx - ax * i - bx * j == 0 && gy - ay * i - by * j == 0)
					sols.push(3 * i + j);

		if(sols.length)
			n += min(...sols);
	}

	return n;
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n\n');
	let ns = [], n = 0;

	for(let l of input) {
		let [[ax, ay], [bx, by], [gx, gy]] = l.split('\n').map(x => x.slice(x.indexOf(': ')+2).split(', ').map(y => +y.slice(2)));
		gx += 10000000000000;
		gy += 10000000000000;
		let det = ax * by - ay * bx;
		let a = floor((gx * by - gy * bx) / det);
		let b = floor((ax * gy - ay * gx) / det);
		if(ax * a + bx * b == gx && ay * a + by * b == gy)
			n += a * 3 + b;
	}

	return n;
}