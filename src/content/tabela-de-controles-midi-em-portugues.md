---
title: "MIDI Control Change reference: decimal and hexadecimal"
date: "2016-12-20"
description: "A readable reference for common MIDI 1.0 control numbers, pedal assignments, and channel mode messages."
legacy: true
revised: "2026-10-01"
category: "music"
tags: ["midi"]
---

MIDI devices exchange messages about notes, controls, and other performance events. A **Control Change** message identifies a control number and supplies a value, usually from **0 to 127** in MIDI 1.0.

The control number and its value are different things. For example, **CC64** identifies the sustain pedal; its value indicates the pedal's state.

This is a practical selection of conventional MIDI 1.0 assignments, rather than a promise that every instrument implements every control. Check your device's MIDI implementation chart.

For the connection and channel basics, read [MIDI explained](/blog/descomplicando-midi).

## Common controls

| Decimal | Hex | Conventional assignment |
| --- | --- | --- |
| 0 | 00h | Bank Select MSB |
| 1 | 01h | Modulation Wheel |
| 2 | 02h | Breath Controller |
| 4 | 04h | Foot Controller |
| 5 | 05h | Portamento Time |
| 6 | 06h | Data Entry MSB |
| 7 | 07h | Channel Volume |
| 8 | 08h | Balance |
| 10 | 0Ah | Pan |
| 11 | 0Bh | Expression |
| 12 | 0Ch | Effect Control 1 |
| 13 | 0Dh | Effect Control 2 |
| 16–19 | 10h–13h | General Purpose Controllers 1–4 |
| 32–63 | 20h–3Fh | LSB counterparts for controls 0–31 |
| 64 | 40h | Sustain pedal: 0–63 off, 64–127 on |
| 65 | 41h | Portamento on/off |
| 66 | 42h | Sostenuto on/off |
| 67 | 43h | Soft Pedal on/off |
| 68 | 44h | Legato Footswitch |
| 69 | 45h | Hold 2 |
| 70 | 46h | Sound Controller 1: Sound Variation |
| 71 | 47h | Sound Controller 2: Timbre/Harmonic Intensity |
| 72 | 48h | Sound Controller 3: Release Time |
| 73 | 49h | Sound Controller 4: Attack Time |
| 74 | 4Ah | Sound Controller 5: Brightness |
| 75–79 | 4Bh–4Fh | Sound Controllers 6–10 |
| 80–83 | 50h–53h | General Purpose Controllers 5–8 |
| 84 | 54h | Portamento Control |
| 91 | 5Bh | Effects 1 Depth |
| 92 | 5Ch | Effects 2 Depth |
| 93 | 5Dh | Effects 3 Depth |
| 94 | 5Eh | Effects 4 Depth |
| 95 | 5Fh | Effects 5 Depth |
| 96 | 60h | Data Increment |
| 97 | 61h | Data Decrement |
| 98 | 62h | Non-Registered Parameter Number LSB |
| 99 | 63h | Non-Registered Parameter Number MSB |
| 100 | 64h | Registered Parameter Number LSB |
| 101 | 65h | Registered Parameter Number MSB |

MSB means **most significant byte** and LSB means **least significant byte**. Some parameters use two seven-bit data bytes together for greater resolution.

Bank selection may use both CC0 and CC32 before a Program Change message. Sending either one alone is not a universal bank-selection procedure.

## Channel Mode messages

These use the Control Change message format but affect the channel's behavior. Their interpretation can include a required data value; consult the specification and device documentation before sending them.

| Decimal | Hex | Message |
| --- | --- | --- |
| 120 | 78h | All Sound Off |
| 121 | 79h | Reset All Controllers |
| 122 | 7Ah | Local Control |
| 123 | 7Bh | All Notes Off |
| 124 | 7Ch | Omni Mode Off |
| 125 | 7Dh | Omni Mode On |
| 126 | 7Eh | Mono Mode On |
| 127 | 7Fh | Poly Mode On |

**All Notes Off is different from All Sound Off.** A sound may continue through its release or sustain behavior after a note is released.

The original table contained a duplicated LSB label for CC99; it is corrected to MSB here. CC11 and CC120 have also been added to make the reference more useful.

Reference: [MIDI Association — MIDI 1.0 Control Change Messages](https://midi.org/midi-1-0-control-change-messages). The original Portuguese table was adapted from Indiana University's electronic-music reference.
