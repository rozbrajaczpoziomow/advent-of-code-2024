import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';

const year = 2024;

const aocSession = (await readFile('aocSession.txt')).toString();
const headers = {
	Cookie: `session=${aocSession}`,
	'User-Agent': 'gh/rozbrajaczpoziomow/advent-of-code-2024 <https://rozbrajacz.futbol/>'
};
async function get(day) {
	try {
		return JSON.parse((await readFile(`testcache/${day}.json`)).toString());
	} catch {}

	try { await mkdir('testcache'); } catch {}

	const aoc = await (await fetch(`https://adventofcode.com/${year}/day/${day}`, {headers})).text();
	const answers = [...aoc.matchAll(/Your puzzle answer was <code>(.+?)<\/code>/g).map(x => x[1])];
	if(answers.length == 2)
		await writeFile(`testcache/${day}.json`, JSON.stringify(answers));

	return answers;
}

const days = [];
if(process.argv[2]) {
	if(process.argv[2] === 'all')
		days.push(...new Array(25).fill(0).map((x, i) => i + 1));
	else
		days.push(...process.argv.slice(2).map(x => +x).filter(x => x && !Number.isNaN(x)));
}

if(days.length == 0) {
	console.error('test.js [...days]');
	process.exit(1);
}

const origCwd = process.cwd();

for(const day of days) {
	const folder = `${day}`.padStart(2, '0');
	process.chdir(folder);

	let file = 'day.js';
	try {
		await stat('day.op.js');
		file = 'day.op.js';
	} catch {}

	console.log(`> Day ${day}`);
	const { part1, part2 } = await import(`./${folder}/${file}`);
	try {
		const p1 = await part1();
		const p2 = await part2();
		process.chdir(origCwd);
		if(p1 != null && p2 != null) {
			const [exp1, exp2] = await get(day);
			if(p1 != exp1)
				console.log(`Part 1: got ${p1}, expected ${exp1}`);
			if(p2 != exp2)
				console.log(`Part 2: got ${p2}, expected ${exp2}`);
			if(p1 == exp1 && p2 == exp2)
				console.log('Meower');
		}
		if(p1 == null)
			console.log('Part 1: got absolutely nothing');
		if(p2 == null)
			console.log('Part 2: got absolutely nothing');
	} catch(e) {
		console.error(e);
		process.chdir(origCwd);
	}

	console.log();
}