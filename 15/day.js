import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round, min, max } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString();
	let ns = [], n = 0;

	const [_map, _moves] = input.split('\n\n');
	const moves = _moves.replaceAll('\n', '');
	// console.log(moves);
	const map = _map.split('\n').map(x => x.split(''));
	// console.log(map);
	let rx, ry;
	map.forEach((v, i) => {
		if(!rx || rx == -1)
			if((rx = v.indexOf('@')) != -1) {
				ry = i;
			}
	});
	// console.log(rx, ry, map[ry][rx]);
	for(const move of moves) {
		let dx, dy;
		if(move == '^') [dx,dy]=[0, -1];
		if(move == '>') [dx,dy]=[1, 0];
		if(move == 'v') [dx,dy]=[0, 1];
		if(move == '<') [dx,dy]=[-1, 0];
		let [tx,ty]=[rx,ry];
		let canmove;
		// console.log(move, dx, dy);
		while(true) {
			tx+=dx;
			ty+=dy;
			if(tx < 0 || ty < 0 || tx >= map[0].length || ty >= map.length) {
				canmove = false;
				break;
			}
			if(map[ty][tx] == '.') {
				canmove = true;
				break;
			}
			if(map[ty][tx] == '#') {
				canmove = false;
				break;
			}
			// 'O' -> keep going
		}
		// console.log(canmove);
		if(!canmove)
			continue;

		// actually move
		// simplest case
		if(map[ry+dy][rx+dx] == '.') {
			// console.log('simplest case');
			map[ry][rx] = '.';
			rx += dx;
			ry += dy;
			map[ry][rx] = '@';
			// console.log(map.map(x=>x.join('')).join('\n'));
			// console.log('done');
			continue;
		}
		// console.log('hard case');

		map[ry][rx] = '.';
		// console.log('contr');
		// console.log(map.map(x=>x.join('')).join('\n'));
		while(true) {
			// console.log('we movin boys');
			// console.log(map.map(x=>x.join('')).join('\n'));
			if(tx == rx && ty == ry)
				break;
			map[ty][tx] = map[ty-dy][tx-dx];
			ty -= dy;
			tx -= dx;
		}
		// console.log();
		rx += dx;
		ry += dy;
		map[ry][rx] = '@';

		// console.log(map.map(x=>x.join('')).join('\n'));
		// console.log('done');
	}
	map.forEach((l, y) => {
		l.forEach((c, x) => {
			if(c == 'O')
				n += 100 * y + x;
		});
	});
	return n;
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString();
	let ns = [], n = 0;

	const [_map, _moves] = input.split('\n\n');
	const moves = _moves.replaceAll('\n', '');
	// console.log(moves);
	let map = _map.split('\n').map(x => x.split(''));
	// console.log(map);
	let rx, ry;
	map = map.map(r => r.map(ch => ch == '#'? '##' : ch == 'O'? '[]' : ch == '.'? '..' : ch == '@'? '@.' : 'ððððð').join('').split(''));
	// console.log(map.map(x=>x.join('')).join('\n'));
	map.forEach((v, i) => {
		if(!rx || rx == -1)
			if((rx = v.indexOf('@')) != -1) {
				ry = i;
			}
	});
	function _canmove(tx, ty, dx, dy) {
		// console.log(`_canmove(tx=${tx}, ty=${ty}, dx=${dx}, dy=${dy})`)
		tx += dx;
		ty += dy;
		if(tx < 0 || ty < 0 || tx >= map[0].length || ty >= map.length)
			return false; // will never actually happen

		if(map[ty][tx] == '.')
			return true;
		if(map[ty][tx] == '#')
			return false;
		if(dy == 0 && (map[ty][tx] == '[' || map[ty][tx] == ']'))
			return _canmove(tx, ty, dx, dy);
		if(map[ty][tx] == '[')
			return _canmove(tx, ty, dx, dy) && _canmove(tx + 1, ty, dx, dy);
		if(map[ty][tx] == ']')
			return _canmove(tx, ty, dx, dy) && _canmove(tx - 1, ty, dx, dy);
		// console.error(`${map[ty][tx]} => ðððððððððððððððð`);
	}
	// console.log(rx, ry, map[ry][rx]);
	for(const move of moves) {
		let dx, dy;
		if(move == '^') [dx,dy]=[0, -1];
		if(move == '>') [dx,dy]=[1, 0];
		if(move == 'v') [dx,dy]=[0, 1];
		if(move == '<') [dx,dy]=[-1, 0];
		// console.log(move,dx,dy);
		if(!_canmove(rx, ry, dx, dy))
			continue;
		// console.log('doing it');
		// console.log(map.map(x=>x.join('')).join('\n'));


		// actually move
		// simplest case
		if(map[ry+dy][rx+dx] == '.') {
			// console.log('simplest case');
			map[ry][rx] = '.';
			rx += dx;
			ry += dy;
			map[ry][rx] = '@';
			// console.log(map.map(x=>x.join('')).join('\n'));
			// console.log('done');
			continue;
		}
		// console.log('hard case');

		map[ry][rx] = '.';
		// console.log('contr');
		// console.log(map.map(x=>x.join('')).join('\n'));
		let movewhat = [];
		let iter = [[rx, ry]];
		while(iter.length) {
			// console.log();
			// console.log('movewhat:');
			// console.log(movewhat);
			// console.log(iter);
			// console.log('iter: ^');
			// console.log();
			let [tx, ty] = iter.pop();
			tx += dx;
			ty += dy;
			// console.log(`now: ${tx} ${ty} - ${map[ty][tx]}`);
			if(map[ty][tx] == '.')
				continue;
			if(dy == 0 && (map[ty][tx] == '[' || map[ty][tx] == ']')) {
				movewhat.push([tx, ty]);
				iter.push([tx, ty]);
				continue;
			}
			if(map[ty][tx] == '[') {
				movewhat.push([tx, ty], [tx + 1, ty]);
				iter.push([tx, ty], [tx + 1, ty]);
				continue
			}
			if(map[ty][tx] == ']') {
				movewhat.push([tx, ty], [tx - 1, ty]);
				iter.push([tx, ty], [tx - 1, ty]);
				continue;
			}
		}
		// console.log(movewhat);

		// uniq
		let a = [];
		for(let [axax,ayay]of movewhat) {
			let add = true;
			for(let [bxbx, byby] of a) {
				if(axax == bxbx && ayay == byby) {
					add = false;
					break;
				}
			}
			if(add)
				a.push([axax,ayay]);
		}

		movewhat = a;

		movewhat.reverse();
		movewhat.sort(([ax, ay], [bx, by]) => -dy * (ay - by));

		for(const [mx, my] of movewhat) {
			// console.log(map.map(x=>x.join('')).join('\n'));
			map[my+dy][mx+dx] = map[my][mx];
			map[my][mx] = '.';
		}
		rx += dx;
		ry += dy;
		map[ry][rx] = '@';

		// console.log(map.map(x=>x.join('')).join('\n'));
		// console.log('done');
	}
	map.forEach((l, y) => {
		l.forEach((c, x) => {
			if(c == '[')
				n += 100 * y + x;
		});
	});
	return n;
}