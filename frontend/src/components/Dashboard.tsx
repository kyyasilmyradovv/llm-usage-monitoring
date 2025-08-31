import React, { useState, useEffect } from 'react';
import { usageService } from '../services/api';
import { UsageSummary } from '../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [summaries, setSummaries] = useState<UsageSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsageSummary = async () => {
    try {
      setLoading(true);
      const result = await usageService.getSummary();
      setSummaries(result.summaries);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch usage summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageSummary();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading usage summary...</div>;
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>Error: {error}</p>
        <button onClick={fetchUsageSummary}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Usage Summary</h2>
        <button onClick={fetchUsageSummary}>Refresh</button>
      </div>

      {summaries.length === 0 ? (
        <div className="no-data">
          <p>No usage data available yet. Try sending a chat message first!</p>
        </div>
      ) : (
        <div className="usage-table-container">
          <table className="usage-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>User Label</th>
                <th>Total Input Tokens</th>
                <th>Total Output Tokens</th>
                <th>Request Count</th>
              </tr>
            </thead>
            <tbody>
              {summaries.map((summary, index) => (
                <tr key={index}>
                  <td>{summary.model}</td>
                  <td>{summary.user_label}</td>
                  <td>{summary.total_input_tokens.toLocaleString()}</td>
                  <td>{summary.total_output_tokens.toLocaleString()}</td>
                  <td>{summary.request_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
