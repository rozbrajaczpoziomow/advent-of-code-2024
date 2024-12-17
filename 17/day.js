import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round, min, max, trunc } = Math;

export async function part1() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');
	let [a, b, c] = input.slice(0, 3).map(x => +x.split(': ')[1]);

	let prog = input[4].split(': ')[1].split(',').map(x=>+x);
	// console.log(prog);
	let ip = 0;
	const combo = arg => arg < 4? arg : arg == 4? a : arg == 5? b : arg == 6? c : null;
	const out = [];
	while(true) {
		if(ip >= prog.length)
			break;
		let ins = prog[ip], arg = prog[++ip];
		++ip;
		// console.log([ins,arg]);
		if(ins == 0)
			a = trunc(a / (2**combo(arg)));
		else if(ins == 1)
			b = b ^ arg;
		else if(ins == 2)
			b = combo(arg) & 7;
		else if(ins == 3) {
			if(a != 0)
				ip = arg;
		} else if(ins == 4)
			b = b ^ c;
		else if(ins == 5)
			out.push(combo(arg) & 7);
		else if(ins == 6)
			b = trunc(a / (2**combo(arg)));
		else if(ins == 7)
			c = trunc(a / (2**combo(arg)));
	}
	// console.log(a,b,c);
	return out.join()
}

export async function part2() {
	let input = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n');

	let prog = input[4].split(': ')[1].split(',').map(x=>+x);
	function run(_a) {
		let a = _a, b = 0, c = 0, ip = 0;
		const combo = arg => arg < 4? arg : arg == 4? a : arg == 5? b : arg == 6? c : null;
		let out = [];
		while(true) {
			if(ip >= prog.length)
				break;
			let ins = prog[ip], arg = prog[++ip];
			++ip;
			if(ins == 0)
				a = trunc(a / (2**combo(arg)));
			else if(ins == 1)
				b = b ^ arg;
			else if(ins == 2)
				b = combo(arg) & 7;
			else if(ins == 3) {
				if(a != 0)
					ip = arg;
			} else if(ins == 4)
				b = b ^ c;
			else if(ins == 5)
				out.push(combo(arg) & 7);
			else if(ins == 6)
				b = trunc(a / (2**combo(arg)));
			else if(ins == 7)
				c = trunc(a / (2**combo(arg)));
		}
		return out;
	}
	const eq = (arra, arrb) => arra.length == arrb.length && arra.every((v, i) => v == arrb[i]);
	let q = [[prog.length - 1, 0]];
	let sols = [];
	while(q.length) {
		const [cnt, v] = q.pop();

		for(let h = 0; h < 8; ++h) {
			let a = v*8+h;
			if(eq(run(a, 0, 0), prog.slice(cnt)))
				if(cnt == 0)
					sols.push(a);
				else
					q.push([cnt - 1, a]);
		}
	}
	return min(...sols);
}