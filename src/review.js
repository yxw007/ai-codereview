import { Llama } from "node-llama-cpp";

const instance = new Llama({
	modelPath: "./model/TinyLlama-1.1B-intermediate-step-1431k-3T-code_contests_v0.15.Q2_K.gguf",
	gpuLayers: 0 // 强制CPU模式
});

async function codeReview(diff) {
	const prompt = `[INST] <<SYS>>
  你是一个高效的代码审查助手，仅反馈以下关键问题：
  1. 安全漏洞（如SQL注入、XSS）
  2. 内存泄漏/死锁风险
  3. 未处理的异常
  <</SYS>>
  请分析以下代码变更：\n${diff}
  [/INST]`;

	const result = await instance.infer({
		prompt,
		maxTokens: 200,
		temperature: 0.1
	});

	return result.text;
}

module.exports = { codeReview };
