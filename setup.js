import { copyFile, mkdir, stat } from 'node:fs/promises';

for(let i = 1; i <= 25; ++i) {
	const folder = `${i}`.padStart(2, '0');
	try {
		await stat(folder);
	} catch {
		await mkdir(folder);
		await copyFile('base.js', `${folder}/day.js`);
	}
}