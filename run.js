import { readFile, stat, writeFile } from 'node:fs/promises';

let aocSession;
async function downloadInput(day) {
	console.log(`> Downloading input for day ${day}`);
	if(aocSession == null)
		aocSession = await readFile('../aocSession.txt');

	const resp = await fetch(`https://adventofcode.com/2024/day/${day}/input`, {
		headers: {
			Cookie: `session=${aocSession}`
		}
	});

	const text = (await resp.text()).trimEnd('\n');

	if(resp.ok)
		await writeFile('input.txt', text);
	else
		console.error(`Couldn't download input (response code ${resp.status}) - aoc session expired?`);
}

const days = [];
if(process.argv[2]) {
	if(process.argv[2] === 'all')
		days.push(...new Array(25).fill(0).map((x, i) => i + 1));
	else
		days.push(...process.argv.slice(2).map(x => +x).filter(x => x && !Number.isNaN(x)));
} else {
	const date = new Date();
	if(!process.cwd().includes(date.getFullYear()) || date.getMonth() !== 11) {
		console.log('run.js [...days | all]');
		process.exit(1);
	}
	days.push(date.getDate());
}

const origCwd = process.cwd();

for(const day of days) {
	const folder = `${day}`.padStart(2, '0');

	process.chdir(folder); // this solves readFile('./input.txt') and any other things that might rely on it (i.e. makes things simpler for me)
	try {
		await stat('input.txt');
	} catch {
		await downloadInput(day);
	}
	const { part1, part2 } = await import(`./${folder}/day.js`);
	const startTime = performance.now();
	const ans1 = await part1();
	if(ans1 !== null)
		console.log(`> Part 1:\n${ans1}\n`);

	const ans2 = await part2();
	if(ans2 !== null)
		console.log(`> Part 2:\n${ans2}`);
	console.log(`\n${(performance.now() - startTime).toFixed(0)}ms`);

	process.chdir(origCwd);
}