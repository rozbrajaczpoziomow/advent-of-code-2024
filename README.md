# [Advent of Code 2024](https://adventofcode.com/2024)

## Set-up:
```sh
printf '<aoc session>' >aocSession.txt
```


## Running:
```sh
node run.js 1 2 3 4 [...|all]
```

- inputs are automatically downloaded as input.txt
- input file that's used can be changed with the IN env var
- runs day.op.js if found, otherwise day.js
- automatically asks if you want to submit (if IN env var is not set)
  - if it submits a correct solution, it will store that information and not ask to submit for that day/part again
  - if it submits an incorrect solution, it'll just say what AoC sends back (though with some bs removed)


## Testing:
```sh
node test.js 1 2 3 4 [...|all]
```

- downloads puzzles from AoC and checks if the `Your puzzle answer was` text matches the output of the code
- caches downloaded `Your puzzle answer was` things in testcache/{day}.json


## Setting up for a different year
```sh
rm -r 0{1..9} {10..25} state.json testcache
node setup.js
sed --in-place "s/year = 202./year = $(date '+%Y')/" run.js test.js
```