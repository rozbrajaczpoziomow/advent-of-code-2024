import { readFile, stat, writeFile } from 'node:fs/promises';

const year = 2024;

let aocSession;
async function downloadInput(day) {
	console.log(`> Downloading input for day ${day}`);
	if(aocSession == null)
		aocSession = await readFile('../aocSession.txt');

	const resp = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
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

// thanks to myself: https://github.com/rozbrajaczpoziomow-kt/aoc-kotlin-template/blob/main/src/main/kotlin/AOCInteractions.kt#L40
let state;
async function submit(day, part, sol) {
	if(process.env.IN) // don't prompt to submit for custom/test inputs
		return;

	if(aocSession == null)
		aocSession = await readFile('../aocSession.txt');

	if(state == null) {
		try {
			state = JSON.parse((await readFile('../state.json')).toString());
		} catch {
			state = { submitted: [] };
		}
	}

	const key = `${day}.${part}`;
	if(state.submitted.includes(key))
		return;

	process.stdout.write(`Submit "${sol}" to day ${day} pt ${part}? [yn] `);
	let res;
	const promise = new Promise(_res => { res = _res; });
	process.stdin.once('data', buf => res(buf[0] === 'y'.charCodeAt(0)));
	const doSubmit = await promise;
	if(!doSubmit) {
		console.log('n');
		return;
	}

	console.log('y');
	const resp = await fetch(`https://adventofcode.com/${year}/day/${day}/answer`, {
		method: 'POST',
		body: `level=${part}&answer=${encodeURIComponent(sol)}`,
		headers: {
			Cookie: `session=${aocSession}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
	const text = (await resp.text()).split('<article><p>')[1].split('</p></article>')[0].replaceAll(/<\/?.*?>/g, '').replaceAll('  ', ' ').replace('If you\'re stuck, make sure you\'re using the full input data; there are also some general tips on the about page, or you can ask for hints on the subreddit. ', '');
	console.log(text);

	if(!text.includes('not the right answer') && !text.includes('gave an answer too recently')) {
		state.submitted.push(key);
		await writeFile('../state.json', JSON.stringify(state, null, '\t'));
	}
}


const days = [];
if(process.argv[2]) {
	if(process.argv[2] === 'all')
		days.push(...new Array(25).fill(0).map((x, i) => i + 1));
	else
		days.push(...process.argv.slice(2).map(x => +x).filter(x => x && !Number.isNaN(x)));
} else {
	const date = new Date();
	if(date.getFullYear() !== year || date.getMonth() !== 11) {
		console.log('run.js [...days | all]');
		process.exit(1);
	}
	days.push(date.getDate());
}

const origCwd = process.cwd();

let totalTime = 0;
for(const day of days) {
	const folder = `${day}`.padStart(2, '0');

	process.chdir(folder); // this solves readFile('./input.txt') and any other things that might rely on it (i.e. makes things simpler for me)
	try {
		await stat('input.txt');
	} catch {
		await downloadInput(day);
	}
	let file = process.env.RUN;
	if(!file) {
		try {
			await stat('day.op.js');
			file = 'day.op.js';
		} catch {
			file = 'day.js';
		}
	}
	console.log(`> -- Day ${day}${file == 'day.js'? '' : ` [${file}]`} --`);
	const { part1, part2 } = await import(`./${folder}/${file}`);
	let startTime = performance.now();
	const ans1 = await part1();
	const part1Time = performance.now() - startTime;
	if(ans1 !== null) {
		console.log(`> Part 1:\n${ans1}\n`);
		await submit(day, 1, ans1);
	}

	startTime = performance.now();
	const ans2 = await part2();
	const part2Time = performance.now() - startTime;
	if(ans2 !== null) {
		console.log(`> Part 2:\n${ans2}`);
		await submit(day, 2, ans2);
	}
	console.log(`\npt 1: ${part1Time.toFixed(1)}ms; pt 2: ${part2Time.toFixed(1)}ms`);
	totalTime += part1Time + part2Time;

	process.chdir(origCwd);
}

if(days.length > 1)
	console.log(`Total time: ${(totalTime / 1000).toFixed(1)} s`);