
import React, { useState, useMemo, useCallback } from 'react';
import { NumberBase } from '../types';
import Card from './common/Card';

const NumberConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('1010');
  const [fromBase, setFromBase] = useState<NumberBase>(NumberBase.BINARY);
  const [toBase, setToBase] = useState<NumberBase>(NumberBase.DECIMAL);

  const baseOptions = [
    { label: 'Binary', value: NumberBase.BINARY },
    { label: 'Decimal', value: NumberBase.DECIMAL },
    { label: 'Hexadecimal', value: NumberBase.HEXADECIMAL },
    { label: 'Octal', value: NumberBase.OCTAL },
  ];

  const isValidInput = useMemo(() => {
    if (inputValue === '') return true;
    const regexMap = {
      [NumberBase.BINARY]: /^[01]+$/,
      [NumberBase.DECIMAL]: /^[0-9]+$/,
      [NumberBase.HEXADECIMAL]: /^[0-9a-fA-F]+$/,
      [NumberBase.OCTAL]: /^[0-7]+$/,
    };
    return regexMap[fromBase].test(inputValue);
  }, [inputValue, fromBase]);

  const outputValue = useMemo(() => {
    if (!inputValue || !isValidInput) {
      return '';
    }
    try {
      const decimalValue = parseInt(inputValue, fromBase);
      if (isNaN(decimalValue)) return '';
      return decimalValue.toString(toBase).toUpperCase();
    } catch (error) {
      return '';
    }
  }, [inputValue, fromBase, toBase, isValidInput]);
  
  const handleFromBaseChange = useCallback((newBase: NumberBase) => {
    // Reset input when base changes to avoid invalid states
    setInputValue('');
    setFromBase(newBase);
  }, []);
  
  const handleToBaseChange = useCallback((newBase: NumberBase) => {
    setToBase(newBase);
  }, []);

  const BaseSelector: React.FC<{
    selectedValue: NumberBase;
    onChange: (value: NumberBase) => void;
  }> = ({ selectedValue, onChange }) => (
    <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
      {baseOptions.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            selectedValue === option.value
              ? 'bg-cyan-500 text-white shadow-md'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Number System Converter</h2>
      
      <div className="space-y-6">
        {/* From Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-400">From</label>
          <BaseSelector selectedValue={fromBase} onChange={handleFromBaseChange} />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`w-full p-3 bg-gray-700 border-2 rounded-lg text-white text-xl font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors ${!isValidInput && inputValue ? 'border-red-500' : 'border-gray-600'}`}
            placeholder={`Enter a base-${fromBase} number`}
            autoComplete="off"
          />
          {!isValidInput && inputValue && <p className="text-red-400 text-xs mt-1">Invalid character for the selected base.</p>}
        </div>

        {/* To Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-400">To</label>
          <BaseSelector selectedValue={toBase} onChange={handleToBaseChange} />
          <div className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-green-400 text-xl font-mono min-h-[58px] flex items-center">
            {outputValue || <span className="text-gray-500">Result...</span>}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NumberConverter;
