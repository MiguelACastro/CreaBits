/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/*
Este toolbox ha sido simplificado para contener solo los bloques esenciales
para dibujar en el canvas, eliminando bloques abstractos o innecesarios.
*/

export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Acciones',
      categorystyle: 'colour_category',
      contents: [
        {
          kind: 'block',
          type: 'avanza',
          inputs: {
            DISTANCIA: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 100,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'gira',
          inputs: {
            ANGULO: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 90,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'salta',
          inputs: {
            DISTANCIA: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 100,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'ir_a',
          inputs: {
            X: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
            Y: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'grosor',
          inputs: {
            GROSOR: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 2,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'pinta',
          inputs: {
            COLOR: {
              shadow: {
                type: 'colour_picker',
                fields: {
                  COLOUR: '#000000',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'colour_picker'
        },
        {
          kind: 'block',
          type: 'colour_random'
        },
        {
          kind: 'block',
          type: 'circulo',
          inputs: {
            RADIO: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 50,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'limpiar'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Lógica',
      categorystyle: 'logic_category',
      contents: [
        {
          kind: 'block',
          type: 'controls_if',
        },
        {
          kind: 'block',
          type: 'logic_compare',
        },
        {
          kind: 'block',
          type: 'logic_operation',
        },
        {
          kind: 'block',
          type: 'logic_negate',
        },
        {
          kind: 'block',
          type: 'logic_boolean',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Bucles',
      categorystyle: 'loop_category',
      contents: [
        {
          kind: 'block',
          type: 'controls_repeat_ext',
          inputs: {
            TIMES: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 10,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'controls_for',
          inputs: {
            FROM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
            TO: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 10,
                },
              },
            },
            BY: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: 'category',
      name: 'Matemáticas',
      categorystyle: 'math_category',
      contents: [
        {
          kind: 'block',
          type: 'math_number',
          fields: {
            NUM: 123,
          },
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
          inputs: {
            A: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
            B: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_modulo',
          inputs: {
            DIVIDEND: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 64,
                },
              },
            },
            DIVISOR: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 10,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_random_int',
          inputs: {
            FROM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
            TO: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 100,
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: 'sep',
    },
    {
      kind: 'category',
      name: 'Estado',
      categorystyle: 'math_category',
      contents: [
        {
          kind: 'block',
          type: 'pos_x'
        },
        {
          kind: 'block',
          type: 'pos_y'
        },
        {
          kind: 'block',
          type: 'angulo'
        },
        {
          kind: 'block',
          type: 'limite_izq'
        },
        {
          kind: 'block',
          type: 'limite_der'
        },
        {
          kind: 'block',
          type: 'limite_sup'
        },
        {
          kind: 'block',
          type: 'limite_inf'
        }
      ]
    },
    {
      kind: 'category',
      name: 'Variables',
      categorystyle: 'variable_category',
      custom: 'VARIABLE',
    },
    {
      kind: 'category',
      name: 'Funciones',
      categorystyle: 'procedure_category',
      custom: 'PROCEDURE',
    },
  ],
};
