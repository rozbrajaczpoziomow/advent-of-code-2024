import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const arreq = (a, b) => a.length == b.length && a.every((v, i) => v == b[i]);
const { abs, sqrt, sin, cos, floor, ceil, round, min, max, trunc } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n\n');
	let ns = [], n = 0;

	let keys=[],locks=[];

	const height = 6;

	for(const line of input) {
		let [A, ...lines] = line.split('\n');
		let key = A[0] == '.';
		let heights = new Array(A.length).fill(key? -1 : 0);
		for(let i = 0; i < heights.length; ++i) {
			for(let l of lines)
				heights[i] += l[i] == '#';
		}
		if(key)keys.push(heights);else locks.push(heights);
	}

	for(let key of keys) {
		for(let lock of locks) {
			let yes = true;
			for(let i = 0; i < key.length; ++i)
				yes &= key[i] + lock[i] < height;
			n+=yes;
		}
	}

	return n;
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let ns = [], n = 0;

	for(const line of input) {

	}
	return 'hi';
}