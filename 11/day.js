import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round, min, max } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let stones = input[0].split(' ').map(x => +x);

	let a;
	for(let i = 0; i < 25; ++i) {
		let newarr = [];
		for(let s = 0; s < stones.length; ++s) {
			let st = stones[s];
			if(st == 0)
				newarr.push(1);
			else if((a = st.toString()).length % 2 == 0) {
				newarr.push(+(a.slice(0, a.length / 2)));
				newarr.push(+(a.slice(a.length / 2)));
			} else
				newarr.push(st * 2024);
		}
		// if(i <= 5)
			// console.log(newarr.join(' '));
		stones = newarr;
	}
	return stones.length;
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let stones = input[0].split(' ').map(x => +x);
	let sum = 0;

	let a;
	function _st(stone) {
		if(stone == 0)
			return 1;
		if((a = stone.toString()).length % 2 == 0)
			return [+(a.slice(0, a.length / 2)), +(a.slice(a.length / 2))];
		return stone * 2024;
	}

	let hist = {};
	function doStone(st) {
		return hist[st] ?? (hist[st] = _st(st));
	}

	let curr = {};
	for(const st of stones)
		curr[st] = count(stones, st);

	for(let i = 0; i < 75; ++i) {
		const curr2 = {};
		for(let st of Object.keys(curr)) {
			const cnt = curr[st];
			const _new = doStone(st);
			if(_new.length) {
				curr2[_new[0]] = cnt + (curr2[_new[0]] ?? 0);
				curr2[_new[1]] = cnt + (curr2[_new[1]] ?? 0);
			} else
				curr2[_new] = cnt + (curr2[_new] ?? 0);
		}
		curr = curr2;
	}
	return Object.values(curr).reduce((a, b )=> a+b);
}