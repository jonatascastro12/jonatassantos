---
title: "Playing virtual instruments live: a keyboard setup guide"
date: "2016-12-13"
legacy: true
revised: "2026-10-16"
description: "Build a keyboard rig for live virtual instruments: hosts, compatibility, audio interfaces, latency, rehearsals, and a backup plan. Revised for 2026."
category: "music"
tags: ["live-performance", "virtual-instruments"]
---

**For:** keyboard players and pianists who want to take virtual instruments onto the stage.

**Revised October 16, 2026.** Originally published in 2016. This revision updates the technical guidance and software options using manufacturers' documentation; it is not a hands-on product comparison.

I started exploring this around 2009, when I owned a **Roland Fantom FA-76** and was becoming interested in music production. A friend from São Paulo introduced me to virtual instruments and samplers, and I gradually tried taking them onto the stage.

It took time to find a setup that suited me. Choosing my sounds was exciting, but there was another side to the work: preparing the computer, organizing controls, and learning to solve problems.

This guide is still intended as a quickstart. **Begin with one reliable sound, play it, and then add complexity.** A good rig is one you can operate while making music.

## The signal path

There are three main elements:

1. **Keyboard:** sends MIDI — notes, velocity, pedal movements, and other commands.
2. **Computer:** runs the host, virtual instruments, and effects.
3. **Audio interface:** converts digital audio into a signal for headphones, monitors, or the mixing desk.

![Original keyboard, computer, and audio-interface diagram](/blog-images/legacy/2016/12/esquema-audio-e1481631692853-1024x678.png)

*The original diagram is in Portuguese: MIDI carries commands to the computer; the audio interface carries the resulting sound onward.*

MIDI is not audio. A USB cable may carry MIDI, audio, or both, depending on the device; a USB port does not mean the keyboard sends its own sound through it. To combine the keyboard's internal sounds with virtual instruments, plan its audio connection as well.

A workstation combines several of these functions in one instrument. Here, we distribute them across devices. We gain flexibility and take responsibility for the connections.

## The keyboard controller

You do not need a dedicated controller if your existing keyboard sends compatible MIDI. USB-MIDI often connects directly; a five-pin MIDI DIN output needs a MIDI input, available on some audio interfaces or a separate MIDI interface.

Choose around your hands and repertoire:

- **Keys and range:** comfortable action, velocity response, and enough keys for your splits.
- **Pedals:** sustain, plus expression if needed. Check compatibility and polarity in the manual.
- **Controls:** buttons for changing sounds and faders or knobs you will actually use.
- **Expression:** pitch bend, modulation, and aftertouch matter when your virtual instrument responds to them.
- **Power and connections:** confirm USB power support and test the hub if you need one.

Try the velocity curve with your virtual piano. A feature-packed controller may be a worse choice than a simpler model with keys that suit your technique.

The models and prices mentioned in 2016 are no longer shopping recommendations: there is no lasting universal budget ceiling. Include pedals, cables, a stand, and transport. For the broader categories, see [the keyboard types guide](/blog/os-tipos-de-teclado-musical-controladores-arranjadores-sintetizadores-workstations-e-pianos-digitais).

## Choose the computer around your set

**It does not have to be a Mac.** It needs headroom for your particular combination of host, plugins, and libraries.

For a purchase, I would prioritize **16 GB of RAM and an SSD** as a starting point, and consider **32 GB or more** for several large libraries loaded together. This is planning advice, not a universal requirement or performance guarantee. A lightweight project may need less; a demanding piano with several layers may need more.

The old “Core i5 + 4 GB + 500 GB hard drive” recommendation is no longer a useful rule. Check the processor model and generation, library memory requirements, free space, cooling, and ports. The [Live system requirements](https://help.ableton.com/hc/en-us/articles/115001663530-Live-Minimum-System-Requirements), for example, specify compatible processors and instructions: the label “i7” alone is not enough.

Allow space for instruments, samples, and backups. If libraries live on an external SSD, that drive and its cable become part of the instrument: they must be connected, with the correct paths available, before opening the show.

### Check compatibility before updating

Check the complete combination: **operating-system version → host → plugin format and architecture → interface driver**. Include installers and license managers.

- **Apple Silicon:** favor native or Universal versions. In native Live, VST2/VST3 plugins need Apple Silicon support; AU can behave differently. Rosetta and bridges depend on the host and operating system and do not guarantee that every old plugin will work. See [Ableton's guidance on Mac plugins](https://help.ableton.com/hc/en-us/articles/4410323149074-Plug-ins-on-Mac-in-Live-11-1-and-later).
- **Windows:** check the computer's architecture. An x64 application, an ARM plugin, and an interface driver are not automatically interchangeable. On a Windows on Arm laptop, obtain compatibility confirmation for every part of the rig.
- **Supported operating system:** a host accepting Windows 10 does not mean the OS still receives regular support. Standard Windows 10 support ended on October 14, 2025; extended updates and special editions have their own terms. Plan migration around your performance schedule. [Microsoft's support lifecycle](https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025).

Back up and leave time to rehearse after an update. The night before a show is a poor time to discover that a library no longer opens.

## Hosts, DAWs, and virtual instruments

A **host** loads plugins and manages MIDI, effects, and outputs. A **DAW** can do this alongside recording, editing, and sequencing. You do not necessarily need a full DAW to play piano and pad.

### Which host should you choose?

These options serve different needs; this is not a ranking. Check the requirements of the version and features of the edition before purchasing.

| Host | System and formats |
| --- | --- |
| MainStage | macOS; built-in instruments and Audio Units (AU). Does not load VST directly. |
| Gig Performer | Windows and macOS; VST2/VST3, plus AU on Mac. |
| Cantabile | Windows; VST2/VST3. |
| Ableton Live | Windows and macOS; VST2/VST3, plus AU on Mac. |

- **[MainStage](https://apps.apple.com/us/app/mainstage/id634159523):** for organizing patches, splits, and layers on a Mac, with an included instrument collection.
- **[Gig Performer](https://gigperformer.com/):** for connecting plugins visually and organizing sounds, songs, and setlists. Check edition differences.
- **[Cantabile](https://www.cantabilesoftware.com/compare):** for a keyboard rig with MIDI routing and controls. Lite is a starting point; Solo adds setlists, while Performer adds states and shared racks.
- **[Ableton Live](https://www.ableton.com/en/live/):** for combining clips, scenes, loops, backing tracks, and production in one environment.

For installation, see [Cantabile's requirements](https://www.cantabilesoftware.com/guides/installation), [Gig Performer downloads](https://gigperformer.com/download), and [Live's supported formats](https://help.ableton.com/hc/en-us/articles/5937501570460-Supported-Plug-in-Formats). Each plugin's requirements also matter.

**Check the MainStage edition:** when consulted for this revision, the separate-purchase listing above requires macOS 15.6 or later. The [MainStage: Perform Live offering in Apple Creator Studio](https://apps.apple.com/us/app/mainstage-perform-live/id6746637089) also requires an Apple M1 chip or later. Check the listing for the edition you intend to install, especially on an Intel Mac; a working older version does not establish compatibility with the current one.

Brainspawn Forte, mentioned in 2016, remains a historical reference outside this current selection. If another DAW already works well for you, assess what your workflow lacks before switching: sound changes, accessible controls, and quick recovery matter more than the application's category.

### VST3, AU, and Kontakt are different things

**VST2, VST3, and AU are plugin formats.** An instrument may come in several formats. “VSTi” generally refers to an instrument, while other plugins process audio as effects. For a new rig, choose a current format supported by both vendor and host — usually VST3, or AU in MainStage. Save a project copy before changing formats: do not assume presets and automation will transfer automatically.

**Kontakt is a platform for sample-based instruments.** A library is content loaded inside it; installing Kontakt does not install every sound. Kontakt 8 offers VST3, AU on Mac, and AAX, as well as standalone operation; it does not offer VST2. Check [Kontakt's formats and requirements](https://www.native-instruments.com/products/kontakt).

Before buying a library, check whether it supports the **free Kontakt Player** or requires **full Kontakt**, and which minimum version it needs. Instruments requiring the full version may enter a time-limited demo in Player. You need to discover that before reaching the stage. [Official Kontakt Player comparison](https://www.native-instruments.com/products/kontakt-player).

Choose a small collection that covers your set. A prepared piano, electric piano, organ, and pad can be more useful than dozens of unfamiliar libraries.

## The audio interface

Built-in audio still uses an interface, inside the computer. An external interface often offers connections better suited to stage use, physical controls, and driver and routing options. It cannot fix CPU or plugin problems by itself.

Prioritize:

- Drivers and firmware compatible with your operating system, with manufacturer support.
- Suitable line outputs for the mixing desk, preferably balanced, and headphone controls.
- Enough **independent outputs**: stereo for the PA plus a separate click needs at least three output channels; interfaces with four line outputs make this easier. A headphone socket that merely mirrors the main pair will not solve it.
- Cables, power supplies, and adapters you can set up securely.

On Windows, start with the **manufacturer's ASIO driver**. On macOS, use **Core Audio** and install a driver if the manufacturer requires it. ASIO4ALL can be an alternative for devices without their own ASIO driver; it does not replace physical hardware or guarantee low latency. [Ableton's interface setup guide](https://help.ableton.com/hc/en-us/articles/211476789-Setting-up-an-Audio-Interface).

USB-C describes a connector, not a latency measurement. USB 3 or Thunderbolt does not guarantee faster response than a good USB 2 interface either. The old advice to prioritize FireWire has been removed. Choose based on compatibility and the complete rig's performance.

Agree on outputs, cables, and any DI requirements with the sound engineer. Confirm whether the PA will receive mono or stereo and audition your sounds that way. Keep the click out of the audience outputs.

## Latency: responsive playing without crackles

Latency is the delay between playing and hearing. The host's number may describe input, output, or audio round-trip latency; it does not necessarily describe the full delay from keypress to monitoring. A MIDI-controlled virtual instrument does not use the same audio-input path as a microphone processed through the computer.

A calculation illustrates the scale: **128 samples ÷ 48,000 samples per second ≈ 2.67 ms per buffer**. That does not mean 2.67 ms total latency: other stages remain. “Below 5 ms” should therefore not be an absolute rule. [How latency works](https://help.ableton.com/hc/en-us/articles/360010545559-How-Latency-Works).

My starting point for testing would be **44.1 or 48 kHz with a 128- or 256-sample buffer**, depending on the hardware. These are initial rehearsal settings, not guaranteed results. Play the busiest passage with sustain, layers, and effects; adjust until the response feels comfortable without interruptions.

Smaller buffers reduce waiting but require more frequent processing. Higher sample rates also increase load and are not automatically the best stage choice. Effects using *lookahead* and other processing can add delay. Avoid Bluetooth in the instrument's monitoring path. [Guidance on reducing latency](https://help.ableton.com/hc/en-us/articles/209072289-How-to-reduce-latency).

The interface's **direct monitoring** routes a physical input to monitoring without passing through the host. It does not eliminate the processing needed for a virtual piano to generate sound. [Direct monitoring and latency](https://help.ableton.com/hc/en-us/articles/360011924559-How-to-reduce-latency-while-monitoring).

## Build your first show in seven steps

1. **Make one sound work.** Connect the keyboard and interface, select MIDI and audio ports, load a piano, and check MIDI channel, sustain, and output. Save and reopen the project.
2. **Build the combinations you need.** Try a piano-and-pad layer and a bass-and-piano split. Adjust ranges, octaves, and velocity. Check whether sustain should affect every layer. See [how to layer sounds](/blog/como-misturar-varios-timbres-no-teclado).
3. **Arrange the set.** Name patches by song and section. Map next, previous, volume, and an emergency command (*panic*, for stuck notes). Test exactly what each command stops.
4. **Rehearse transitions.** Change patches while holding notes and sustain; listen for cutoffs, reverb tails, and volume jumps. Preloading can help but uses memory. Do not assume seamless transitions just because a host offers the feature.
5. **Balance levels in context.** Compare piano, organ, synth, and layered patches with the band. Leave headroom before clipping. If using click or backing tracks, test each output's routing separately.
6. **Rehearse the actual show.** Use the same controller, pedals, interface, cables, and power arrangement for the entire set. Test a cold start and, if you intend to perform without a network, open everything offline to check samples and licenses.
7. **Prepare and rehearse a fallback.** A keyboard's internal sound, module, or second system only provides backup if its audio path is ready. Learn to mute the faulty signal and continue playing; a file backup alone cannot replace an instrument mid-song.

## Before leaving and at soundcheck

- Back up the project, presets, and MIDI mappings; record the versions that worked. Confirm libraries and authorizations are available on the backup computer, if you have one.
- Close unnecessary applications, pause heavy synchronization, and schedule updates outside performance hours. Prevent sleep during use. Disconnecting the network is optional: first check whether remote control or licensing depends on it.
- Carry spare power supplies and cables, label connections, and keep the computer ventilated and protected from knocks. Use the hub and drive arrangement you rehearsed.
- At low volume, check MIDI, audio, pedals, monitoring, patch changes, and your fallback. Then test the most demanding patch at the level agreed with the engineer.

When something fails, follow the signal path:

| Symptom | First check |
| --- | --- |
| No sound | Is MIDI reaching the host? Is the instrument loaded on the correct channel? Is there meter activity and a route to the right output? |
| Crackles or dropouts | Increase the buffer to compare; check audio load, SSD access, power, and connections. Isolate one plugin at a time. |
| Stuck notes | Use the panic command you rehearsed and check sustain, channels, and MIDI messages. Mute the output before restarting the host if necessary. |
| Missing plugin or demo mode | Check format, architecture, version, installation, and licensing. Use your fallback sound if there is no time to fix it. |

For more detailed troubleshooting, see [Ableton's crackles and dropouts guide](https://help.ableton.com/hc/en-us/articles/209070329-How-to-avoid-crackles-and-audio-dropouts).

## Is it worth it?

The main benefit is still flexibility: choosing sounds, creating layers, and adapting the instrument to your set. Cost depends on what you own and need to purchase; there is no guaranteed 50% saving. Polyphony also has limits imposed by voice counts, processing, memory, and disk access.

That flexibility brings responsibility for setup, compatibility, licenses, and recovery. Expensive equipment alone does not guarantee stability.

My suggestion is to start small. Prepare one sound, understand [MIDI](/blog/descomplicando-midi), rehearse a full set, and expand from there. Finding sounds is time well spent; learning to keep the music going matters just as much.
