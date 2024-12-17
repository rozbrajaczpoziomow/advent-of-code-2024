import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round, min, max } = Math;

export async function part1() {
	let map = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n').map(x=>x.split('').map(y=>+y));
	let n = 0;
	for(let y = 0; y < map.length; ++y) {
		for(let x = 0; x < map[y].length; ++x) {
			if(map[y][x] != 0)
				continue;

			let pos = [[x,y,1]];
			let reached = new Set;
			while(pos.length) {
				const [tx,ty,next] = pos.pop();
				if(map[ty] != null && map[ty][tx+1] != null && map[ty][tx+1] == next) {if(next==9){reached.add((ty) * 100000 + (tx+1));}else{pos.push([tx+1,ty,next+1])}}
				if(map[ty] != null && map[ty][tx-1] != null && map[ty][tx-1] == next) {if(next==9){reached.add((ty) * 100000 + (tx-1));}else{pos.push([tx-1,ty,next+1])}}
				if(map[ty+1] != null && map[ty+1][tx] != null && map[ty+1][tx] == next) {if(next==9){reached.add((ty+1) * 100000 + (tx));}else{pos.push([tx,ty+1,next+1])}}
				if(map[ty-1] != null && map[ty-1][tx] != null && map[ty-1][tx] == next) {if(next==9){reached.add((ty-1) * 100000 + (tx));}else{pos.push([tx,ty-1,next+1])}}
			}
			n+=reached.size;
		}
	}

	return n;
}

export async function part2() {
	let map = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n').map(x=>x.split('').map(y=>+y));
	let n = 0;
	for(let y = 0; y < map.length; ++y) {
		for(let x = 0; x < map[y].length; ++x) {
			if(map[y][x] != 0)
				continue;

			let pos = [[x,y,1]];
			while(pos.length) {
				const [tx,ty,next] = pos.pop();
				if(map[ty] != null && map[ty][tx+1] != null && map[ty][tx+1] == next) {if(next==9){++n;}else{pos.push([tx+1,ty,next+1])}}
				if(map[ty] != null && map[ty][tx-1] != null && map[ty][tx-1] == next) {if(next==9){++n;}else{pos.push([tx-1,ty,next+1])}}
				if(map[ty+1] != null && map[ty+1][tx] != null && map[ty+1][tx] == next) {if(next==9){++n;}else{pos.push([tx,ty+1,next+1])}}
				if(map[ty-1] != null && map[ty-1][tx] != null && map[ty-1][tx] == next) {if(next==9){++n;}else{pos.push([tx,ty-1,next+1])}}
			}
		}
	}

	return n;
}