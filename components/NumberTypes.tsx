import React, { useState, useMemo } from 'react';
import Card from './common/Card';

// Static data for definitions, also used for ordering in the table
const numberTypesData = [
  {
    name: 'Natural Numbers',
    description: 'Common counting numbers, starting from 1. Example: 1, 2, 3, ...'
  },
  {
    name: 'Prime Number',
    description: 'A natural number greater than 1 which has only 1 and itself as factors. Example: 2, 3, 5, 7, 11.'
  },
  {
    name: 'Composite Number',
    description: 'A natural number greater than 1 which has more factors than 1 and itself. Example: 4, 6, 8, 9, 10.'
  },
  {
    name: 'Whole Numbers',
    description: 'The set of Natural Numbers with the number 0 adjoined. Example: 0, 1, 2, 3, ...'
  },
  {
    name: 'Integers',
    description: 'Whole Numbers with their opposites (negative numbers) adjoined. Example: ..., -2, -1, 0, 1, 2, ...'
  },
  {
    name: 'Rational Numbers',
    description: 'All numbers which can be written as fractions (a/b where b is not 0). Example: 1/2, -3/4, 5.'
  },
  {
    name: 'Irrational Numbers',
    description: 'All numbers which cannot be written as fractions. Their decimal representations are non-repeating and non-terminating. Example: π, √2.'
  },
  {
    name: 'Real Numbers',
    description: 'The set of Rational Numbers with the set of Irrational Numbers adjoined. It includes all numbers on the number line.'
  },
  {
    name: 'Complex Number',
    description: 'A number which can be written in the form a + bi, where a and b are real numbers and i is the square root of -1. Example: 3 + 2i.'
  },
];

// Helper to check for primality
const isPrime = (n: number): boolean => {
  if (!Number.isInteger(n) || n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i = i + 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
};

// Main classification logic
const classifyNumber = (input: string): Record<string, boolean> | null => {
    const sanitizedInput = input.trim().toLowerCase();
    if (sanitizedInput === '') return null;

    const classification: Record<string, boolean> = Object.fromEntries(numberTypesData.map(t => [t.name, false]));

    // Check for complex numbers like a+bi
    if (sanitizedInput.includes('i') && sanitizedInput.match(/[+\-]/) && !sanitizedInput.startsWith('http')) {
        classification['Complex Number'] = true;
        // This is a simplification. We don't determine if it's also Real.
        return classification;
    }

    // Check for explicit irrational numbers
    if (sanitizedInput.includes('π') || sanitizedInput.includes('pi') || sanitizedInput.includes('√')) {
        classification['Irrational Numbers'] = true;
        classification['Real Numbers'] = true;
        classification['Complex Number'] = true;
        return classification;
    }
    
    let num: number;

    // Check for fractions
    const fractionMatch = sanitizedInput.match(/^(-?\d+)\s*\/\s*([1-9]\d*)$/);
    if (fractionMatch) {
        const numerator = parseInt(fractionMatch[1], 10);
        const denominator = parseInt(fractionMatch[2], 10);
        num = numerator / denominator;
    } else {
        const parsedNum = parseFloat(sanitizedInput);
        if (isNaN(parsedNum)) {
            return null; // Invalid input if not a recognizable number format
        }
        num = parsedNum;
    }

    classification['Complex Number'] = true;
    classification['Real Numbers'] = true;
    classification['Rational Numbers'] = true; // All standard numbers are rational in this model

    if (Number.isInteger(num)) {
        classification['Integers'] = true;
        if (num >= 0) {
            classification['Whole Numbers'] = true;
            if (num > 0) {
                classification['Natural Numbers'] = true;
                if (isPrime(num)) {
                    classification['Prime Number'] = true;
                } else if (num > 1){
                    classification['Composite Number'] = true;
                }
            }
        }
    }
    
    return classification;
};

const NumberTypes: React.FC = () => {
    const [userInput, setUserInput] = useState<string>('7');

    const classificationResult = useMemo(() => classifyNumber(userInput), [userInput]);
    
    // Ensure table rows are always in the same order as definitions
    const orderedClassification = useMemo(() => {
      if (!classificationResult) return null;
      const result: { name: string; belongs: boolean }[] = [];
      for (const type of numberTypesData) {
        result.push({ name: type.name, belongs: classificationResult[type.name] || false });
      }
      return result;
    }, [classificationResult]);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12">
            
            {/* Interactive Classifier */}
            <Card>
                <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">Interactive Number Classifier</h2>
                <p className="text-center text-gray-400 mb-6">Enter a number to see its properties. Try "7", "-5", "3.14", "1/2", or "3+2i".</p>
                <div className="max-w-md mx-auto">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter a number..."
                        aria-label="Number to classify"
                        className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white text-xl font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors text-center"
                    />
                </div>
                <div className="mt-6 overflow-x-auto">
                    {orderedClassification ? (
                        <table className="w-full max-w-md mx-auto text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th scope="col" className="p-3 text-sm font-semibold text-gray-300">Property</th>
                                    <th scope="col" className="p-3 text-sm font-semibold text-gray-300 text-center">Is It?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderedClassification.map(({ name, belongs }) => (
                                    <tr key={name} className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800/50">
                                        <td className="p-3 text-cyan-300 font-medium">{name}</td>
                                        <td className="p-3 text-center">
                                            <span className={`text-2xl font-semibold ${belongs ? 'text-green-400' : 'text-red-500/70'}`} aria-label={belongs ? 'Yes' : 'No'}>
                                                {belongs ? '✓' : '✗'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="mt-6 text-center text-gray-500">
                            <p>Enter a valid number to see its classification.</p>
                        </div>
                    )}
                </div>
            </Card>

            {/* Definitions */}
            <div>
              <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">A Journey Through Number Types</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {numberTypesData.map((type) => (
                  <Card key={type.name} className="flex flex-col transform hover:-translate-y-1 transition-transform duration-300 h-full">
                    <h3 className="text-xl font-semibold text-cyan-300 mb-3">{type.name}</h3>
                    <p className="text-gray-300 text-base leading-relaxed">{type.description}</p>
                  </Card>
                ))}
              </div>
            </div>
        </div>
    );
};

export default NumberTypes;
