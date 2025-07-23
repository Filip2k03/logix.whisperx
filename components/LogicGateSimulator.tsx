import React, { useState, useMemo } from 'react';
import { GateType } from '../types';
import Card from './common/Card';
import UniversalGateVisualizer from './UniversalGateVisualizer';

const GateIcon: React.FC<{ gate: GateType }> = ({ gate }) => {
    const commonPathClass = "stroke-gray-400 stroke-2 fill-none";
    const textClass = "fill-gray-300 font-sans text-xs";

    switch (gate) {
        case GateType.AND:
            return (
                <svg viewBox="0 0 60 40" className="w-24 h-16">
                    <path d="M10 10 H 20 C 40 10, 40 30, 20 30 H 10 Z" className={commonPathClass} />
                    <text x="23" y="22" className={textClass}>AND</text>
                </svg>
            );
        case GateType.OR:
            return (
                <svg viewBox="0 0 60 40" className="w-24 h-16">
                    <path d="M10 10 Q 25 20, 10 30 Q 25 30, 40 20 Q 25 10, 10 10 Z" className={commonPathClass} />
                    <text x="18" y="22" className={textClass}>OR</text>
                </svg>
            );
        case GateType.XOR:
            return (
                <svg viewBox="0 0 60 40" className="w-24 h-16">
                     <path d="M5 10 Q 20 20, 5 30" className={commonPathClass} />
                     <path d="M10 10 Q 25 20, 10 30 Q 25 30, 40 20 Q 25 10, 10 10 Z" className={commonPathClass} />
                     <text x="18" y="22" className={textClass}>XOR</text>
                </svg>
            );
        case GateType.NOT:
             return (
                <svg viewBox="0 0 60 40" className="w-24 h-16">
                    <path d="M10 10 L 30 20 L 10 30 Z" className={commonPathClass} />
                    <circle cx="35" cy="20" r="3" className={commonPathClass} />
                    <text x="15" y="22" className={textClass}>NOT</text>
                </svg>
            );
        case GateType.BUFFER:
             return (
                <svg viewBox="0 0 60 40" className="w-24 h-16">
                    <path d="M10 10 L 30 20 L 10 30 Z" className={commonPathClass} />
                    <text x="13" y="22" className={textClass}>BUF</text>
                </svg>
            );
        case GateType.NAND:
            return (
                <svg viewBox="0 0 60 40" className="w-24 h-16">
                    <path d="M10 10 H 20 C 40 10, 40 30, 20 30 H 10 Z" className={commonPathClass} />
                    <circle cx="43" cy="20" r="3" className={commonPathClass} />
                    <text x="20" y="22" className={textClass}>NAND</text>
                </svg>
            );
        case GateType.NOR:
            return (
                <svg viewBox="0 0 60 40" className="w-24 h-16">
                    <path d="M10 10 Q 25 20, 10 30 Q 25 30, 40 20 Q 25 10, 10 10 Z" className={commonPathClass} />
                    <circle cx="43" cy="20" r="3" className={commonPathClass} />
                    <text x="18" y="22" className={textClass}>NOR</text>
                </svg>
            );
        case GateType.XNOR:
            return (
                <svg viewBox="0 0 60 40" className="w-24 h-16">
                     <path d="M5 10 Q 20 20, 5 30" className={commonPathClass} />
                     <path d="M10 10 Q 25 20, 10 30 Q 25 30, 40 20 Q 25 10, 10 10 Z" className={commonPathClass} />
                     <circle cx="43" cy="20" r="3" className={commonPathClass} />
                     <text x="16" y="22" className={textClass}>XNOR</text>
                </svg>
            );
    }
};

const ToggleSwitch: React.FC<{ label: string; isOn: boolean; setIsOn: (on: boolean) => void }> = ({ label, isOn, setIsOn }) => (
    <div className="flex items-center space-x-4">
        <span className="font-mono text-lg text-gray-400">{label}</span>
        <button onClick={() => setIsOn(!isOn)} className="relative inline-flex items-center h-8 w-16 rounded-full bg-gray-700 transition-colors duration-300 focus:outline-none">
            <span className={`absolute left-1 transition-transform duration-300 transform ${isOn ? 'translate-x-8' : 'translate-x-0'} h-6 w-6 rounded-full bg-white flex items-center justify-center`}>
                <span className={`font-bold text-sm ${isOn ? 'text-green-500' : 'text-red-500'}`}>{isOn ? '1' : '0'}</span>
            </span>
        </button>
    </div>
);

const LogicGateSimulator: React.FC = () => {
  const [gateType, setGateType] = useState<GateType>(GateType.AND);
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(true);
  const [constructionMode, setConstructionMode] = useState<'NAND' | 'NOR'>('NAND');

  const isOneInputGate = useMemo(() => gateType === GateType.NOT || gateType === GateType.BUFFER, [gateType]);

  const output = useMemo(() => {
    switch (gateType) {
      case GateType.AND: return inputA && inputB;
      case GateType.OR: return inputA || inputB;
      case GateType.XOR: return inputA !== inputB;
      case GateType.NOT: return !inputA;
      case GateType.BUFFER: return inputA;
      case GateType.NAND: return !(inputA && inputB);
      case GateType.NOR: return !(inputA || inputB);
      case GateType.XNOR: return inputA === inputB;
      default: return false;
    }
  }, [inputA, inputB, gateType]);
  
  const gateTypes = [GateType.AND, GateType.OR, GateType.XOR, GateType.NOT, GateType.BUFFER, GateType.NAND, GateType.NOR, GateType.XNOR];
  const hasInvertingCircle = [GateType.NOT, GateType.NAND, GateType.NOR, GateType.XNOR].includes(gateType);

  const getLineClass = (isActive: boolean) => `transition-all duration-300 ${isActive ? 'stroke-green-400' : 'stroke-gray-500'}`;

  const twoInputTruthTable = useMemo(() => {
    if (isOneInputGate) return [];
    
    const inputs = [
        { a: 0, b: 0 },
        { a: 0, b: 1 },
        { a: 1, b: 0 },
        { a: 1, b: 1 },
    ];

    return inputs.map(({ a, b }) => {
        let out;
        const boolA = !!a;
        const boolB = !!b;
        switch (gateType) {
            case GateType.AND: out = boolA && boolB; break;
            case GateType.OR:  out = boolA || boolB; break;
            case GateType.XOR: out = boolA !== boolB; break;
            case GateType.NAND:out = !(boolA && boolB); break;
            case GateType.NOR: out = !(boolA || boolB); break;
            case GateType.XNOR:out = boolA === boolB; break;
            default: out = false;
        }
        return { a, b, out: out ? 1 : 0 };
    });
  }, [gateType, isOneInputGate]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
        <Card>
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Logic Gate Simulator</h2>
            <div className="flex justify-center flex-wrap gap-2 mb-8 bg-gray-900 p-2 rounded-lg">
                {gateTypes.map((gate) => (
                <button
                    key={gate}
                    onClick={() => setGateType(gate)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    gateType === gate
                        ? 'bg-cyan-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    {gate}
                </button>
                ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 mt-8 md:mt-0">
                {/* Inputs */}
                <div className="flex flex-col space-y-8">
                    <ToggleSwitch label="Input A" isOn={inputA} setIsOn={setInputA} />
                    {!isOneInputGate && (
                        <ToggleSwitch label="Input B" isOn={inputB} setIsOn={setInputB} />
                    )}
                </div>

                {/* Gate Visualization */}
                <div className="relative flex items-center justify-center w-48 h-32 my-4 md:my-0">
                    <svg className="absolute w-full h-full" viewBox="0 0 100 80">
                        {/* Input lines */}
                        <line x1="0" y1={isOneInputGate ? "40" : "20"} x2="38" y2={isOneInputGate ? "40" : "20"} strokeWidth="2" className={getLineClass(inputA)} />
                        {!isOneInputGate && <line x1="0" y1="60" x2="38" y2="60" strokeWidth="2" className={getLineClass(inputB)} />}
                        
                        {/* Output line */}
                        <line x1={hasInvertingCircle ? "88" : "75"} y1="40" x2="100" y2="40" strokeWidth="2" className={getLineClass(output)} />
                    </svg>
                    <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <GateIcon gate={gateType} />
                    </div>
                </div>

                {/* Output */}
                <div className="flex flex-col items-center">
                    <span className="text-lg font-mono text-gray-400 mb-2">Output</span>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold transition-colors duration-300 ${output ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'}`}>
                        {output ? '1' : '0'}
                    </div>
                </div>
            </div>
        </Card>

        <Card>
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Truth Tables</h2>
            
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-cyan-300 mb-3 text-center">1-Input Gates</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full max-w-sm mx-auto text-center border-collapse">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th scope="col" rowSpan={2} className="p-3 text-sm font-semibold text-gray-300 align-bottom">Input A</th>
                                <th scope="col" colSpan={2} className="p-3 text-sm font-semibold text-gray-300 border-b border-gray-700">Output</th>
                            </tr>
                            <tr className="border-b border-gray-700">
                                <th scope="col" className="p-2 text-sm font-medium text-gray-400">Buffer</th>
                                <th scope="col" className="p-2 text-sm font-medium text-gray-400">Inverter (NOT)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-800 last:border-b-0">
                                <td className="p-3 font-mono">0</td>
                                <td className="p-3 font-mono">0</td>
                                <td className="p-3 font-mono text-cyan-400">1</td>
                            </tr>
                            <tr className="border-b border-gray-800 last:border-b-0">
                                <td className="p-3 font-mono">1</td>
                                <td className="p-3 font-mono">1</td>
                                <td className="p-3 font-mono text-cyan-400">0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {!isOneInputGate && (
                <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-3 text-center">2-Input Gate: {gateType}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full max-w-sm mx-auto text-center border-collapse">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th scope="col" className="p-3 text-sm font-semibold text-gray-300">Input A</th>
                                    <th scope="col" className="p-3 text-sm font-semibold text-gray-300">Input B</th>
                                    <th scope="col" className="p-3 text-sm font-semibold text-gray-300">Output</th>
                                </tr>
                            </thead>
                            <tbody>
                                {twoInputTruthTable.map((row, index) => {
                                    const isActive = (inputA === !!row.a) && (inputB === !!row.b);
                                    return (
                                        <tr key={index} className={`border-b border-gray-800 last:border-b-0 transition-colors ${isActive ? 'bg-cyan-500/20' : 'hover:bg-gray-800/50'}`}>
                                            <td className="p-3 font-mono">{row.a}</td>
                                            <td className="p-3 font-mono">{row.b}</td>
                                            <td className={`p-3 font-mono font-bold ${row.out ? 'text-green-400' : 'text-red-400'}`}>{row.out}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Card>

        {/* Universal Gate Constructions Section */}
        <Card>
            <h2 className="text-2xl font-bold text-cyan-400 mb-2 text-center">Universal Gate Constructions</h2>
            <p className="text-center text-gray-400 mb-6">See how all gates can be built from only NAND or NOR gates. Toggle the inputs above to see the logic flow.</p>
            <div className="flex justify-center space-x-2 mb-8 bg-gray-900 p-2 rounded-lg">
                {(['NAND', 'NOR'] as const).map((mode) => (
                    <button
                        key={mode}
                        onClick={() => setConstructionMode(mode)}
                        className={`px-6 py-2 rounded-md font-medium transition-colors ${
                            constructionMode === mode
                                ? 'bg-cyan-500 text-white shadow-lg'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {mode} Constructions
                    </button>
                ))}
            </div>
            <UniversalGateVisualizer 
                constructionType={constructionMode} 
                inputA={inputA} 
                inputB={inputB} 
            />
        </Card>
    </div>
  );
};

export default LogicGateSimulator;