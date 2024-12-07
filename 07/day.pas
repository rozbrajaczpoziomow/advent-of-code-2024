program Day7;

{$mode objfpc}
{$H+}
// String => AnsiString, not ShortString

uses SysUtils, Math;

function concat(a: Int64; b: Int64): Int64;
begin
	if b < 10 then Exit(a * 10 + b);
	if b < 100 then Exit(a * 100 + b);
	if b < 1000 then Exit(a * 1000 + b);
	if b < 10000 then Exit(a * 10000 + b);
	if b < 100000 then Exit(a * 100000 + b);
	if b < 1000000 then Exit(a * 1000000 + b);
	if b < 10000000 then Exit(a * 10000000 + b);
	if b < 100000000 then Exit(a * 100000000 + b);
	if b < 1000000000 then Exit(a * 1000000000 + b);
	if b < 10000000000 then Exit(a * 10000000000 + b);
	if b < 100000000000 then Exit(a * 100000000000 + b);
	WriteLn('CONCAT SEND HELP ', a, '   ', b);
	Exit(-1);
end;

// part 1
function recurse(target: Int64; count: Int64; nums: array of Int64): Boolean;
var
	first, i: Int64;
	newarr: array of Int64;
begin
	if Length(nums) = 1 then
		Exit((nums[0] + count = target) or (nums[0] * count = target));

	first := nums[0];
	SetLength(newarr, Length(nums) - 1);
	for i := 0 to High(newarr) do newarr[i] := nums[i + 1];

	if first + count <= target then
		if recurse(target, first + count, newarr) then
			Exit(True);

	if first * count <= target then
		Exit(recurse(target, first * count, newarr));

	Exit(False);
end;

// part 2
function recurse2(target: Int64; count: Int64; nums: array of Int64): Boolean;
var
	first, i, concatted: Int64;
	newarr: array of Int64;
begin
	if Length(nums) = 1 then
		Exit((nums[0] + count = target) or (nums[0] * count = target) or (concat(count, nums[0]) = target));

	first := nums[0];
	SetLength(newarr, Length(nums) - 1);
	for i := 0 to High(newarr) do newarr[i] := nums[i + 1];

	if first + count <= target then
		if recurse2(target, first + count, newarr) then
			Exit(True);

	if first * count <= target then
		if recurse2(target, first * count, newarr) then
			Exit(True);

	concatted := concat(count, first);
	if concatted <= target then
		Exit(recurse2(target, concatted, newarr));

	Exit(False);
end;

var
	inFile: TextFile;
	line: String;
	sum, sum2, wanted, counter: Int64;
	nums: array of Int64;

begin
	AssignFile(inFile, 'input.txt');
	Reset(inFile);
	sum := 0;
	sum2 := 0;
	while not EOF(inFile) do begin
		ReadLn(inFile, line);
		// xx: y z a s d f
		wanted := StrToInt64(Copy(line, 1, Pos(':', line) - 1));
		Delete(line, 1, Pos(':', line) + 1);
		SetLength(nums, 0);
		while true do begin
			if Pos(' ', line) = 0 then Break;
			SetLength(nums, Length(nums) + 1);
			nums[High(nums)] := StrToInt64(Copy(line, 1, Pos(' ', line) - 1));
			Delete(line, 1, Pos(' ', line));
		end;
		SetLength(nums, Length(nums) + 1);
		nums[High(nums)] := StrToInt64(line);
		counter := nums[0];
		Delete(nums, 0, 1);
		if recurse(wanted, counter, nums) then
			sum := sum + wanted
		else
			if recurse2(wanted, counter, nums) then
				sum2 := sum2 + wanted;
	end;
	CloseFile(inFile);
	WriteLn(sum);
	WriteLn(sum + sum2);
end.