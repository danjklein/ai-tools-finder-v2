'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function SearchDialog() {
  const [query, setQuery] = useState('');
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/completion',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    complete(query);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What kind of AI tool are you looking for?"
          className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>
      </form>

      {completion && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Recommended Tools</h3>
          <div className="prose prose-blue">
            <div className="whitespace-pre-wrap">{completion}</div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3">Searching for the perfect tools...</span>
          </div>
        </div>
      )}
    </div>
  );
}