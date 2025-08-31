import axios from 'axios';
import { ChatRequest, ChatResponse, UsageSummaryResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8008';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const llmService = {
  chat: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await api.post('/api/llm/chat', request);
    return response.data;
  },
};

export const usageService = {
  getSummary: async (): Promise<UsageSummaryResponse> => {
    const response = await api.get('/api/usage/summary');
    return response.data;
  },
};
