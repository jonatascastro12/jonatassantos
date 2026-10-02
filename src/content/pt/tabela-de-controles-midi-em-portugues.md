---
title: "Tabela de controles MIDI em português"
date: "2016-12-20"
legacy: true
description: "Artigo do arquivo original: Tabela de controles MIDI em português"
category: "music"
tags: ["midi"]
---

**MIDI** é o acrônimo de Musical Instrument Digital Interface que significa, do inglês, Interface Digital para Instrumentos Musicais. Trata-se de um protocolo desenvolvido nos anos 1980, que permite a comunicação entre instrumentos musicais eletrônicos, bem como, outros equipamentos digitais que possuam essa interface.

O protocolo funciona através de uma troca de **mensagens** entre dispositivos. As mensagens são enviadas e recebidas eletronicamente através de *bits*. Elas são interpretadas pelos instrumentos musicais para produzirem sons de acordo com o que é solicitado.

Entre essas mensagens, estão as mensagens de controle. [Para saber mais sobre MIDI clique aqui.](/pt/blog/descomplicando-midi)

Essa tabela representa um resumo dos **códigos de controles MIDI padrão** em decimal e hexadecimal.

| **Decimal** | **Hex** | **Nome do Controle** |
| --- | --- | --- |
| 0 | 00h | Seleção de banco (Controle #32 é mais utilizado) |
| 1 | 01h | Roda de modulação (Modulation Wheel) |
| 2 | 02h | Controle de sopro (Breath Contoller) |
| 4 | 04h | Pedal de controle (Foot Controller) |
| 5 | 05h | Portamento Time (Tempo do Portamento) |
| 6 | 06h | Entrada de dado MSB – bit mais significativo *(Data Entry MSB)* |
| 7 | 07h | Volume Principal *(Main Volume)* |
| 8 | 08h | Balanço *(Balance)* |
| 10 | 0Ah | Pan |
| 12 | 0Ch | Efeito de Controle 1 *(Effect Control 1)* |
| 13 | 0Dh | Efeito de Controle 2 *(Effect Control 2)* |
| 16-19 | 10-13h | Controles de uso geral *(General Purpose Controllers (Nos. 1-4))* |
| 32-63 | 20-3Fh | LSB for Controllers 0-31 (rarely implemented) |
| 64 | 40h | Pedal de sustentação *(Damper (Sustain) [Data Byte of 0-63=0ff, 64-127=On])* |
| 65 | 41h | Portamento |
| 66 | 42h | Sostenuto |
| 67 | 43h | Soft Pedal |
| 68 | 44h | Pedal de Legato *(Legato Footswitch)* |
| 69 | 45h | Hold 2 |
| 70 | 46h | Sound Controller 1 (default: Sound Variation) |
| 71 | 47h | Sound Controller 2 (default: Timbre/Harmonic Content) |
| 72 | 48h | Sound Controller 3 (default: Release Time) |
| 73 | 49h | Sound Controller 4 (default: Attack Time) |
| 74 | 4Ah | Sound Controller 5 (default: Brightness) |
| 75-79 | 4B-4Fh | Sound Controller 6-10 (no defaults) |
| 80-83 | 50-53h | General Purpose Controllers (Nos. 5-8) |
| 84 | 54h | Controle de Portamento *(Portamento Control)* |
| 91 | 5Bh | Effects 1 Depth (previously External Effects Depth) |
| 92 | 5Ch | Effects 2 Depth (previously Tremolo Depth) |
| 93 | 5Dh | Effects 3 Depth (previously Chorus Depth) |
| 94 | 5Eh | Effects 4 Depth (previously Detune Depth) |
| 95 | 5Fh | Effects 5 Depth (previously Phaser Depth) |
| 96 | 60h | Data Increment |
| 97 | 61h | Data Decrement |
| 98 | 62h | Non-Registered Parameter Number LSB |
| 99 | 63h | Non-Registered Parameter Number MSB |
| 100 | 64h | Registered Parameter Number LSB |
| 101 | 65h | Registered Parameter Number MSB |
| **Mensagens de modo de canal** | | |
| 121 | 79h | Reset All Controllers |
| 122 | 7Ah | Local Control |
| 123 | 7Bh | All Notes Off |
| 124 | 7Ch | Omni Off |
| 125 | 7Dh | Omni On |
| 126 | 7Eh | Mono On (Poly Off) |
| 127 | 7Fh | Poly On (Mono Off) |

Adaptado de http://www.indiana.edu/~emusic/cntrlnumb.html

_Nota editorial: o rótulo do CC99 foi corrigido de LSB para MSB. Consulte a [referência da MIDI Association](https://midi.org/midi-1-0-control-change-messages) para a especificação completa._
