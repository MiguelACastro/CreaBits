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
import InfiniteCanvas from 'ef-infinite-canvas';

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
const infCanvas = new InfiniteCanvas(canvas, { rotationEnabled: false });
const ctx = infCanvas.getContext("2d");

const cursor = {
    x: 0,
    y: 0,
    angulo: 0,
}

const cursorOverlay = document.getElementById('cursorOverlay');

function updateCursorOverlay() {
    if (!infCanvas) {
      return;
    }
    let a = 1, b = 0, c = 0, d = 1, e = 0, f = 0;
    try {
        const trans = infCanvas.inverseTransformation;
        if (trans) {
            a = trans.a;
            b = trans.b;
            c = trans.c;
            d = trans.d;
            e = trans.e;
            f = trans.f;
        }
    } catch (err) {
        console.error(err);
    }
    
    const worldX = cursor.x + canvas.width / 2;
    const worldY = cursor.y + canvas.height / 2;
    const screenX = a * worldX + c * worldY + e;
    const screenY = b * worldX + d * worldY + f;
    
    const vx = Math.cos(cursor.angulo);
    const vy = Math.sin(cursor.angulo);
    const transformedVx = a * vx + c * vy;
    const transformedVy = b * vx + d * vy;
    const screenAngle = Math.atan2(transformedVy, transformedVx);
    
    cursorOverlay.style.transform = `translate(${screenX}px, ${screenY}px) rotate(${screenAngle}rad)`;
    
    const isInsideView = screenX >= 0 && screenX <= canvas.width && screenY >= 0 && screenY <= canvas.height;
    cursorOverlay.style.visibility = isInsideView ? 'visible' : 'hidden';
}

infCanvas.addEventListener('transformationchange', () => {
    updateCursorOverlay();
});

infCanvas.addEventListener('draw', () => {
    updateCursorOverlay();
});

infCanvas.addEventListener('transformationstart', () => {
    cursorOverlay.style.transition = 'none';
});

infCanvas.addEventListener('transformationend', () => {
    cursorOverlay.style.transition = 'transform 0.1s linear';
});

function initCanvas() {
    ctx.reset();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    cursor.x = 0;
    cursor.y = 0;
    cursor.angulo = 0;
    updateCursorOverlay();
}

function avanza(distancia) {
    ctx.beginPath();
    ctx.moveTo(cursor.x, cursor.y);
    cursor.x += distancia * Math.cos(cursor.angulo);
    cursor.y += distancia * Math.sin(cursor.angulo);
    ctx.lineTo(cursor.x, cursor.y);
    ctx.stroke();
    updateCursorOverlay();
}

function gira(angulo) {
    cursor.angulo += angulo * Math.PI / 180;
    updateCursorOverlay();
}

function salta(distancia) {
    cursor.x += distancia * Math.cos(cursor.angulo);
    cursor.y += distancia * Math.sin(cursor.angulo);
    ctx.moveTo(cursor.x, cursor.y);
    updateCursorOverlay();
}

function ir_a(x, y) {
    cursor.x = x;
    cursor.y = y;
    ctx.moveTo(cursor.x, cursor.y);
    updateCursorOverlay();
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
    interpreter.setProperty(globalObject, 'ir_a', interpreter.createNativeFunction((x, y) => ir_a(Number(x), Number(y))));
    
    const pseudoConsole = interpreter.createObjectProto(interpreter.OBJECT_PROTO);
    interpreter.setProperty(globalObject, 'console', pseudoConsole);
    interpreter.setProperty(pseudoConsole, 'log', interpreter.createNativeFunction((...args) => console.log(...args)));

    // Highlight block function for JS Interpreter
    const wrapperHighlight = function(id) {
        id = String(id || '');
        highlightBlock(id);
        interpreter.pause_ = true;
    };
    interpreter.setProperty(globalObject, 'highlightBlock',
        interpreter.createNativeFunction(wrapperHighlight));
}

let myInterpreter = null;
let runner = null;

function highlightBlock(id) {
  ws.highlightBlock(id);
}

const runCode = (isInstant = false) => {
  clearTimeout(runner);
  initCanvas();
  ws.highlightBlock(null);
  
  if (isInstant) {
    javascriptGenerator.STATEMENT_PREFIX = '';
  } else {
    javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    javascriptGenerator.addReservedWords('highlightBlock');
  }
  
  let code = javascriptGenerator.workspaceToCode(ws);
  console.log(code);
  
  myInterpreter = new Interpreter(code, initApi);
  
  if (isInstant) {
    try {
      myInterpreter.run();
    } catch (error) {
      console.error(error);
    }
  } else {
    stepCode();
  }
};

function stepCode() {
  if (!myInterpreter) return;

  const speedSlider = document.getElementById('speedSlider');
  const delay = 1000 - (speedSlider ? parseInt(speedSlider.value, 10) : 500);
  
  let hasMore = true;
  myInterpreter.pause_ = false;

  try {
    while (hasMore && !myInterpreter.pause_) {
      hasMore = myInterpreter.step();
    }
  } catch (error) {
    console.error(error);
    hasMore = false;
  }

  if (hasMore) {
    runner = setTimeout(stepCode, delay);
  } else {
    ws.highlightBlock(null);
  }
}

document.getElementById('runButton').addEventListener('click', () => runCode(false));

document.getElementById('resetViewButton').addEventListener('click', () => {
  infCanvas.viewBox.transformation = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
  updateCursorOverlay();
});

//Menú de configuración
const dropBtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');

dropBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownContent.classList.toggle('show');
});

window.addEventListener('click', () => {
  dropdownContent.classList.remove('show');
});

dropdownContent.addEventListener('click', (e) => {
  e.stopPropagation();
});

const autoRunCheckbox = document.getElementById('autoRunCheckbox');
const canvasColorPicker = document.getElementById('canvasColorPicker');
const showCursorCheckbox = document.getElementById('showCursorCheckbox');

const savedShowCursor = localStorage.getItem('showCursor');
if (savedShowCursor !== null) {
  showCursorCheckbox.checked = savedShowCursor === 'true';
  cursorOverlay.style.display = showCursorCheckbox.checked ? 'block' : 'none';
}

showCursorCheckbox.addEventListener('change', (e) => {
  localStorage.setItem('showCursor', e.target.checked);
  cursorOverlay.style.display = e.target.checked ? 'block' : 'none';
});

const savedColor = localStorage.getItem('canvasColor');
if (savedColor) {
  canvas.style.backgroundColor = savedColor;
  canvasColorPicker.value = savedColor;
}

const savedAutoRun = localStorage.getItem('autoRun');
if (savedAutoRun !== null) {
  autoRunCheckbox.checked = savedAutoRun === 'true';
}

canvasColorPicker.addEventListener('input', (e) => {
  const color = e.target.value;
  canvas.style.backgroundColor = color;
  localStorage.setItem('canvasColor', color);
});

autoRunCheckbox.addEventListener('change', (e) => {
  localStorage.setItem('autoRun', e.target.checked);
  if (e.target.checked) {
    runCode(true);
  }
});



// Load the initial state from storage
load(ws);

initCanvas();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  if (e.isUiEvent || e.type === Blockly.Events.FINISHED_LOADING) return;
  save(ws);
  
  console.log(autoRunCheckbox.checked)
  if (autoRunCheckbox.checked) {
    runCode(true);
  }
});
