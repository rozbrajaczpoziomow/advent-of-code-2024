import java.io.File
import kotlin.math.abs

fun main() {
	fun getInput(): List<String> {
		return File("input.txt").readText(Charsets.UTF_8).dropLastWhile { it == '\n' }.split('\n')
	}

	fun solve1(): String {
		val la: ArrayList<Int> = ArrayList()
		val lb: ArrayList<Int> = ArrayList()

		getInput().map { line -> line.split("   ").map { n -> n.toInt() } }.forEach {
			la.add(it[0]);
			lb.add(it[1]);
		}

		la.sort()
		lb.sort()

		return la.mapIndexed { i, v -> abs(v - lb[i]) }.sum().toString()
	}

	fun solve2(): String {
		val la: ArrayList<Int> = ArrayList()
		val lb: ArrayList<Int> = ArrayList()

		getInput().map { line -> line.split("   ").map { n -> n.toInt() } }.forEach {
			la.add(it[0]);
			lb.add(it[1]);
		}

		return la.sumOf { lb.count { v -> v == it } * it }.toString()
	}

	println(solve1())
	println(solve2())
}