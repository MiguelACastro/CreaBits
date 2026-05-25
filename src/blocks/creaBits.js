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

const CIRCULO = {
    type: 'circulo',
    message0: 'CIRCULO %1',
    args0: [
        {
            type: 'input_value',
            name: 'RADIO',
            check: 'Number',
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#7790d9',
    tooltip: 'Dibuja un circulo con el radio especificado',
    extensions: ["validate_circulo_radio"]
}

Blockly.Extensions.register('validate_circulo_radio', function() {
    this.setOnChange(function(changeEvent) {
        const radioBlock = this.getInputTargetBlock('RADIO');
        if (radioBlock && radioBlock.type === 'math_number') {
            const radioValue = Number(radioBlock.getFieldValue('NUM'));
            if (radioValue < 0) {
                this.setWarningText('El radio del círculo no puede ser negativo.');
            } else {
                this.setWarningText(null);
            }
        } else {
            this.setWarningText(null);
        }
    });
});

const IR_A = {
    type: 'ir_a',
    message0: 'IR A X: %1 Y: %2',
    args0: [
        {
            type: 'input_value',
            name: 'X',
            check: 'Number'
        },
        {
            type: 'input_value',
            name: 'Y',
            check: 'Number'
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#7aa3a3',
    tooltip: 'Mueve a la coordenada X e Y',
}


const POS_X = {
    type: 'pos_x',
    message0: 'X',
    output: 'Number',
    colour: '#d4a017',
    tooltip: 'Posición X del cursor',
}

const POS_Y = {
    type: 'pos_y',
    message0: 'Y',
    output: 'Number',
    colour: '#d4a017',
    tooltip: 'Posición Y del cursor',
}

const ANGULO = {
    type: 'angulo',
    message0: 'ÁNGULO',
    output: 'Number',
    colour: '#d4a017',
    tooltip: 'Ángulo actual del cursor en grados',
}

const LIMITE_IZQ = {
    type: 'limite_izq',
    message0: 'LÍMITE IZQUIERDA',
    output: 'Number',
    colour: '#d4a017',
    tooltip: 'Límite izquierdo del canvas',
}

const LIMITE_DER = {
    type: 'limite_der',
    message0: 'LÍMITE DERECHA',
    output: 'Number',
    colour: '#d4a017',
    tooltip: 'Límite derecho del canvas',
}

const LIMITE_SUP = {
    type: 'limite_sup',
    message0: 'LÍMITE SUPERIOR',
    output: 'Number',
    colour: '#d4a017',
    tooltip: 'Límite superior del canvas',
}

const LIMITE_INF = {
    type: 'limite_inf',
    message0: 'LÍMITE INFERIOR',
    output: 'Number',
    colour: '#d4a017',
    tooltip: 'Límite inferior del canvas',
}

export const blocks = Blockly.common.defineBlocksWithJsonArray([
    AVANZA,
    GIRA,
    SALTA,
    GROSOR,
    PINTA,
    LIMPIA,
    CIRCULO,
    IR_A,
    POS_X,
    POS_Y,
    ANGULO,
    LIMITE_IZQ,
    LIMITE_DER,
    LIMITE_SUP,
    LIMITE_INF
])