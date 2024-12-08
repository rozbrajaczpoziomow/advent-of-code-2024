program Day8;

{$mode objfpc}
{$H+}
// String => AnsiString, not ShortString

uses SysUtils, Math;

type
	point = record
		x, y: int64;
	end;
	ant = record
		lit: Char;
		ile: Int64;
		ab: array of point;
	end;

var
	inFile: TextFile;
	line: String;
	i, j, k, m, sum, sum2, wanted, counter: Int64;
	map: array of String;
	chars: array of ant;
	chr: Char;
	found: Boolean;
	pa, pb, anti: point;

begin
	AssignFile(inFile, 'input.txt');
	Reset(inFile);
	sum := 0;
	sum2 := 0;
	while not EOF(inFile) do begin
		SetLength(map, Length(map) + 1);
		ReadLn(inFile, map[High(map)]);
	end;

	for i := 0 to High(map) do
		for j := 1 to Length(map[i]) do begin
			chr := map[i][j];
			if chr = '.' then Continue;

			found := False;

			for k := 0 to High(chars) do
				if chars[k].lit = chr then begin
					chars[k].ile := chars[k].ile + 1;
					SetLength(chars[k].ab, Length(chars[k].ab) + 1);
					chars[k].ab[High(chars[k].ab)].x := i;
					chars[k].ab[High(chars[k].ab)].y := j;
					found := True;
				end;

			if found then Continue;
			SetLength(chars, Length(chars) + 1);
			chars[High(chars)].lit := chr;
			chars[High(chars)].ile := 1;
			SetLength(chars[High(chars)].ab, 1);
			chars[High(chars)].ab[0].x := i;
			chars[High(chars)].ab[0].y := j;
		end;

	for i := 0 to High(chars) do begin
		with chars[i] do begin
			for j := 0 to ile - 1 do
				for k := 0 to ile - 1 do begin
					pa := ab[j];
					pb := ab[k];
					if (pa.x = pb.x) and (pa.y = pb.y) then Continue;

					for m := 0 to 50 do begin
						// pa.x + m * dX
						// dX = pa.x - pb.x
						// pa.y + m * dY
						// dY = pa.y - pb.y
						anti.x := pa.x + m * (pa.x - pb.x);
						anti.y := pa.y + m * (pa.y - pb.y);

					// 0 - 11, 1 - 12
					// x >= 0 && x < 12 (x >= 12)
					// y >= 1 && y < 13


						if (anti.x < 0) or (anti.y < 1) or (anti.x >= Length(map)) or (anti.y >= Length(map) + 1) then Continue;

					// WriteLn('[', anti.x, ', ', anti.y, ']');

						map[anti.x][anti.y] := '#';
					end;

					sum := sum + 1;
				end;
			// Write(lit, ' -> ', ile, ' -- ');
			// for j := 0 to High(ab) do
			// 	with ab[j] do
			// 		Write('[', x, ', ', y, '] ');
			// WriteLn;
		end;
	end;

	// WriteLn;
	for i := 0 to High(map) do begin
		// WriteLn(map[i]);
		for j := 1 to Length(map[i]) do
			if map[i][j] = '#' then
				sum2 := sum2 + 1;
	end;
	// WriteLn;

	WriteLn(sum2);

	// 3 -> 12, 13, 21, 23, 31, 32
end.