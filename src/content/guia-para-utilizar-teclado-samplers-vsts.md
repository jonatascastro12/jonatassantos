---
title: "Playing virtual instruments live: a keyboard setup guide"
date: "2016-12-13"
legacy: true
revised: "2026-10-16"
description: "Build a live keyboard rig with Logic, iPad apps, Sunday Keys, current instruments, diagrams, and show preparation. Updated for 2026."
category: "music"
tags: ["live-performance", "virtual-instruments"]
---

**For:** keyboard players and pianists who want to take virtual instruments onto the stage.

**Revised October 16, 2026.** Originally published in 2016. This revision updates the technical guidance and software options using manufacturer documentation and attributed Reddit and forum experiences. It is not a hands-on product comparison or a market-share survey.

I started exploring this around 2009, when I owned a **Roland Fantom FA-76** and was becoming interested in music production. A friend from São Paulo introduced me to virtual instruments and samplers, and I gradually tried taking them onto the stage.

It took time to find a setup that suited me. Choosing my sounds was exciting, but there was another side to the work: preparing the computer, organizing controls, and learning to solve problems.

This guide is still intended as a quickstart. **Begin with one reliable sound, play it, and then add complexity.** A good rig is one you can operate while making music.

## The signal path

There are three main elements:

1. **Keyboard:** sends MIDI — notes, velocity, pedal movements, and other commands.
2. **Computer or iPad:** runs applications, virtual instruments, and effects compatible with the platform.
3. **Audio interface:** converts digital audio into a signal for headphones, monitors, or the mixing desk.

![The keyboard sends MIDI to the computer; the host generates digital audio, which passes through the interface and becomes analog audio for the mixer, PA, and monitors.](/blog-images/legacy/live-keyboard-guide/signal-path.en.svg)

*Figure 1. A computer-based example. From touch to sound: MIDI commands and audio pass through different stages.*

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
| Logic Pro (Mac) | macOS; built-in instruments and Audio Units (AU). Does not load VST directly. |
| Gig Performer | Windows and macOS; VST2/VST3, plus AU on Mac. |
| Cantabile | Windows; VST2/VST3. |
| Ableton Live | Windows and macOS; VST2/VST3, plus AU on Mac. |

- **MainStage** — [Official website ↗](https://www.apple.com/mainstage/): for organizing patches, splits, and layers on a Mac, with an included instrument collection.
- **Logic Pro (Mac)** — [Official website ↗](https://www.apple.com/logic-pro/): for musicians who already produce in Logic and want to play virtual instruments, combine sounds, and use tracks or loops in the same project.
- **Gig Performer** — [Official website ↗](https://gigperformer.com/): for connecting plugins visually and organizing sounds, songs, and setlists. Check edition differences.
- **Cantabile** — [Official website ↗](https://www.cantabilesoftware.com/): for a keyboard rig with MIDI routing and controls. Lite is a starting point; Solo adds setlists, while Performer adds states and shared racks. See the [edition comparison](https://www.cantabilesoftware.com/compare).
- **Ableton Live** — [Official website ↗](https://www.ableton.com/en/live/): for combining clips, scenes, loops, backing tracks, and production in one environment.

For installation, see [Cantabile's requirements](https://www.cantabilesoftware.com/guides/installation), [Gig Performer downloads](https://gigperformer.com/download), and [Live's supported formats](https://help.ableton.com/hc/en-us/articles/5937501570460-Supported-Plug-in-Formats). Each plugin's requirements also matter.

**Check the MainStage edition:** when consulted for this revision, the [separate-purchase listing](https://apps.apple.com/us/app/mainstage/id634159523) requires macOS 15.6 or later. The [MainStage: Perform Live offering in Apple Creator Studio](https://apps.apple.com/us/app/mainstage-perform-live/id6746637089) also requires an Apple M1 chip or later. Check the listing for the edition you intend to install, especially on an Intel Mac; a working older version does not establish compatibility with the current one.

**Using Logic Pro live:** the Mac version supports [Audio Units instruments and effects](https://support.apple.com/guide/logicpro/lgcp22a0dab0/mac). For layers, a [summing stack](https://support.apple.com/guide/logicpro/lgcp9bc4b63d/mac) can group instruments you play together. Prepare tracks and controls before rehearsal, and test sound changes while holding notes and sustain. Logic follows a DAW workflow; MainStage offers an organization built around stage patches. Choose according to how you run the show.

In Logic, **Low Latency Monitoring Mode** can bypass plugins and sends affecting the monitored signal path to reduce delay. This can change your sound or remove a reverb from monitoring: check the result before performing. Apple explains the behavior in its [Logic latency documentation](https://support.apple.com/guide/logicpro/lgcpe11997ba/mac).

Brainspawn Forte, mentioned in 2016, remains a historical reference outside this current selection. If another DAW already works well for you, assess what your workflow lacks before switching: sound changes, accessible controls, and quick recovery matter more than the application's category.

### VST3, AU, and Kontakt are different things

**VST2, VST3, and AU are plugin formats.** An instrument may come in several formats. “VSTi” generally refers to an instrument, while other plugins process audio as effects. For a new rig, choose a current format supported by both vendor and host — usually VST3, or AU in MainStage and Logic Pro. Save a project copy before changing formats: do not assume presets and automation will transfer automatically.

**Kontakt is a platform for sample-based instruments.** A library is content loaded inside it; installing Kontakt does not install every sound. Kontakt 8 offers VST3, AU on Mac, and AAX, as well as standalone operation; it does not offer VST2. Check [Kontakt's formats and requirements](https://www.native-instruments.com/products/kontakt).

Before buying a library, check whether it supports the **free Kontakt Player** or requires **full Kontakt**, and which minimum version it needs. Instruments requiring the full version may enter a time-limited demo in Player. You need to discover that before reaching the stage. [Official Kontakt Player comparison](https://www.native-instruments.com/products/kontakt-player).

Choose a small collection that covers your set. A prepared piano, electric piano, organ, and pad can be more useful than dozens of unfamiliar libraries.

## iPad on stage: Sunday Keys and other options

An iPad can also be the instrument in your rig, receiving MIDI and generating audio. Its ecosystem is different: look for the instrument's iPad version and the host's **AUv3** support. A Windows or Mac VST3 installer does not become an iPad app, even when the devices use processors from the same family. The [Camelot documentation for iPad](https://kb.audiomodeling.com/support/solutions/articles/206000050981-on-ipad-why-are-some-music-apps-not-displayed-in-the-plugin-list-) explains this format distinction.

| Application | When to try it |
| --- | --- |
| [Sunday Keys](https://sundaysounds.com/pages/sunday-keys-app) | Pianos, pads, layers, and setlists prepared for worship music; an app for iPad and Mac. |
| [Camelot Pro](https://audiomodeling.com/products/camelot/) | Organizing songs and scenes, combining virtual instruments with hardware keyboards, backing tracks, and scores. Also available for Mac and Windows. |
| [AUM](https://www.kymatica.com/apps/aum) | Building an AUv3 instrument/effect mixer with MIDI routing, buses, and outputs. You assemble your rig's workflow. |
| [Loopy Pro](https://loopypro.com/) | Playing and recording audio and MIDI loops, launching clips, and building a control surface around your performance. |

**Sunday Keys, by Sunday Sounds**, is worth investigating for worship keys. Its [official 2026 walkthrough](https://sundaysounds.com/blogs/news/the-complete-sunday-keys-app-walkthrough-2026) covers patch creation, Tonic Pad, snapshots, and AI Patch Builder. Snapshots store settings within a patch to prepare different moments in a song; the assisted generator can provide a starting point, but levels, transitions, and controls still need rehearsal. The brand also sells resources for MainStage and Ableton: check the format you are buying.

According to the [current plugin-hosting manual](https://support.sundaysounds.com/article/3193-hosting-auv3-au-instrument-plugins), Sunday Keys hosts **AUv3 instruments on iPad and AU/AUv3 instruments on Mac**, with an active license. This feature does not include hosting third-party audio or MIDI effect plugins. Also check renewal terms and what remains available if the license expires.

To choose among the other three, consider your main task. In Camelot, that will often be repertoire organization and scene changes; in AUM, connections and mixing; in Loopy Pro, loops, clips, and custom controls. These are starting points for trying them, not absolute limits. The [Loopy Pro manual](https://loopypro.com/manual/) describes current features, including MIDI clips; older comparisons may refer to an earlier version.

For sounds, [KORG Module](https://www.korg.com/us/products/software/korg_module/) provides keyboard instruments and supports AUv3; check which expansions unlock the features you want, such as layers and splits. [Pianoteq for iOS](https://www.modartt.com/user_manual?product=pianoteq) takes another approach: physically modeled piano, available standalone or as AUv3.

**Assemble and test the complete rig:** iPad, MIDI controller, iPadOS-compatible interface, and a hub/adapter that provides the necessary power. Check battery charging during use, pedal access, PA and monitor outputs, project reopening, and offline operation. A compact device does not remove the need for cables, licenses, or a fallback.

## New tools for production and show preparation

This selection was checked on **October 16, 2026**. It combines developments from 2025–2026 with established tools that remain relevant; it is not a list of this month's releases.

- **[Ableton Live 12.4](https://www.ableton.com/en/blog/live-12-4-is-out-now/):** introduced Link Audio for streaming audio between compatible devices on a local network. It also refined stem separation, available in Live 12 Suite. These features can help prepare rehearsal material and rearrangements; listen to the separation results and export anything necessary before taking the project on stage. Link Audio requires specific compatibility beyond the traditional Link tempo synchronization.
- **[Bitwig Studio 6](https://www.bitwig.com/stories/on-another-level-bitwig-studio-6-is-out-now-416/):** added automation clips and aliases, allowing material to be reused while retaining a connection to the original. It is an option for electronic production and clip-based performances. Its [plugin formats](https://www.bitwig.com/modern-foundations/) include VST2, VST3, and CLAP on Windows, macOS, and Linux; also check each plugin's version for your operating system.
- **[Steinberg VST Live 3](https://www.steinberg.net/vst-live/):** extends show organization to instruments, backing tracks, lyrics/chords, video, and lighting. Investigate it when you need to synchronize several elements of a performance. If you only need piano and pad, compare the preparation involved with that of a simpler host.

### Instruments to explore without buying everything

These products generate sounds; they do not, by themselves, replace the host that organizes a show. Choose according to what your repertoire lacks, and test the edition compatible with your system.

- **[Serum 2](https://xferrecords.com/products/serum-2):** expands wavetable synthesis with sample playback, granular, and spectral synthesis. Explore it for designing your own basses, leads, and textures.
- **[Pigments 7](https://www.arturia.com/products/software-instruments/pigments/update):** updates the performance page, filters, effects, and modulation visualization. Arturia reports CPU optimizations; you still need to measure your patch on your computer.
- **[Omnisphere 3](https://www.spectrasonics.net/products/omnisphere/overview.php):** combines a large library with synthesis, new global controls, and per-note expression through MPE. Consider it when exploring textures and layered sounds; account for disk space, loading time, and how much editing you want to do.
- **[Pianoteq 9](https://www.modartt.com/pianoteq_overview):** uses physical modeling instead of a large sample library. Compare its touch response and piano character with sampled alternatives; a small disk footprint does not mean it uses no CPU.
- **[Surge XT](https://surge-synthesizer.github.io/):** a free, open-source option for learning synthesis and building sounds. It is an established alternative for starting without buying another instrument.

Before buying, also check the instruments and effects already included in your DAW. In the studio, you can edit and render parts; on stage, a patch must respond within the latency, control, and processing constraints of the show.

## What comes up on Reddit and the forums

The research included user experiences alongside manufacturer pages. These threads illustrate choices and difficulties in specific rigs; they do not measure market share or prove a product will be stable on every device.

- **Controlling an iPad show:** a [2026 r/ipadmusic discussion](https://www.reddit.com/r/ipadmusic/comments/1t3fw3r/what_are_people_using_to_control_live_shows_on/) includes examples of Loopy Pro mapped to hardware controllers and AUM combined with Loopy Pro. In the [Loopy Pro forum in October 2025](https://forum.loopypro.com/discussion/66429/daw-i-can-use-for-live-work-with-a-playlist-function), musicians discuss playlists, project transitions, and the effort needed to learn the workflow. The useful question is: can I get through a whole song without hunting for an on-screen button?
- **Designing sounds or starting from presets:** in the [June 2026 Serum 2 versus Omnisphere 3 discussion on r/musicproduction](https://www.reddit.com/r/musicproduction/comments/1ujoa38/if_you_had_to_pick_one_serum_2_or_omnisphere_3/), preferences vary with sound editing, library content, style, and budget. Use this to choose what to audition; there is no universal winner.
- **Stability depends on the complete rig:** an [April 2026 Steinberg forum thread](https://forums.steinberg.net/t/how-stable-is-vst-live-in-2026-for-real-live-use/1029440) includes successful VST Live performances as well as difficulties during preparation and rehearsal. These experiences concern the versions and equipment used then, not every current release. The practical takeaway is to rehearse the complete set and keep the version that worked.

My suggestion is to choose **one task** to explore: worship piano and pad in Sunday Keys; repertoire with scenes and hardware in Camelot; routing in AUM; loops in Loopy Pro; or production with clips in Live or Bitwig. Compare only two options at a time, using the same song, controller, and audio output.

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

![Two stereo mixes: instruments and backing tracks use outputs 1/2 for the PA; instruments and click use outputs 3/4 for a headphone amp or in-ear system for the performers.](/blog-images/legacy/live-keyboard-guide/output-routing.en.svg)

*Figure 2. An example with four independent outputs. Build one mix for the audience and another for monitoring in the host, including the instruments performers need to hear. Line outputs feed monitoring equipment; do not connect headphones directly to them.*

## Latency: responsive playing without crackles

Latency is the delay between playing and hearing. The host's number may describe input, output, or audio round-trip latency; it does not necessarily describe the full delay from keypress to monitoring. A MIDI-controlled virtual instrument does not use the same audio-input path as a microphone processed through the computer.

A calculation illustrates the scale: **128 samples ÷ 48,000 samples per second ≈ 2.67 ms per buffer**. That does not mean 2.67 ms total latency: other stages remain. “Below 5 ms” should therefore not be an absolute rule. [How latency works](https://help.ableton.com/hc/en-us/articles/360010545559-How-Latency-Works).

My starting point for testing would be **44.1 or 48 kHz with a 128- or 256-sample buffer**, depending on the hardware. These are initial rehearsal settings, not guaranteed results. Play the busiest passage with sustain, layers, and effects; adjust until the response feels comfortable without interruptions.

Smaller buffers reduce waiting but require more frequent processing. Higher sample rates also increase load and are not automatically the best stage choice. Effects using *lookahead* and other processing can add delay. Avoid Bluetooth in the instrument's monitoring path. [Guidance on reducing latency](https://help.ableton.com/hc/en-us/articles/209072289-How-to-reduce-latency).

The interface's **direct monitoring** routes a physical input to monitoring without passing through the host. It does not eliminate the processing needed for a virtual piano to generate sound. [Direct monitoring and latency](https://help.ableton.com/hc/en-us/articles/360011924559-How-to-reduce-latency-while-monitoring).

## Build your first show in seven steps

![A split places bass on the left and piano on the right. A layer places piano and pad across the same range so they play together.](/blog-images/legacy/live-keyboard-guide/split-layer.en.svg)

*Figure 3. In a split, the key range selects the instrument; in a layer, one note can trigger more than one sound. The ranges are illustrative: adjust them to your set.*

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
