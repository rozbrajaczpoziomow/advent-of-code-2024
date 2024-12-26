import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const arreq = (a, b) => a.length == b.length && a.every((v, i) => v == b[i]);
const { abs, sqrt, sin, cos, floor, ceil, round, min, max, trunc } = Math;

export async function part1() {
	let [init, gates] = (await readFile(process.env.IN ?? 'input.txt')).toString().split('\n\n');
	const states = {};
	for(let l of init.split('\n')) {
		let [n,v] = l.split(': ');
		states[n] = v == '1';
	}
	let todo = []; // {a,b,res,op}[]
	for(let l of gates.split('\n')) {
		let [a, op, b, _, res] = l.split(' ');
		todo.push({a,b,res,op});
	}
	while(todo.length) {
		let {a,b,res,op} = todo.shift();
		if(states[a] == null || states[b] == null) {
			todo.push({a,b,res,op});
			continue;
		}
		// console.log(a,op,b,res,)
		states[res] = (op == 'AND'? (states[a] && states[b]) : op == 'OR'? (states[a] || states[b]) : (states[a] != states[b]));
	}
	// console.log(states);
	return parseInt(Object.keys(states).filter(x=>x[0]=='z').toSorted().toReversed().map(x=>states[x]?'1':'0').join(''),2);
}

export async function part2() {
	// solved manually
	return 'jgb,rkf,rrs,rvc,vcg,z09,z20,z24';
}