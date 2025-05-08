import { execSync } from 'child_process'

// 获取两个commit之间的差异
export function getDiffBetweenCommits(repoPath, baseSha, headSha) {
	return execSync(
		`git -C "${repoPath}" diff ${baseSha} ${headSha} --unified=0`,
		{ encoding: 'utf-8' }
	)
}

// 示例用法：
// const diff = getDiffBetweenCommits('.', 'HEAD~1', 'HEAD')
