import React, { useState } from 'react';

const languageLabels = {
  en: 'English',
  hi: 'हिन्दी',
  kn: 'ಕನ್ನಡ',
};

export default function WhatsAppBotFeatureCard({
  icon,
  title,
  description,
  command,
  voice,
  mockResponse,
  inputType,
  languages = ['en', 'hi', 'kn'],
}) {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [inputValue, setInputValue] = useState('');
  const [fileName, setFileName] = useState('');
  const [response, setResponse] = useState('');

  const handleInput = (e) => setInputValue(e.target.value);
  const handleFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setResponse(mockResponse);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse(mockResponse);
  };
  const handleButton = () => setResponse(mockResponse);

  return (
    <div className="flex flex-col bg-white rounded-xl border shadow-sm hover:shadow-md p-6 transition-all">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl" aria-hidden="true">{icon}</span>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <div className="flex flex-wrap gap-2 items-center mb-2">
        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{command}</span>
        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{voice}</span>
      </div>
      <div className="flex gap-2 mb-4">
        {languages.map((lang) => (
          <button
            key={lang}
            className={`px-2 py-1 rounded text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors ${selectedLang === lang ? 'bg-primary-100 text-primary-700 border-primary-400' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
            onClick={() => setSelectedLang(lang)}
            aria-pressed={selectedLang === lang}
          >
            {languageLabels[lang] || lang}
          </button>
        ))}
      </div>
      {/* Input Area */}
      {inputType === 'text' && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-2">
          <input
            type="text"
            className="input-field border rounded px-3 py-2 text-sm"
            placeholder="Type your query..."
            value={inputValue}
            onChange={handleInput}
            aria-label="Text input"
          />
          <button type="submit" className="btn-primary w-full">Send</button>
        </form>
      )}
      {inputType === 'fileOrText' && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-2">
          <input
            type="file"
            accept="image/*,.pdf,.txt"
            className="input-field border rounded px-3 py-2 text-sm"
            onChange={handleFile}
            aria-label="Upload file"
          />
          {fileName && <span className="text-xs text-gray-500">Selected: {fileName}</span>}
          <input
            type="text"
            className="input-field border rounded px-3 py-2 text-sm"
            placeholder="Or paste report text..."
            value={inputValue}
            onChange={handleInput}
            aria-label="Text input"
          />
          <button type="submit" className="btn-primary w-full">Analyze</button>
        </form>
      )}
      {inputType === 'button' && (
        <div className="flex gap-2 mb-2">
          <button className="btn-primary flex-1" onClick={handleButton}>Start</button>
          <button className="btn-secondary flex-1" onClick={handleButton}>Stop</button>
        </div>
      )}
      {inputType === 'form' && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-2">
          <input
            type="text"
            className="input-field border rounded px-3 py-2 text-sm"
            placeholder="Enter details (e.g. crop, area, rainfall)"
            value={inputValue}
            onChange={handleInput}
            aria-label="Form input"
          />
          <button type="submit" className="btn-primary w-full">Calculate</button>
        </form>
      )}
      {/* For analytics, just a button to simulate */}
      {inputType === 'none' && (
        <button className="btn-primary w-full mb-2" onClick={handleButton}>Get Data</button>
      )}
      {/* Simulated Response */}
      {response && (
        <div className="bg-primary-50 border border-primary-200 rounded p-3 mt-2 text-sm text-primary-900">
          <span className="font-semibold">Bot:</span> {response}
        </div>
      )}
    </div>
  );
} 