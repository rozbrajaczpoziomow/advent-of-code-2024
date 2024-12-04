import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round } = Math;

export async function part1() {
	let input = (await readFile('input.txt')).toString().split('\n');
	let ns = [], n = 0;

	const chars = [];

	for(const line of input) {
		chars.push([...line]);
	}

	for(let i = 0; i < chars.length; ++i) {
		for(let j = 0; j < chars[0].length; ++j) {
			if(chars[i][j] != 'X')
				continue;

			let cw = (w) => {
				return (w == 'XMAS') + (w == 'SMAX');
				// return w == 'XMAS' + w == 'SMAX';
			}

			// >
			try {
				n += cw(chars[i][j] + chars[i][j + 1] + chars[i][j + 2] + chars[i][j + 3]);
			} catch {}
			// <
			try {
				n += cw(chars[i][j] + chars[i][j - 1] + chars[i][j - 2] + chars[i][j - 3]);
			} catch {}
			// v
			try {
				n += cw(chars[i][j] + chars[i + 1][j] + chars[i + 2][j] + chars[i + 3][j]);
			} catch {}
			// ^
			try {
				n += cw(chars[i][j] + chars[i - 1][j] + chars[i - 2][j] + chars[i - 3][j]);
			} catch {}
			// >^
			try {
				n += cw(chars[i][j] + chars[i - 1][j + 1] + chars[i - 2][j + 2] + chars[i - 3][j + 3]);
			} catch {}
			// <^
			try {
				n += cw(chars[i][j] + chars[i - 1][j - 1] + chars[i - 2][j - 2] + chars[i - 3][j - 3]);
			} catch {}
			// ^
			try {
				n += cw(chars[i][j] + chars[i + 1][j + 1] + chars[i + 2][j + 2] + chars[i + 3][j + 3]);
			} catch {}
			// ^
			try {
				n += cw(chars[i][j] + chars[i + 1][j - 1] + chars[i + 2][j - 2] + chars[i + 3][j - 3]);
			} catch {}
			// console.log(i, j, n);
		}
	}
	return n;
}

export async function part2() {
	let input = (await readFile('input.txt')).toString().split('\n');
	let ns = [], n = 0;

	const chars = [];

	for(const line of input) {
		chars.push([...line]);
	}

	for(let i = 0; i < chars.length; ++i) {
		for(let j = 0; j < chars[0].length; ++j) {
			if(chars[i][j] != 'A')
				continue;

			let cw = (w) => {
				return (w == 'MAS') + (w == 'SAM');
				// return w == 'XMAS' + w == 'SMAX';
			}

			// >
			try {
				if(cw(chars[i - 1][j - 1] + chars[i][j] + chars[i + 1][j + 1]) && cw(chars[i + 1][j - 1] + chars[i][j] + chars[i - 1][j + 1]))
					++n;
			} catch {}
		}
	}
	return n;
}