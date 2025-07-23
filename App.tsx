import React, { useState } from 'react';
import LogicGateSimulator from './components/LogicGateSimulator';
import NumberConverter from './components/NumberConverter';
import ConceptExplainer from './components/ConceptExplainer';
import NumberTypes from './components/NumberTypes';
import { AppView } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.NUMBER_TYPES);

  const renderActiveView = () => {
    switch (activeView) {
      case AppView.NUMBER_TYPES:
        return <NumberTypes />;
      case AppView.GATES:
        return <LogicGateSimulator />;
      case AppView.CONVERTER:
        return <NumberConverter />;
      case AppView.EXPLAINER:
        return <ConceptExplainer />;
      default:
        return <NumberTypes />;
    }
  };
  
  const NavButton: React.FC<{view: AppView; label: string}> = ({view, label}) => (
     <button
        onClick={() => setActiveView(view)}
        className={`px-5 py-2 rounded-t-lg text-sm font-medium transition-all duration-300 transform whitespace-nowrap
          ${activeView === view 
            ? 'bg-gray-800/50 text-cyan-400 border-b-2 border-cyan-400' 
            : 'bg-transparent text-gray-400 hover:text-white hover:bg-gray-700/50'
          }`}
      >
        {label}
      </button>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-8 flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
        <header className="text-center z-10 mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            logix<span className="text-cyan-400">.whisperx</span>
            </h1>
            <p className="mt-2 text-lg text-gray-400">
            An Interactive Toolkit for Core Computing Principles
            </p>
        </header>

        <nav className="flex justify-start sm:justify-center border-b border-gray-700/50 w-full max-w-3xl mb-[-1px] z-10 overflow-x-auto">
            <div className="flex space-x-2 p-1">
                <NavButton view={AppView.NUMBER_TYPES} label="Number Types"/>
                <NavButton view={AppView.GATES} label="Logic Gates"/>
                <NavButton view={AppView.CONVERTER} label="Number Converter"/>
                <NavButton view={AppView.EXPLAINER} label="AI Explainer"/>
            </div>
        </nav>

        <main className="w-full flex-grow flex items-start justify-center p-4 z-10 mt-8 sm:mt-4">
           {renderActiveView()}
        </main>

        <footer className="text-center text-gray-500 text-sm mt-8 z-10">
            <p>Built for interactive learning and practice.</p>
        </footer>
    </div>
  );
};

export default App;