import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round, min, max } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let space = [];
	let free = false;
	let id = 0;
	for(const char of input[0]) {
		let n = +char;
		if(free) {
			for(let i = 0; i <n;++i)
				space.push(null);
		} else {
			for(let i = 0; i < n; ++i)
				space.push(id);
			++id;
		}
		free = !free;
	}
	while(space.at(-1) == null) {
		--space.length;
	}
	while(true) {
		let idx = space.indexOf(null);
		if(idx == -1) break;
		space[idx] = space.at(-1);
		--space.length;
	}
	let sum = 0;
	for(let i = 0; i < space.length; ++i)
		sum += i * space[i];
	// console.log(space.join(''));
	return sum;
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let space = [];
	let free = false;
	let id = 0;
	for(const char of input[0]) {
		let n = +char;
		if(free) {
			for(let i = 0; i <n;++i)
				space.push(null);
		} else {
			for(let i = 0; i < n; ++i)
				space.push(id);
			++id;
		}
		free = !free;
	}
	console.log(space.length);
	while(space.at(-1) == null) {
		--space.length;
	}
	// console.log(space);
	let done = 10000;
	// console.log(space.map(x=>x==null?'.':''+x).join(''))
	while(true) {
		// console.log(space.filter(x=>x!=null).filter(x=>!done.includes(x)).at(-1));
		let now = space.findLast(x=>x!=null&&x<done);
		if(now == undefined)
			break;
		console.log(now);
		let cnt = count(space, now);
		let idx = space.indexOf(now);
		done = now;
		let ncn = 0, si = 0;
		for(let i = 0; i < idx + 1; ++i) {
			if(space[i] == null)
				++ncn;
			else {
				if(ncn == 0 || ncn < cnt) {
					ncn = 0;
					si = i;
					continue;
				}
				space = space.map(x => x == now? null : x);
				// for(let j = si + 1; j < i; ++j) {
				for(let j = 0; j < cnt; ++j) {
					space[si + j + 1] = now;
				}
				ncn = 0;
				si = i;
				break;
			}
		}
		// console.log(space.map(x=>x==null?'.':''+x).join(''))
	}
	let sum = 0;
	for(let i = 0; i < space.length; ++i)
		sum += i * space[i];
	return sum;
}