import React, { useState } from 'react';
import { llmService } from '../services/api';
import { ChatRequest, ChatResponse } from '../types';
import './ChatForm.css';

const ChatForm: React.FC = () => {
  const [formData, setFormData] = useState<ChatRequest>({
    openai_api_key: '',
    model: 'gpt-4',
    user_label: '',
    prompt: '',
  });

  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await llmService.chat(formData);
      setResponse(result);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="chat-form">
      <h2>Chat with LLM</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="openai_api_key">OpenAI API Key:</label>
          <input
            type="password"
            id="openai_api_key"
            name="openai_api_key"
            value={formData.openai_api_key}
            onChange={handleInputChange}
            required
            placeholder="sk-..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="model">Model:</label>
          <select
            id="model"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            required
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="user_label">User Label:</label>
          <input
            type="text"
            id="user_label"
            name="user_label"
            value={formData.user_label}
            onChange={handleInputChange}
            required
            placeholder="e.g., developer, analyst, student"
          />
        </div>

        <div className="form-group">
          <label htmlFor="prompt">Prompt:</label>
          <textarea
            id="prompt"
            name="prompt"
            value={formData.prompt}
            onChange={handleInputChange}
            required
            rows={4}
            placeholder="Enter your prompt here..."
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {error && <div className="error">Error: {error}</div>}

      {response && (
        <div className="response">
          <h3>Response:</h3>
          <div className="response-content">
            <p>{response.response}</p>
          </div>
          <div className="response-meta">
            <p>
              <strong>Model:</strong> {response.model}
            </p>
            <p>
              <strong>User Label:</strong> {response.user_label}
            </p>
            <p>
              <strong>Input Tokens:</strong> {response.input_tokens}
            </p>
            <p>
              <strong>Output Tokens:</strong> {response.output_tokens}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatForm;
