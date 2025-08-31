export interface ChatRequest {
  openai_api_key: string;
  model: string;
  user_label: string;
  prompt: string;
}

export interface ChatResponse {
  response: string;
  input_tokens: number;
  output_tokens: number;
  model: string;
  user_label: string;
}

export interface UsageSummary {
  model: string;
  user_label: string;
  total_input_tokens: number;
  total_output_tokens: number;
  request_count: number;
}

export interface UsageSummaryResponse {
  summaries: UsageSummary[];
}
