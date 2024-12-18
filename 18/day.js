import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const arreq = (a, b) => a.length == b.length && a.every((v, i) => v == b[i]);
const { abs, sqrt, sin, cos, floor, ceil, round, min, max, trunc } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	const map = [];
	const size = 70;
	for(let i = 0; i <= size; ++i)
		map.push(new Array(size+1).fill(0));

	for(let mv of input.slice(0,1024)) {
		let [x,y]=mv.split(',').map(x=>+x);
		map[y][x]=1;
	}

	let q = [[0,0,0]] // [x,y,c][]
	let hs = {};
	let poss = [];
	while(q.length) {
		let [x,y,c] = q.shift();
		if(x == size && y == size)
			return c;
		for(let [dx,dy]of[[0,1],[0,-1],[1,0],[-1,0]]) {
			hs[y+dy] ??= {};
			if(hs[y+dy][x+dx])
				continue;
			hs[y+dy][x+dx] = 1;
			if(map[y+dy] != null && map[y+dy][x+dx] != null && map[y+dy][x+dx] != 1)
				q.push([x+dx,y+dy,c+1]);
		}
	}
	return null;
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	const map = [];
	const size = 70;
	for(let i = 0; i <= size; ++i)
		map.push(new Array(size+1).fill(0));

	for(let mv of input) {
		let [x,y]=mv.split(',').map(x=>+x);
		map[y][x]=1;

		let q = [[0,0,0]] // [x,y,c][]
		let hs = {};
		let fnd = false;
		while(q.length) {
			let [x,y,c] = q.shift();
			if(x == size && y == size){fnd = true;break;}
			for(let [dx,dy]of[[0,1],[0,-1],[1,0],[-1,0]]) {
				hs[y+dy] ??= {};
				if(hs[y+dy][x+dx])
					continue;
				hs[y+dy][x+dx] = 1;
				if(map[y+dy] != null && map[y+dy][x+dx] != null && map[y+dy][x+dx] != 1)
					q.push([x+dx,y+dy,c+1]);
			}
		}
		if(!fnd)
			return [x,y].join();
	}
	return null;
}