import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const arreq = (a, b) => a.length == b.length && a.every((v, i) => v == b[i]);
const { abs, sqrt, sin, cos, floor, ceil, round, min, max, trunc } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let ns = [], n = 0;

	for(const line of input) {

	}
	return null;
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let ns = [], n = 0;

	for(const line of input) {

	}
	return null;
}