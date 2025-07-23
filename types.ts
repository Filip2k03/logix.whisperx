export enum AppView {
  GATES = 'GATES',
  CONVERTER = 'CONVERTER',
  EXPLAINER = 'EXPLAINER',
  NUMBER_TYPES = 'NUMBER_TYPES',
}

export enum GateType {
  AND = 'AND',
  OR = 'OR',
  XOR = 'XOR',
  NOT = 'NOT',
  BUFFER = 'BUFFER',
  NAND = 'NAND',
  NOR = 'NOR',
  XNOR = 'XNOR',
}

export enum NumberBase {
  BINARY = 2,
  DECIMAL = 10,
  HEXADECIMAL = 16,
  OCTAL = 8,
}