program CreateFile;

{$mode objfpc}
{$H+}
// String => AnsiString, not ShortString

uses SysUtils, Math;

var
	inFile: TextFile;
	inp, line: String;
	sum, idx, doIdx, dontIdx, n1, n2: Int64;
	doMul: Boolean;

begin
	AssignFile(inFile, 'input.txt');
	Reset(inFile);
	inp := '';
	while not EOF(inFile) do begin
		ReadLn(inFile, line);
		inp := inp + line;
	end;
	CloseFile(inFile);

	sum := 0;

	while true do begin
		idx := Pos('mul(', inp);
		if idx = 0 then Break;
		Delete(inp, 1, idx + 3);
		// => x,y)...

		idx := Pos(',', inp);
		if (idx = 0) or (idx > 4) then Continue;
		n1 := StrToInt(Copy(inp, 1, idx - 1));
		Delete(inp, 1, idx);
		// n1 = x; => y)...

		idx := Pos(')', inp);
		if (idx = 0) or (idx > 4) then Continue;
		n2 := StrToInt(Copy(inp, 1, idx - 1));
		Delete(inp, 1, idx);
		// n1 = x; n2 = y; => ...

		sum := sum + n1 * n2;
	end;

	WriteLn(sum);

	// ----------------
	// ---- Part 2 ----
	// ----------------

	AssignFile(inFile, 'input.txt');
	Reset(inFile);
	inp := '';
	while not EOF(inFile) do begin
		ReadLn(inFile, line);
		inp := inp + line;
	end;
	CloseFile(inFile);

	sum := 0;
	doMul := true;

	while true do begin
		idx := Pos('mul(', inp);
		if idx = 0 then Break;

		doIdx := Pos('do()', inp);
		dontIdx := Pos('don''t()', inp);

		if (dontIdx <> 0) and ((doIdx = 0) or (doIdx > dontIdx)) and (dontIdx < idx) then begin
			Delete(inp, 1, dontIdx);
			// ...don't()... => on't()...
			doMul := false;
			Continue;
		end;
		if (doIdx <> 0) and ((dontIdx = 0) or (doIdx < dontIdx)) and (doIdx < idx) then begin
			Delete(inp, 1, doIdx);
			doMul := true;
			Continue;
			// ...do()... => o()...
		end;


		Delete(inp, 1, idx + 3);
		// => x,y)...

		if not doMul then Continue;

		idx := Pos(',', inp);
		if (idx = 0) or (idx > 4) then Continue;
		n1 := StrToInt(Copy(inp, 1, idx - 1));
		Delete(inp, 1, idx);
		// n1 = x; => y)...

		idx := Pos(')', inp);
		if (idx = 0) or (idx > 4) then Continue;
		n2 := StrToInt(Copy(inp, 1, idx - 1));
		Delete(inp, 1, idx);
		// n1 = x; n2 = y; => ...

		sum := sum + n1 * n2;
	end;

	WriteLn(sum);
end.