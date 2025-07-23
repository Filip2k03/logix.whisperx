import React from 'react';
import { GateType } from '../types';
import Card from './common/Card';

type ConstructionType = 'NAND' | 'NOR';
interface VisualizerProps {
    constructionType: ConstructionType;
    inputA: boolean;
    inputB: boolean;
}

const getLineClass = (isActive: boolean) => `transition-all duration-300 ${isActive ? 'stroke-green-400' : 'stroke-gray-600'}`;

const MiniGate: React.FC<{ type: ConstructionType; x: number; y: number }> = ({ type, x, y }) => {
    const commonPathClass = "stroke-gray-400 stroke-[3] fill-none";
    const transform = `translate(${x}, ${y}) scale(0.6)`;

    if (type === 'NAND') {
        return (
            <g transform={transform}>
                <path d="M10 10 H 20 C 40 10, 40 30, 20 30 H 10 Z" className={commonPathClass} />
                <circle cx="43" cy="20" r="4" className={commonPathClass} />
            </g>
        );
    } else { // NOR
        return (
            <g transform={transform}>
                <path d="M10 10 Q 25 20, 10 30 Q 25 30, 40 20 Q 25 10, 10 10 Z" className={commonPathClass} />
                <circle cx="43" cy="20" r="4" className={commonPathClass} />
            </g>
        );
    }
};

const ConstructionDiagram: React.FC<{ gate: GateType, constructionType: ConstructionType, inputA: boolean, inputB: boolean }> =
    ({ gate, constructionType, inputA, inputB }) => {
    
    const nand = (a: boolean, b: boolean) => !(a && b);
    const nor = (a: boolean, b: boolean) => !(a || b);
    const op = constructionType === 'NAND' ? nand : nor;

    let diagram = null;

    if (gate === GateType.NOT && constructionType === 'NAND') {
        const out = op(inputA, inputA);
        diagram = (
            <svg viewBox="0 0 150 60">
                <MiniGate type="NAND" x={50} y={15} />
                <path d="M 0 30 H 50" strokeWidth="2" className={getLineClass(inputA)} />
                <path d="M 50 30 c 0 -5, -5 -10, -10 -10 H 30 V 25" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 50 30 c 0 5, -5 10, -10 10 H 30 V 35" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 90 30 H 150" strokeWidth="2" className={getLineClass(out)} />
            </svg>
        );
    }
    else if (gate === GateType.BUFFER && constructionType === 'NAND') {
        const out1 = op(inputA, inputA);
        const out2 = op(out1, out1);
         diagram = (
            <svg viewBox="0 0 200 60">
                <MiniGate type="NAND" x={30} y={15} />
                <MiniGate type="NAND" x={110} y={15} />
                <path d="M 0 30 H 30" className={getLineClass(inputA)} strokeWidth="2" />
                <path d="M 30 30 c 0 -5, -5 -10, -10 -10 H 10 V 25" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 30 30 c 0 5, -5 10, -10 10 H 10 V 35" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 70 30 H 110" className={getLineClass(out1)} strokeWidth="2" />
                <path d="M 110 30 c 0 -5, -5 -10, -10 -10 H 90 V 25" strokeWidth="1" className={getLineClass(out1)} />
                <path d="M 110 30 c 0 5, -5 10, -10 10 H 90 V 35" strokeWidth="1" className={getLineClass(out1)} />
                <path d="M 150 30 H 200" className={getLineClass(out2)} strokeWidth="2" />
            </svg>
        );
    }
    else if (gate === GateType.AND && constructionType === 'NAND') {
        const out1 = op(inputA, inputB);
        const out2 = op(out1, out1);
        diagram = (
            <svg viewBox="0 0 200 80">
                <MiniGate type="NAND" x={30} y={25} />
                <MiniGate type="NAND" x={110} y={25} />
                <path d="M 0 20 H 30" className={getLineClass(inputA)} strokeWidth="2" />
                <path d="M 0 60 H 30" className={getLineClass(inputB)} strokeWidth="2" />
                <path d="M 70 40 H 110" className={getLineClass(out1)} strokeWidth="2" />
                <path d="M 110 40 c 0 -5, -5 -10, -10 -10 H 90 V 35" strokeWidth="1" className={getLineClass(out1)} />
                <path d="M 110 40 c 0 5, -5 10, -10 10 H 90 V 45" strokeWidth="1" className={getLineClass(out1)} />
                <path d="M 150 40 H 200" className={getLineClass(out2)} strokeWidth="2" />
            </svg>
        );
    }
    else if (gate === GateType.OR && constructionType === 'NAND') {
        const out1 = op(inputA, inputA);
        const out2 = op(inputB, inputB);
        const finalOut = op(out1, out2);
        diagram = (
             <svg viewBox="0 0 200 80">
                <MiniGate type="NAND" x={30} y={0} />
                <MiniGate type="NAND" x={30} y={50} />
                <MiniGate type="NAND" x={110} y={25} />
                <path d="M 0 15 H 30" className={getLineClass(inputA)} strokeWidth="2" />
                <path d="M 30 15 c 0 -5, -5 -10, -10 -10 H 10 V 10" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 30 15 c 0 5, -5 10, -10 10 H 10 V 20" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 0 65 H 30" className={getLineClass(inputB)} strokeWidth="2" />
                <path d="M 30 65 c 0 -5, -5 -10, -10 -10 H 10 V 60" strokeWidth="1" className={getLineClass(inputB)} />
                <path d="M 30 65 c 0 5, -5 10, -10 10 H 10 V 70" strokeWidth="1" className={getLineClass(inputB)} />
                <path d="M 70 15 H 110" className={getLineClass(out1)} strokeWidth="2" />
                <path d="M 70 65 H 110" className={getLineClass(out2)} strokeWidth="2" />
                <path d="M 150 40 H 200" className={getLineClass(finalOut)} strokeWidth="2" />
            </svg>
        );
    }
    else if (gate === GateType.NAND && constructionType === 'NAND') {
        const out = op(inputA, inputB);
        diagram = (
             <svg viewBox="0 0 150 80">
                <MiniGate type="NAND" x={50} y={25} />
                <path d="M 0 20 H 50" className={getLineClass(inputA)} strokeWidth="2" />
                <path d="M 0 60 H 50" className={getLineClass(inputB)} strokeWidth="2" />
                <path d="M 90 40 H 150" className={getLineClass(out)} strokeWidth="2" />
            </svg>
        );
    }
     else if (gate === GateType.XOR && constructionType === 'NAND') {
        const out1 = op(inputA, inputB);
        const out2 = op(inputA, out1);
        const out3 = op(inputB, out1);
        const finalOut = op(out2, out3);
        diagram = (
            <svg viewBox="0 0 280 80">
                <MiniGate type="NAND" x={80} y={25} />
                <MiniGate type="NAND" x={180} y={0} />
                <MiniGate type="NAND" x={180} y={50} />
                <MiniGate type="NAND" x={280} y={25} />
                <path d="M 0 20 H 80" className={getLineClass(inputA)} strokeWidth="2" />
                <path d="M 0 60 H 80" className={getLineClass(inputB)} strokeWidth="2" />
                <path d="M 120 40 H 150 C 160 40 160 15 170 15 H 180" className={`${getLineClass(out1)} fill-none`} strokeWidth="2" />
                <path d="M 120 40 H 150 C 160 40 160 65 170 65 H 180" className={`${getLineClass(out1)} fill-none`} strokeWidth="2" />
                <path d="M 40 20 H 180" className={`${getLineClass(inputA)} fill-none`} strokeWidth="2" />
                <path d="M 40 60 H 180" className={`${getLineClass(inputB)} fill-none`} strokeWidth="2" />
                <path d="M 220 15 H 280" className={getLineClass(out2)} strokeWidth="2" />
                <path d="M 220 65 H 280" className={getLineClass(out3)} strokeWidth="2" />
                <path d="M 320 40 H 350" className={getLineClass(finalOut)} strokeWidth="2" />
            </svg>
        )
    }
    // NOR constructions
    else if (gate === GateType.NOT && constructionType === 'NOR') {
        const out = op(inputA, inputA);
        diagram = (
            <svg viewBox="0 0 150 60">
                <MiniGate type="NOR" x={50} y={15} />
                <path d="M 0 30 H 50" strokeWidth="2" className={getLineClass(inputA)} />
                <path d="M 50 30 c 0 -5, -5 -10, -10 -10 H 30 V 25" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 50 30 c 0 5, -5 10, -10 10 H 30 V 35" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 90 30 H 150" strokeWidth="2" className={getLineClass(out)} />
            </svg>
        );
    }
    else if (gate === GateType.BUFFER && constructionType === 'NOR') {
        const out1 = op(inputA, inputA);
        const out2 = op(out1, out1);
         diagram = (
            <svg viewBox="0 0 200 60">
                <MiniGate type="NOR" x={30} y={15} />
                <MiniGate type="NOR" x={110} y={15} />
                <path d="M 0 30 H 30" className={getLineClass(inputA)} strokeWidth="2" />
                <path d="M 30 30 c 0 -5, -5 -10, -10 -10 H 10 V 25" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 30 30 c 0 5, -5 10, -10 10 H 10 V 35" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 70 30 H 110" className={getLineClass(out1)} strokeWidth="2" />
                <path d="M 110 30 c 0 -5, -5 -10, -10 -10 H 90 V 25" strokeWidth="1" className={getLineClass(out1)} />
                <path d="M 110 30 c 0 5, -5 10, -10 10 H 90 V 35" strokeWidth="1" className={getLineClass(out1)} />
                <path d="M 150 30 H 200" className={getLineClass(out2)} strokeWidth="2" />
            </svg>
        );
    }
    else if (gate === GateType.OR && constructionType === 'NOR') {
        const out1 = op(inputA, inputB);
        const out2 = op(out1, out1);
        diagram = (
            <svg viewBox="0 0 200 80">
                <MiniGate type="NOR" x={30} y={25} />
                <MiniGate type="NOR" x={110} y={25} />
                <path d="M 0 20 H 30" className={getLineClass(inputA)} strokeWidth="2" />
                <path d="M 0 60 H 30" className={getLineClass(inputB)} strokeWidth="2" />
                <path d="M 70 40 H 110" className={getLineClass(out1)} strokeWidth="2" />
                <path d="M 110 40 c 0 -5, -5 -10, -10 -10 H 90 V 35" strokeWidth="1" className={getLineClass(out1)} />
                <path d="M 110 40 c 0 5, -5 10, -10 10 H 90 V 45" strokeWidth="1" className={getLineClass(out1)} />
                <path d="M 150 40 H 200" className={getLineClass(out2)} strokeWidth="2" />
            </svg>
        );
    }
    else if (gate === GateType.AND && constructionType === 'NOR') {
        const out1 = op(inputA, inputA);
        const out2 = op(inputB, inputB);
        const finalOut = op(out1, out2);
        diagram = (
             <svg viewBox="0 0 200 80">
                <MiniGate type="NOR" x={30} y={0} />
                <MiniGate type="NOR" x={30} y={50} />
                <MiniGate type="NOR" x={110} y={25} />
                <path d="M 0 15 H 30" className={getLineClass(inputA)} strokeWidth="2" />
                <path d="M 30 15 c 0 -5, -5 -10, -10 -10 H 10 V 10" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 30 15 c 0 5, -5 10, -10 10 H 10 V 20" strokeWidth="1" className={getLineClass(inputA)} />
                <path d="M 0 65 H 30" className={getLineClass(inputB)} strokeWidth="2" />
                <path d="M 30 65 c 0 -5, -5 -10, -10 -10 H 10 V 60" strokeWidth="1" className={getLineClass(inputB)} />
                <path d="M 30 65 c 0 5, -5 10, -10 10 H 10 V 70" strokeWidth="1" className={getLineClass(inputB)} />
                <path d="M 70 15 H 110" className={getLineClass(out1)} strokeWidth="2" />
                <path d="M 70 65 H 110" className={getLineClass(out2)} strokeWidth="2" />
                <path d="M 150 40 H 200" className={getLineClass(finalOut)} strokeWidth="2" />
            </svg>
        );
    }
    else if (gate === GateType.NOR && constructionType === 'NOR') {
        const out = op(inputA, inputB);
        diagram = (
            <svg viewBox="0 0 150 80">
                <MiniGate type="NOR" x={50} y={25} />
                <path d="M 0 20 H 50" className={getLineClass(inputA)} strokeWidth="2" />
                <path d="M 0 60 H 50" className={getLineClass(inputB)} strokeWidth="2" />
                <path d="M 90 40 H 150" className={getLineClass(out)} strokeWidth="2" />
            </svg>
        );
    }
    else if (gate === GateType.XNOR && constructionType === 'NOR') {
        const out1 = op(inputA, inputA);
        const out2 = op(inputB, inputB);
        const out3 = op(inputA, inputB);
        const finalOut = op(op(out1,out2), out3);
        diagram = (
            <svg viewBox="0 0 280 80">
                <MiniGate type="NOR" x={0} y={0} />
                <MiniGate type="NOR" x={0} y={50} />
                <MiniGate type="NOR" x={80} y={25} />
                <MiniGate type="NOR" x={180} y={25} />

                <path d="M -40 15 H 0" className={getLineClass(inputA)} strokeWidth="2" />
                <path d="M 0 15 c -5 0 -10 -5 -10 -10 v -5" strokeWidth="1" className={`${getLineClass(inputA)} fill-none`} />
                <path d="M 0 15 c -5 0 -10 5 -10 10 v 5" strokeWidth="1" className={`${getLineClass(inputA)} fill-none`} />
                <path d="M 40 15 H 80" className={getLineClass(out1)} strokeWidth="2" />
                
                <path d="M -40 65 H 0" className={getLineClass(inputB)} strokeWidth="2" />
                <path d="M 0 65 c -5 0 -10 -5 -10 -10 v -5" strokeWidth="1" className={`${getLineClass(inputB)} fill-none`} />
                <path d="M 0 65 c -5 0 -10 5 -10 10 v 5" strokeWidth="1" className={`${getLineClass(inputB)} fill-none`} />
                <path d="M 40 65 H 80" className={getLineClass(out2)} strokeWidth="2" />

                <path d="M 120 40 H 180" className={getLineClass(op(out1, out2))} strokeWidth="2" />

                <path d="M -40 20 C 0 20, 20 20, 40 40 S 60 60, 80 60" className={`${getLineClass(inputA)} fill-none`} strokeWidth="2" />
                <path d="M -40 60 C 0 60, 20 60, 40 40 S 60 20, 80 20" className={`${getLineClass(inputB)} fill-none`} strokeWidth="2" />

                <path d="M 140 40 C 140 60, 160 60, 180 60" className={`${getLineClass(out3)} fill-none`} strokeWidth="2" />
                <path d="M 220 40 H 280" className={getLineClass(finalOut)} strokeWidth="2" />
            </svg>
        );
    }
    
    // Fallback for missing diagrams
    if (!diagram) {
        return <div className="text-gray-500 flex items-center justify-center h-24">Construction coming soon...</div>;
    }

    return (
        <Card className="bg-gray-800/60">
            <h4 className="text-lg font-semibold text-cyan-300 mb-4 text-center">
                {gate} from {constructionType}
            </h4>
            <div className="flex justify-center items-center min-h-[80px]">
                {diagram}
            </div>
        </Card>
    );
};

const UniversalGateVisualizer: React.FC<VisualizerProps> = ({ constructionType, inputA, inputB }) => {
    const gatesToBuild: GateType[] = [GateType.NOT, GateType.BUFFER, GateType.AND, GateType.OR, GateType.NAND, GateType.NOR, GateType.XOR, GateType.XNOR];
    const oneInputGates = [GateType.NOT, GateType.BUFFER];

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {gatesToBuild.map(gate => {
                 if (oneInputGates.includes(gate)) {
                    return <ConstructionDiagram key={gate} gate={gate} constructionType={constructionType} inputA={inputA} inputB={inputA} />
                }
                
                // Exclude NAND from NOR and NOR from NAND for now, as they are complex and less common
                if ( (gate === GateType.NAND && constructionType === 'NOR') || 
                     (gate === GateType.NOR && constructionType === 'NAND') ) {
                     return <ConstructionDiagram key={gate} gate={gate} constructionType={constructionType} inputA={inputA} inputB={inputB} />;
                }


                return (
                    <ConstructionDiagram key={gate} gate={gate} constructionType={constructionType} inputA={inputA} inputB={inputB} />
                )
            })}
        </div>
    );
};

export default UniversalGateVisualizer;