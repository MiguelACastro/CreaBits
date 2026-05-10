import {Order} from 'blockly/javascript';

export const forBlock = Object.create(null);

forBlock['avanza'] = function(block, generator) {
    const distance = generator.valueToCode(block, 'DISTANCIA', Order.ATOMIC);
    const code = `avanza(${distance});\n`;
    return code;
}

forBlock['gira'] = function(block, generator) {
    const angle = generator.valueToCode(block, 'ANGULO', Order.ATOMIC);
    const code = `gira(${angle});\n`;
    return code;
}

forBlock['salta'] = function(block, generator) {
    const distance = generator.valueToCode(block, 'DISTANCIA', Order.ATOMIC);
    const code = `salta(${distance});\n`;
    return code;
}

forBlock['grosor'] = function(block, generator) {
    const thickness = generator.valueToCode(block, 'GROSOR', Order.ATOMIC);
    const code = `grosor(${thickness});\n`;
    return code;
}

forBlock['pinta'] = function(block, generator) {
    const color = generator.valueToCode(block, 'COLOR', Order.ATOMIC);
    const code = `pinta(${color});\n`;
    return code;
}

forBlock['limpiar'] = function(block, generator) {
    const code = `limpiar();\n`;
    return code;
}

forBlock['circulo'] = function(block, generator) {
    const radio = generator.valueToCode(block, 'RADIO', Order.ATOMIC);
    const code = `circulo(${radio});\n`;
    return code;
}

forBlock['pos_x'] = function(block, generator) {
    return ['cursor.x', Order.ATOMIC];
}

forBlock['pos_y'] = function(block, generator) {
    return ['cursor.y', Order.ATOMIC];
}

forBlock['angulo'] = function(block, generator) {
    return ['Math.round(cursor.angulo * 180 / Math.PI)', Order.ATOMIC];
}

forBlock['limite_izq'] = function(block, generator) {
    return ['(-canvas.width / 2)', Order.ATOMIC];
}

forBlock['limite_der'] = function(block, generator) {
    return ['(canvas.width / 2)', Order.ATOMIC];
}

forBlock['limite_sup'] = function(block, generator) {
    return ['(-canvas.height / 2)', Order.ATOMIC];
}

forBlock['limite_inf'] = function(block, generator) {
    return ['(canvas.height / 2)', Order.ATOMIC];
}
