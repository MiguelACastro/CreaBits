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

installColourBlocks({
  javascript: javascriptGenerator
});
Object.assign(javascriptGenerator.forBlock, forBlock);

Blockly.setLocale(Es);

// Set up UI elements and inject Blockly
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {toolbox});

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
const runCode = () => {
  const preamble = `
const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

ctx.reset();
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.lineWidth = 2;
ctx.strokeStyle = "#000000";

const cursor = {
    x: 0,
    y: 0,
    angulo: 0,
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
    ctx.reset();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    cursor.x = 0;
    cursor.y = 0;
    cursor.angulo = 0;
}

function repite(n, ...bloque) {
    for (let i = 0; i < n; i++) {
        bloque.forEach(funcion => {
            funcion();
        });
    }
}

function si(condicion, ...bloque) {
    if (condicion) {
        bloque.forEach(funcion => {
            funcion();
        });
    }
}
`
  let code = javascriptGenerator.workspaceToCode(ws);
  console.log(code)
  code = preamble + code;

  eval(code);
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
