import React, { useState } from 'react';

const AIAssistant = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!window.puter || !window.puter.ai) {
      setResponse('Puter AI service not available.');
      return;
    }
    setLoading(true);
    try {
      const res = await window.puter.ai.chat(prompt);
      setResponse(typeof res === 'string' ? res : JSON.stringify(res));
    } catch (err) {
      console.error('AI error', err);
      setResponse('Error getting response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">AI Assistant</h2>
      <textarea
        className="w-full border p-2 mb-2" rows="4"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Ask the AI about football strategies, player training, etc."
      />
      <button
        onClick={sendPrompt}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading || !prompt.trim()}
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-50 whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
