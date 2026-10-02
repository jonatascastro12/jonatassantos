---
title: "MIDI explained: connections, messages, channels, and controls"
date: "2016-12-21"
description: "Understand MIDI 1.0, note messages, velocity, pitch bend, control changes, and practical routing."
legacy: true
revised: "2026-10-01"
category: "music"
tags: ["midi", "keyboards"]
---

If you have explored the back panel or settings of a keyboard, you have probably seen **MIDI**. Understanding it makes it much easier to connect instruments, configure a DAW, and control virtual sounds.

MIDI stands for **Musical Instrument Digital Interface**. It is a communication protocol: one device sends performance instructions, and another interprets them.

**MIDI is not audio.** A message can describe a note, a pedal movement, or a change of sound. The receiving instrument produces the audio.

## Why learn MIDI?

It helps you:

1. Configure and program keyboards.
2. Set up MIDI tracks in a DAW.
3. Enter notes into notation software.
4. Play and control virtual instruments.
5. Connect multiple keyboards.
6. Use a controller with a sound module.
7. Layer sounds across instruments.
8. Record a performance as editable notes.
9. Configure pedals and other controls.
10. Operate other MIDI-compatible equipment.

![MIDI logo](/blog-images/legacy/2016/12/midi-logo-300x170.png)

This introduction describes **MIDI 1.0**, the protocol discussed in the original article. Newer MIDI capabilities are a separate topic.

## Connections and direction

An interface is a way for systems to communicate. A MIDI interface is more than a connector: the device must understand and send or receive MIDI messages.

Common connections include:

- **MIDI IN:** receives messages.
- **MIDI OUT:** sends messages.
- **MIDI THRU:** passes along messages received at IN, when the device provides that function.
- **USB MIDI:** carries MIDI between compatible devices, often a keyboard and a computer.

For a conventional MIDI cable connection, connect **OUT on the sender to IN on the receiver**. Two OUT ports or two IN ports do not form that path.

![Original MIDI connection diagram](/blog-images/legacy/2016/12/esquemas-midi-617x1024.jpg)

The arrows represent the direction of messages. The original diagram is in Portuguese; *transmissão* means transmission and *recepção* means reception.

USB connections depend on device roles and compatibility. A keyboard's USB port does not necessarily let it connect directly to another keyboard; a computer or another compatible USB host may be needed.

## Notes and velocity

**Note On** tells the receiver which note to play and with what velocity. Velocity commonly represents how quickly or forcefully the key was struck, although the sound's response depends on the instrument.

**Note Off** tells it that the note has been released. The sound may continue through its release envelope or because a sustain pedal is held; the message does not always mean immediate silence.

A velocity-sensitive keyboard may offer several response curves. A light curve can make high values easier to reach; a heavier curve may require a stronger touch. Choose the response that lets you control the instrument comfortably.

In a DAW's piano roll, a note's horizontal position shows its timing and its length shows its duration. A velocity lane lets you edit the performance's dynamics.

![Piano-roll example from Studio One](/blog-images/legacy/2016/12/lI5fSBP.gif)

![Piano-roll and velocity example from Ableton Live](/blog-images/legacy/2016/12/fold-piano-roll-1024x640.jpg)

## Pressure and pitch bend

**Aftertouch** describes pressure applied after the initial key press. An instrument can use it for vibrato, brightness, or another expressive parameter. The controller and receiving instrument must support it.

**Pitch bend** changes pitch continuously, often through a wheel or lever. The receiving instrument determines how far the bend moves the sound.

The original post incorrectly described MIDI 1.0 pitch bend as a 0–127 value centered at 64. It is a **14-bit value from 0 to 16,383, centered at 8,192**. This is separate from the usual seven-bit control values. See the [MIDI Association's message summary](https://midi.org/summary-of-midi-1-0-messages).

![Pitch-bend control](/blog-images/legacy/2016/12/synth-solo-pitch-bend-3.jpg)

## Control Change messages

Control Change, usually written **CC**, lets you send values for numbered controls. Common examples include:

- **CC1:** modulation.
- **CC7:** channel volume.
- **CC11:** expression.
- **CC64:** sustain pedal.

What a control does in a particular patch depends on the instrument's implementation. Some controls have standard assignments, while others may be mapped freely.

Use [the MIDI control reference](/blog/tabela-de-controles-midi-em-portugues) for more numbers and their conventional meanings.

Many virtual instruments provide a **MIDI Learn** command. Select the parameter, enable learning, and move the desired knob, fader, or pedal. The instrument can then associate the incoming message with that parameter.

## Match the MIDI channels

MIDI 1.0 provides **16 channels per port**. Channels let different instruments receive different parts of a performance.

You could send piano on channel 1, strings on channel 2, and a drum part on channel 10. The sender's channel and receiver's settings must match unless your software deliberately remaps them.

![Changing an instrument's MIDI input in Kontakt](/blog-images/legacy/2016/12/KB2527_ChangingMIDIPortForInstrument.png)

A host can distribute one incoming channel to several instruments. That is one way to create a piano-and-pad layer. It can also keep two keyboards separate by treating their ports and channels independently.

The original article illustrated a single keyboard feeding multiple instruments, then two keyboards with different routing rules:

![Original software-routing diagrams](/blog-images/legacy/2016/12/esquema-midi-daw-1012x1024.jpg)

*The diagram labels are retained in Portuguese. “Teclado” means keyboard; “canal” means channel.*

![Historical Brainspawn Forte routing example](/blog-images/legacy/2016/12/advmidirouting_zoom73.png)

For more examples, see [five ways to layer keyboard sounds](/blog/como-misturar-varios-timbres-no-teclado).

## Five practical programming tips

### 1. Explore different controllers

Keyboards are only one option. Pads, electronic drums, pedals, and other controllers can send different kinds of performance information.

![Controller examples from the original article](/blog-images/legacy/2016/12/50-best-midi_controllers-1200x627-1024x535.jpg)

### 2. Use MIDI processors thoughtfully

Quantization adjusts note timing. Velocity processors change the distribution of note velocities. Try them on a copy of the performance and listen to whether the result still has the feel you want.

![Quantization example in Logic](/blog-images/legacy/2016/12/6378_6122e77123ee293c22206006164e639c.gif)

### 3. Know the Panic command

A stuck note can occur when a receiver misses a release message or a connection is interrupted. Many hosts provide a **Panic** or reset control. Learn where it is before performing live; implementations vary, so test what it actually resets.

### 4. Adjust the velocity curve

A patch can respond very differently across its velocity range. Try the keyboard's touch settings before concluding that a virtual piano or other instrument sounds unconvincing.

![Velocity-response curves](/blog-images/legacy/2016/12/MIDI_Fig_1-1024x599.jpg)

### 5. Look for keyswitches

Some sampled instruments reserve notes for changing articulations. Those notes might select a bowed, plucked, or legato technique rather than play a normal sound.

Check the library's documentation and keep the keyswitch range in mind when transposing or layering tracks.

![Articulation keys in a Kontakt violin instrument](/blog-images/legacy/2016/12/cp_768_MIDI_Fig_4.jpg)

Start with one controller and one instrument. Once notes, pedals, and channels behave as expected, add the more complex routing.
