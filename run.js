import { readFile, writeFile } from 'node:fs/promises';

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

	if(resp.ok)
		await writeFile('input.txt', await resp.body());
	else
		console.error(`Couldn't download input (response code ${resp.status}) - aoc session expired?`);
}

const days = [];
if(process.argv[1]) {
	if(process.argv[1] === 'all')
		days.push(...new Array(25).fill(0).map((x, i) => i + 1));
	else
		days.push(...process.argv.slice(1).map(x => +x).filter(x => x && !Number.isNaN(x)));
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
		stat('input.txt');
	} catch {
		await downloadInput(day);
	}
	const { part1, part2 } = await import('./day.js');
	console.log('> Part 1:');
	const ans1 = await part1();
	if(ans1 === null)
		console.log('> NYI (returned null)');
	else
		console.log(ans1);

	console.log('> Part 2:');
	const ans2 = await part2();
	if(ans1 === null)
		console.log('> NYI (returned null)');
	else
		console.log(ans2);

	process.chdir(origCwd);
}