import { fileURLToPath } from "url";
import path from "path";
import { getLlama, LlamaChatSession } from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const modelPath = path.join(__dirname, "../models/qwen2.5-coder-7b-instruct-q2_k.gguf").replaceAll("\\", "/");
console.log("Model path: " + modelPath);

const llama = await getLlama({
	gpuLayers: 0
});
const model = await llama.loadModel({
	modelPath,
});
const context = await model.createContext({
	contextSize: { max: 8096 }
});
const session = new LlamaChatSession({
	contextSequence: context.getSequence()
});

export async function codeReview(diff) {
	const prompt = `[INST] <<SYS>>
  你是一个高效的代码审查助手，仅反馈以下关键问题：
  1. 安全漏洞（如SQL注入、XSS）
  2. 内存泄漏/死锁风险
  3. 未处理的异常
	回答请只使用中文，并给出建议和修改示例
  <</SYS>>
  请分析以下代码变更：\n${diff}
  [/INST]`;

	const result = await session.prompt(prompt, {
		maxTokens: 200,
		temperature: 0
	});

	return result;
}

