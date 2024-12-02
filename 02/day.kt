fun main() {
	fun getInput(): List<String> {
		return File("input.txt").readText(Charsets.UTF_8).dropLastWhile { it == '\n' }.split('\n')
	}

	fun isValid(nums: List<Int>): Boolean {
		val desc = nums[0] > nums[1]
		for(i in 0 until nums.size - 1) {
			if(((desc && nums[i] > nums[i + 1]) || (!desc && nums[i] < nums[i + 1])) && abs(nums[i] - nums[i + 1]) < 4)
				continue
			return false
		}
		return true
	}

	override fun solve1(): String {
		return getInput().count {
			isValid(it.split(' ').map { n -> n.toInt() })
		}.toString()
	}

	override fun solve2(): String {
		return getInput().count {
			val vals = it.split(' ').map { n -> n.toInt() }
			if(isValid(vals))
				return@count true
			else {
				for(i in vals.indices) {
					val nv = vals.filterIndexed { idx, _ -> idx != i }
					if(isValid(nv))
						return@count true
				}
				return@count false
			}
		}.toString()
	}

	println(solve1())
	println(solve2())
}