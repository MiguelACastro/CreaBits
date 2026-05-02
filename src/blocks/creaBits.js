import * as Blockly from 'blockly';

const AVANZA = {
    type: 'avanza',
    message0: 'AVANZA %1',
    args0: [
        {
            type: 'input_value',
            name: 'DISTANCIA',
            check: 'Number'
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#4a7729',
    tooltip: 'Avanza una cantidad de pixeles',
}

const GIRA = {
    type: 'gira',
    message0: 'GIRA %1',
    args0: [
        {
            type: 'input_value',
            name: 'ANGULO',
            check: 'Number'
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#5b80a5',
    tooltip: 'Gira una cantidad de grados',
}

const SALTA = {
    type: 'salta',
    message0: 'SALTA %1',
    args0: [
        {
            type: 'input_value',
            name: 'DISTANCIA',
            check: 'Number'
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#7aa3a3',
    tooltip: 'Salta una cantidad de pixeles',
}

const GROSOR = {
    type: 'grosor',
    message0: 'GROSOR %1',
    args0: [
        {
            type: 'input_value',
            name: 'GROSOR',
            check: 'Number'
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#84322e',
    tooltip: 'Cambia el grosor del trazo',
}

const PINTA = {
    type: 'pinta',
    message0: 'PINTA %1',
    args0: [
        {
            type: 'input_value',
            name: 'COLOR',
            check: 'Colour'
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#4b0082',
    tooltip: 'Cambia el color del trazo',
}

const LIMPIA = {
    type: 'limpiar',
    message0: 'LIMPIAR',
    args0: [],
    previousStatement: null,
    nextStatement: null,
    colour: '#ff0000',
    tooltip: 'Limpia el canvas',
}

export const blocks = Blockly.common.defineBlocksWithJsonArray([
    AVANZA,
    GIRA,
    SALTA,
    GROSOR,
    PINTA,
    LIMPIA,
])