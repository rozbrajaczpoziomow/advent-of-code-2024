import { open, readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round, min, max } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	// let w = 11, h = 7;
	let w = 101, h = 103;
	let robots = []; // {x,y,vx,vy}[]
	for(let line of input) {
		const [[x, y], [vx, vy]] = line.split(' ').map(x => x.slice(2).split(',').map(y => +y));
		robots.push({x,y,vx,vy});
	}

	for(let i = 0; i < 100; ++i) {
		for(let robot of robots) {
			let {x, y, vx, vy} = robot;
			// console.log(x, y);
			x += vx;
			y += vy;
			if(x < 0)
				x += w;
			if(y < 0)
				y += h;
			if(x >= w)
				x -= w;
			if(y >= h)
				y -= h;
			robot.x = x;
			robot.y = y;
		}
	}

	// let m = [];
	// for(let x = 0; x < h; ++x) {
	// 	m.push([]);
	// 	for(let y = 0; y < w; ++y)
	// 		m[x].push('.')
	// }
	let qrs = [0, 0, 0, 0];

	const hx = floor(w / 2), hy = floor(h / 2);
	for(let r of robots) {
		let {x, y} = r;
		if(x < hx && y < hy)
			++qrs[0];
		if(x > hx && y < hy)
			++qrs[1];
		if(x < hx && y > hy)
			++qrs[2];
		if(x > hx && y > hy)
			++qrs[3];

		// m[y][x] = m[y][x] == '.'? '1' : `${+m[y][x] + 1}`;
	}

	return qrs.reduce((a, b) => a*b);

	// for(let l of m)
	// 	console.log(l.join(''));
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	// let w = 11, h = 7;
	let w = 101, h = 103;
	let robots = []; // {x,y,vx,vy}[]
	for(let line of input) {
		const [[x, y], [vx, vy]] = line.split(' ').map(x => x.slice(2).split(',').map(y => +y));
		robots.push({x,y,vx,vy});
	}

	for(let i = 0; i < 100000; ++i) {
		let m = [];
		for(let x = 0; x < h; ++x) {
			m.push([]);
			for(let y = 0; y < w; ++y)
				m[x].push(' ')
		}
		for(let robot of robots) {
			let {x, y, vx, vy} = robot;
			// console.log(x, y);
			x += vx;
			y += vy;
			if(x < 0)
				x += w;
			if(y < 0)
				y += h;
			if(x >= w)
				x -= w;
			if(y >= h)
				y -= h;
			robot.x = x;
			robot.y = y;
			m[y][x] = '#';
		}
		// found this manually for aoc (saved 10k into a file and ctrl+f'd)
		for(let l of m)
			if(l.join('').includes('###############################'))
				return i + 1;
	}
}