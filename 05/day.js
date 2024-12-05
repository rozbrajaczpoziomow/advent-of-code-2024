import { readFile } from 'node:fs/promises';

const asc = (a, b) => a - b;
const desc = (a, b) => b - a;
const count = (arr, what) => arr.filter(el => el === what).length;
const { abs, sqrt, sin, cos, floor, ceil, round } = Math;

export async function part1() {
	let [rules, st] = (await readFile('input.txt')).toString().split('\n\n');
	st = st.split('\n').map(x => x.split(',').map(y => +y));
	rules = rules.split('\n').map(x => x.split('|').map(y => +y));
	let n=0;

	for(const pages of st) {
		const crules = {};
		// Y: [n[] X before it]
		for(const rule of rules) {
			// X|Y => X before Y
			// console.log(rule);
			if(pages.includes(rule[0]) && pages.includes(rule[1])) {
				crules[rule[1]] ??= [];
				crules[rule[1]].push(rule[0]);
			}
		}
		// console.log(crules);
		let corr = true;
		for(const n of pages) {
			if(crules[''+n])
				if(crules[''+n].length > 0) {
					corr = false;
					// console.log(corr);
					break;
				}

			for(const r in crules)
				crules[r] = crules[r].filter(x => x != n);
		}
		if(corr) {
			n += +pages[floor(pages.length / 2)];
			// console.log(n)
		}
	}
	return n;
}

export async function part2() {
	let [rules, st] = (await readFile('input.txt')).toString().split('\n\n');
	st = st.split('\n').map(x => x.split(',').map(y => +y));
	rules = rules.split('\n').map(x => x.split('|').map(y => +y));
	let g=0;

	for(let pages of st) {
		const crules = {};
		// Y: [n[] X before it]
		for(const rule of rules) {
			// X|Y => X before Y
			// console.log(rule);
			if(pages.includes(rule[0]) && pages.includes(rule[1])) {
				crules[rule[1]] ??= [];
				crules[rule[1]].push(rule[0]);
			}
		}
		// console.log(crules);
		const npages = [];
		let corr = true;
		while(pages.length > 0) {
			let n = pages.shift();
			if(crules[''+n])
				if(crules[''+n].length > 0) {
					corr = false;
					// console.log(corr);

					const needtoadd = crules[''+n];
					for(const asd of pages)
						if(needtoadd.includes(asd)) {
							pages = [asd, n, ...pages.filter(P => P != asd)];
							break;
						}
					continue;
				}

			for(const r in crules)
				crules[r] = crules[r].filter(x => x != n);
			npages.push(n);
		}
		if(!corr) {
			// console.log(npages);
			g += +npages[floor(npages.length / 2)];
			// console.log(n)
		}
	}
	return g;
}