/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';
import {blocks} from './blocks/creaBits';
import {forBlock} from './generators/creaBits';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import './index.css';
import * as Es from 'blockly/msg/es';
import {installAllBlocks as installColourBlocks} from '@blockly/field-colour';
import Interpreter from 'js-interpreter';

installColourBlocks({
  javascript: javascriptGenerator
});
Object.assign(javascriptGenerator.forBlock, forBlock);

Blockly.setLocale(Es);
Blockly.ContextMenuItems.registerCommentOptions();
// Set up UI elements and inject Blockly
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {toolbox});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cursor = {
    x: 0,
    y: 0,
    angulo: 0,
}

function initCanvas() {
    ctx.reset();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    cursor.x = 0;
    cursor.y = 0;
    cursor.angulo = 0;
}

function avanza(distancia) {
    ctx.beginPath();
    ctx.moveTo(cursor.x, cursor.y);
    cursor.x += distancia * Math.cos(cursor.angulo);
    cursor.y += distancia * Math.sin(cursor.angulo);
    ctx.lineTo(cursor.x, cursor.y);
    ctx.stroke();
}

function gira(angulo) {
    cursor.angulo += angulo * Math.PI / 180;
}

function salta(distancia) {
    cursor.x += distancia * Math.cos(cursor.angulo);
    cursor.y += distancia * Math.sin(cursor.angulo);
    ctx.moveTo(cursor.x, cursor.y);
}

function grosor(grosor) {
    ctx.lineWidth = grosor;
}

function pinta(color) {
    ctx.strokeStyle = color;
}

function limpiar() {
    initCanvas();
}

function circulo(radio) {
    ctx.beginPath();
    ctx.arc(cursor.x, cursor.y, radio, 0, 2 * Math.PI);
    ctx.stroke();
}

function initApi(interpreter, globalObject) {
    interpreter.setProperty(globalObject, 'CANVAS_WIDTH', canvas.width);
    interpreter.setProperty(globalObject, 'CANVAS_HEIGHT', canvas.height);

    interpreter.setProperty(globalObject, 'getCursorX', interpreter.createNativeFunction(() => cursor.x));
    interpreter.setProperty(globalObject, 'getCursorY', interpreter.createNativeFunction(() => cursor.y));
    interpreter.setProperty(globalObject, 'getCursorAngulo', interpreter.createNativeFunction(() => Math.round(cursor.angulo * 180 / Math.PI)));

    interpreter.setProperty(globalObject, 'avanza', interpreter.createNativeFunction((d) => avanza(Number(d))));
    interpreter.setProperty(globalObject, 'gira', interpreter.createNativeFunction((a) => gira(Number(a))));
    interpreter.setProperty(globalObject, 'salta', interpreter.createNativeFunction((d) => salta(Number(d))));
    interpreter.setProperty(globalObject, 'grosor', interpreter.createNativeFunction((g) => grosor(Number(g))));
    interpreter.setProperty(globalObject, 'pinta', interpreter.createNativeFunction((c) => pinta(String(c))));
    interpreter.setProperty(globalObject, 'limpiar', interpreter.createNativeFunction(limpiar));
    interpreter.setProperty(globalObject, 'circulo', interpreter.createNativeFunction((r) => circulo(Number(r))));
    
    const pseudoConsole = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
    interpreter.setProperty(globalObject, 'console', pseudoConsole);
    interpreter.setProperty(pseudoConsole, 'log', interpreter.createNativeFunction((...args) => console.log(...args)));
}

const runCode = () => {
  initCanvas();
  let code = javascriptGenerator.workspaceToCode(ws);
  console.log(code);
  const myInterpreter = new Interpreter(code, initApi);
  try {
    myInterpreter.run();
  } catch (error) {
    console.error(error);
  }
};

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (
    e.isUiEvent ||
    e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  runCode();
});
