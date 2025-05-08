import { getDiffBetweenCommits } from './diff.js';
import { codeReview } from './review.js';

// 通过命令行参数获取SHA（后续可替换为GitLab CI变量）
const [repoPath, baseSha, headSha] = process.argv.slice(2);

async function main() {
	try {
		const diff = getDiffBetweenCommits(repoPath, baseSha, headSha);
		const result = await codeReview(diff);

		console.log('🚀 审查结果：\n', result);
		process.exit(result.includes('高风险') ? 1 : 0); // 发现严重问题返回非0
	} catch (err) {
		console.error('❌ 审查失败：', err);
		process.exit(2);
	}
}

main();
