import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round } = Math;

export async function part1() {
	let input = (await readFile('input.txt')).toString().split('\n');
	let ns = [], n = 0;
	const visited = new Set();
	let pos;
	let map = [];
	let dir = [-1, 0];

	let i = 0;
	for(const line of input) {
		map.push([...line]);
		if(line.includes('^'))
			pos = [i, line.indexOf('^')];
		++i;
	}

	map[pos[0]][pos[1]] = 'X';

	while(true) {
		// console.log(pos, map[pos[0]]?.[pos[1]], dir);
		pos = [pos[0] + dir[0], pos[1] + dir[1]];
		if(map[pos[0]] == null || map[pos[0]][pos[1]] == null)
			break;
		if(map[pos[0]][pos[1]] == '#') {
			pos = [pos[0] - dir[0], pos[1] - dir[1]];
			// console.log('switch');
			if(dir[0] == -1) {
				if(dir[1] == 0)
					dir = [0, 1];
			} else if(dir[0] == 0) {
				if(dir[1] == 1)
					dir = [1, 0];
				else if(dir[1] == -1)
					dir = [-1, 0];
			} else if(dir[0] == 1) {
				if(dir[1] == 0)
					dir = [0, -1];
			}
		}
		map[pos[0]][pos[1]] = 'X';
		visited.add(pos);
	}

	return map.map(x => count(x, 'X')).reduce((a, b) => a + b);
}

export async function part2() {
	function turn(dir) {
		if(dir[0] == -1) {
			if(dir[1] == 0)
				return [0, 1];
		} else if(dir[0] == 0) {
			if(dir[1] == 1)
				return [1, 0];
			else if(dir[1] == -1)
				return [-1, 0];
		} else if(dir[0] == 1) {
			if(dir[1] == 0)
				return [0, -1];
		}
	}

	function doesloop(map, pos, dir) {
		map = structuredClone(map);
		pos = [pos[0], pos[1]]
		dir = [dir[0], dir[1]];

		let seen = {};
		seen[`${pos},${dir}`] = 1;

		// console.log(pos, dir);

		while(true) {
			pos = [pos[0] + dir[0], pos[1] + dir[1]];
			if(map[pos[0]] == null || map[pos[0]][pos[1]] == null)
				return false;
			if(map[pos[0]][pos[1]] == '#') {
				pos = [pos[0] - dir[0], pos[1] - dir[1]];
				dir = turn(dir);
				continue;
			}
			if(seen[`${pos},${dir}`])
				return true;
			seen[`${pos},${dir}`] = 1;
		}
	}

	let input = (await readFile('input.txt')).toString().split('\n');
	let ns = [], n = 0;
	const visited = new Set();
	let pos;
	let map = [];
	let dir = [-1, 0];

	let i = 0;
	for(const line of input) {
		map.push([...line]);
		if(line.includes('^'))
			pos = [i, line.indexOf('^')];
		++i;
	}

	let spos = [...pos];

	while(true) {
		pos = [pos[0] + dir[0], pos[1] + dir[1]];
		if(map[pos[0]] == null || map[pos[0]][pos[1]] == null)
			break;
		if(map[pos[0]][pos[1]] == '#') {
			pos = [pos[0] - dir[0], pos[1] - dir[1]];
			dir = turn(dir);
			continue;
		}
		map[pos[0]][pos[1]] = 'X';
	}

	for(let i = 0; i < map.length; ++i)
		for(let j =0; j< map[0].length; ++j){
			if(map[i][j] == 'X') {
				map[i][j] = '#';
				n += doesloop(map, spos, [-1, 0]);
				map[i][j] = '.';
			}
		}

	return n;
}