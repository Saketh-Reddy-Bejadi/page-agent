import type { LLMConfig } from '@page-agent/llms'

// Default LLM: Gemini via its OpenAI-compatible endpoint.
// API key is entered by the user in the Settings view — never shipped in code.
export const DEFAULT_MODEL = 'gemini-2.5-flash'
// No trailing slash — the OpenAI-compatible client appends paths itself.
export const DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/openai'

export const DEFAULT_CONFIG: LLMConfig = {
	baseURL: DEFAULT_BASE_URL,
	model: DEFAULT_MODEL,
}
