import { LlamaModel, LlamaContext } from "@llama-node/core"
import { load } from "@llama-node/llama-cpp"

const model = load()
const instance = new LlamaModel(model, {
	modelPath: "./model/tinyllama-1.1b-code-190k.Q4_K_M.gguf",
	gpuLayers: 0 // 强制CPU模式
})

const context = new LlamaContext(model, instance)

export async function codeReview(diff) {
	const prompt = `[INST] <<SYS>>
  你是一个高效的代码审查助手，仅反馈以下关键问题：
  1. 安全漏洞（如SQL注入、XSS）
  2. 内存泄漏/死锁风险
  3. 未处理的异常
  <</SYS>>
  请分析以下代码变更：\n${diff}
  [/INST]`

	const result = await context.infer(prompt, {
		maxTokens: 200,
		temperature: 0.1
	})

	return result.text
}
