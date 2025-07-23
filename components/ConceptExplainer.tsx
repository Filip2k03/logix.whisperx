
import React, { useState, useCallback } from 'react';
import { getConceptExplanation } from '../services/geminiService';
import Card from './common/Card';
import Spinner from './common/Spinner';

const ConceptExplainer: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleExplain = useCallback(async (query: string) => {
    if (!query) return;
    setIsLoading(true);
    setError('');
    setExplanation('');
    try {
      const result = await getConceptExplanation(query);
      // A simple markdown-to-html conversion for display
      const formattedResult = result
        .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 p-4 rounded-md overflow-x-auto my-2 text-sm"><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-700 text-yellow-300 px-1 py-0.5 rounded">$1</code>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');
        
      setExplanation(formattedResult);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to get explanation: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const preCannedQuestions = [
    "What is an AND gate?",
    "Explain binary numbers",
    "What is AMCC (Advanced Microcontroller Bus Architecture)?",
    "Differentiate between RAM and ROM",
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">AI Concept Explainer</h2>
      <p className="text-center text-gray-400 mb-6">Ask about any CS concept, like "AMCC", "Big O Notation", or "TCP/IP".</p>

      <div className="flex space-x-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleExplain(prompt)}
          placeholder="e.g., Explain what a compiler does..."
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        />
        <button
          onClick={() => handleExplain(prompt)}
          disabled={isLoading || !prompt}
          className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? <Spinner /> : 'Explain'}
        </button>
      </div>
      
      <div className="my-4 text-center text-sm text-gray-500">or try one of these:</div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {preCannedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => {
              setPrompt(q);
              handleExplain(q);
            }}
            className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 hover:text-white transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="mt-6 min-h-[200px] bg-gray-900/70 p-6 rounded-lg border border-gray-700">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Spinner />
            <p className="mt-2">Thinking...</p>
          </div>
        )}
        {error && <p className="text-red-400">{error}</p>}
        {explanation && (
          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: explanation }} />
        )}
        {!isLoading && !error && !explanation && (
            <div className="flex items-center justify-center h-full text-gray-500">
                Your explanation will appear here.
            </div>
        )}
      </div>
    </Card>
  );
};

export default ConceptExplainer;
