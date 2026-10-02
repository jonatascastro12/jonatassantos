---
title: "Descomplicando MIDI – interface digital para instrumentos musicais"
date: "2016-12-21"
legacy: true
description: "Artigo do arquivo original: Descomplicando MIDI – interface digital para instrumentos musicais"
category: "music"
tags: ["midi", "keyboards"]
---

Se você já “fuçou” qualquer teclado, é bem provável que você tenha visto o nome **MIDI**. Pretendo, com essa postagem memorável, explicar “o que é” e para quê serve esse tal de MIDI.

## **10 motivos para você entender sobre MIDI**

1. Para saber configurar e programar teclados musicais;
2. Para saber **configurar DAWs** *(Digital Audio Workstation)*;
3. Para configurar programas de notação musical;
4. Para saber configurar VSTi’s;
5. Para fazer conexões entre mais de um teclado;
6. Para ligar o teclado controlador em um módulo;
7. Para misturar timbres entre **teclados sintetizadores e workstations**;
8. Para gravar em **teclados workstations**;
9. Para configurar pedais de controle;
10. Para controlar equipamentos diversos com interface MIDI.

Se pelo menos um dos motivos acima é de seu interesse, eu recomendo muito que você continue a leitura. Se você tiver alguma dúvida ou sugestão, ao final deste artigo, **deixe um comentário**.

Você vai ver que o **MIDI** vai estar ligado a uma série de outros conceitos importantes que também pretendo introduzir a você, caro leitor.

## O que é MIDI?

![Logotipo oficial do padrão MIDI](/blog-images/legacy/2016/12/midi-logo-300x170.png)

Logotipo oficial do padrão

**MIDI** é o acrônimo de *Musical Instrument Digital Interface* que significa, do inglês, **Interface Digital para Instrumentos Musicais**. Trata-se de um protocolo desenvolvido nos anos 1980, que permite a **comunicação entre instrumentos musicais eletrônicos**, bem como, outros equipamentos digitais que possuam essa interface. O MIDI em si não produz som algum. O que o MIDI faz é enviar uma série de mensagens como *“ligou a nota”, “desligou a nota”, “tocou a nota muito forte”, “tocou a nota muito fraco”, “pisou no pedal”, “soltou o pedal”, “aumentou o volume”…*

> O que o MIDI faz é enviar uma série de mensagens como *“ligou a nota”, “desligou a nota”, “tocou a nota muito forte”, “tocou a nota muito fraco”, “pisou no pedal”, “soltou o pedal”, “aumentou o volume”…*

Essas mensagens são enviadas e recebidas eletronicamente através de *bits*. Elas são interpretadas pelos instrumentos musicais para produzirem sons de acordo com o que é solicitado. Vamos ver com mais detalhes sobre essas mensagens.

![Animação de uma sequência MIDI](/blog-images/legacy/2016/12/midi-gif.gif)\

## Interface MIDI

Antes de prosseguir com as mensagens MIDI, vale entender sobre **interface MIDI.**Quero te explicar o conceito de **interface.** Esse conceito serve para qualquer coisa relacionada a equipamentos digitais e eletrônicos, por exemplo, interface de áudio, interface de vídeo ou interface MIDI.

**O que é interface?** Interface é o meio pelo qual dois ambientes se comunicam. O exemplo mais comum de interface, é a tomada elétrica. Esta é a forma como os equipamentos se conectam a rede de energia elétrica.

A tomada elétrica: exemplo de interface

Interface não se trata apenas dos conectores, mas trata-se da **capacidade de interpretar os sinais entre os ambientes**.

Então, quando dizemos que um dispositivo possui **interface MIDI**, significa que ele “entende” MIDI, logo, é capaz de receber e/ou transmitir informações no formato do protocolo MIDI.

Atualmente, os equipamentos musicais digitais (teclados, na maioria das vezes) que possuem interface MIDI, podem prover as seguintes conexões:

* **IN** (Entrada)
* **OUT** (Saída)
* **THRU**(Saída: Envia o que é recebido de **IN**)
* **USB** (Entrada e saída são disponibilizados via *d**river* no computador)

Conexões MIDI

Para interligar equipamentos MIDI, você deve respeitar o fluxo de mensagens, isto é, “quem envia” e “quem recebe”. Não faz sentido ligar ~~**MIDI OUT x MIDI OUT**~~, ou ~~**MIDI IN x MIDI IN**~~. Seguem alguns exemplos possíveis:

![Diagrama de conexões MIDI](/blog-images/legacy/2016/12/esquemas-midi-617x1024.jpg)

Olhando as setas na figura, é possível identificar o fluxo das informações transmitidas e/ou recebidas. Quando você tem o fluxo OUT -> IN, as informações estão sendo **transmitidas (TX)**. Quando você tem o fluxo IN -> OUT, as informações estão sendo **recebidas (RX)**.

## Mensagens MIDI

Essa é a parte mais importante, entender como são as mensagens MIDI. Vamos passar por cada tipo de mensagem.

### *Note on*

Quando você toca uma tecla, essa mensagem é disparada. Ela consiste em duas partes:

* ***note***– qual tecla que é pressionada (Ex: C3)
* ***velocity*** – a força que foi utilizada, que vai de 0 a 127

A maioria dos teclados musicais que possuem teclas sensitivas possibilitam configurar a **“curva de *velocity*“**. Trata-se da forma que o teclado responde a ação das teclas.

Se a curva for “leve”, significa que mesmo se eu tocar *fraquinho*, o teclado vai reproduzir *velocities* elevados.

Se a curva for “pesada”, significa que para atingir um *velocity*elevado (mais próximo a 127), preciso pressionar mais forte.

### *Note off*

Quando você solta uma tecla, uma mensagem também é disparada. Trata-se do *“note off”*. Essa mensagem garante que a nota que foi tocada, será interrompida.

Igualmente a mensagem anterior, o “*note off”*envia ***note*** e ***velocity*.** O *velocity*, nesse caso, corresponde a velocidade em que a nota foi liberada.

---

Esses conceitos podem ser facilmente vistos abrindo um arquivo *.**mid*** em algum *software* sequenciador que possua um *piano roll*.

A figura abaixo mostra o usuário acessando o *piano roll* de uma sequência MIDI na [DAW *Presonus Studio One.*](http://www.presonus.com/products/Studio-One) Cada caixinha azul no quadro representam as notas que foram executas tem um determinado tempo. O início de cada caixinha é o *note on*, o final de cada caixinha é o *note off*.

![Piano Roll do Presonus One](/blog-images/legacy/2016/12/lI5fSBP.gif)

Piano Roll do Presonus One

Nesse outro exemplo, temos o *piano roll* da DAW *Ableton Live*. Na parte inferior da tela, o gráfico mostra o nível de *velocity* de cada nota executada.

![Piano Roll do Ableton Live](/blog-images/legacy/2016/12/fold-piano-roll-1024x640.jpg)

Piano Roll do Ableton Live

### *Aftertouch* e *Pitchbend*

*Aftertouch* está presente em alguns teclados. Consiste na força contínua na tecla realizada imediatamente após a batida da mesma. O objetivo do *aftertouch* é causar alguma expressão e pode ser interpretado de várias maneiras pelo instrumento alvo (que recebe as mensagens) para alterar o volume, timbre, vibrato… O *aftertouch*pode ir de 0 a 127.

O *pitchbend* é um controle que você encontra na maioria dos teclados. Trata-se da “roda” ou pequena “alavanca” que geralmente está ao lado esquerdo do teclado. Como o nome já diz, o objetivo do *pitchbend* é variar o *pitch*, isto é, a altura do som. Essa variação é contínua e pode ser de menos de um semitom – o tamanho da variação pode ser configurado no instrumento alvo. O *pitchbend* pode ir de 0 a 127, sendo que a posição inicial é 64.

![Pitchbend](/blog-images/legacy/2016/12/synth-solo-pitch-bend-3.jpg)

Pitchbend

### *Controllers*

As mensagens de controle são imprescindíveis para garantir autonomia e fidelidade na execução dos instrumentos virtuais. A maioria dos teclados disponibilizam uma série de controles, isto é, todo apetrecho que pode ser parametrizado. Cada controle é atribuído com um número que vai de **1 a 127.**

Existem alguns controles já padronizados para a maioria dos teclados e instrumentos virtuais. Convencionalmente, utiliza-se o prefixo “CC” para indicar um controle. Segue uma lista dos controles padrões:

* **CC1** – *Modulation* (*modulation wheel):* “roda de modulação” – geralmente causa *vibrato* ou *tremolo* nos intrumentos alvo.
* **CC7** – Volume
* **CC11** – *Expression (expression pedal)* – utilizado para pedal de expressão – geralmente associado ao volume do instrumento alvo
* **CC64** – Sustain (*sustain pedal)*

[Para ver uma tabela mais completa, clique aqui.](/pt/blog/tabela-de-controles-midi-em-portugues)

Em alguns instrumentos virtuais (VSTi) é possível atribuir **controles** aos **parâmetros** do instrumento. No Kontakt, por exemplo, é possível atribuir um *controller* a qualquer parâmetro na tela do instrumento. Isso é possível clicando bom o botão direito e indo em *learn CC#*. Ao acionar o controle (seja um *knob, fader, pedal…)*no teclado, o Kontakt vai fazer a associação automaticamente.

## Canais MIDI

É de suma importância entender os canais MIDI. O protocolo atual suporta até 16 canais por onde trafegam as mensagens.

Os canais permitem enviar mensagens MIDI para diferentes instrumentos de forma simultânea. Você pode atribuir, por exemplo, o piano no canal 1, strings no canal 2 e bateria no canal 10.

Os equipamentos, geralmente, permitem configurar os canais de entrada (**recepção – RX**) e de saída (**transmissão – TX**).

Se você tem um teclado controlador que está ligado a outro instrumento, você deve conhecer o canal de saída do teclado controlador, bem como, o canal de entrada no outro instrumento. Se você configurar o controlador para enviar no canal 1, você deve garantir que o outro instrumento esteja configurado para receber no canal 1.

Os *softwares* sequenciadores, bem como, as *DAWs*, possuem pistas (*tracks*) MIDI. Normalmente, você configura o canal de entrada para cada pista.

Em VSTi’s, como **Kontakt**, é possível selecionar o canal de entrada *(Midi Ch)* para cada instrumento carregado. Veja a imagem:

![Seleção de canal MIDI no Kontakt](/blog-images/legacy/2016/12/KB2527_ChangingMIDIPortForInstrument.png)

Instrumento carregado no Native Instruments Kontakt – troca do canal MIDI de entrada

As DAW’s específicas para performances ao vivo costumam oferecer a opção de mapear os canais. Dessa forma, é possível personalizar a distribuição dos canais entre os instrumentos virtuais dentro do *software*. Se, por exemplo, o teclado controlador enviar mensagens apenas para o **canal 1**, você pode configurar a DAW para que um instrumento específico reproduza o canal 1 nos **canais 1, 2 e 3**. Veja dois exemplos de mapeamento:

![Esquemas de conexão MIDI para softwares DAW](/blog-images/legacy/2016/12/esquema-midi-daw-1012x1024.jpg)

Esquemas de conexão MIDI para softwares DAW

No primeiro esquema, só há um teclado. Ele envia todas mensagens através do **canal 1**. A DAW possui dos VSTi’s carregados e para cada instrumento é permitido realizar um mapeamento. No **VSTi 1**, entra **o canal 1** que é reproduzido para os **canais 1 e 2** do VSTi. No **VSTi 2**, entra o **canal 1** que é reproduzido para os **canais 1 e 10** do VSTi.

No segundo esquema, existem dois teclados: A e B. O **teclado A** envia mensagens para dois canais, 1 e 2; o **teclado B** envia mensagem somente para o **canal 1**. No **VSTi 1**, o mapeador recebe o **canal 1** e o reproduz para os canais 2 e 4. Já no **VSTi 2**, o mapeador recebe no **canal 2** do **teclado A** e envia para o **canal 1** do **VSTi 2**. O **VSTi 3** recebe no **canal 1** e envia para os **canais 3 e 9.**

A ideia nesses esquemas de mapeamento, dentro de *softwares*DAW, é misturar timbres entre VSTi’s. [Veja aqui uma postagem sobre misturar timbres em teclados.](/pt/blog/como-misturar-varios-timbres-no-teclado)

![Mapeamento de canal MIDI no Brainswpan Forte](/blog-images/legacy/2016/12/advmidirouting_zoom73.png)

Mapeamento de canal MIDI no Brainswpan Forte

---

Muito bem! Agora que você já tem uma noção, recomendo que você instale uma DAW em seu computador e comece a experimentar. Por isso, quero deixar aqui algumas dicas de programação MIDI.\

## 5 dicas imperdíveis de programação MIDI e instrumentos virtuais (VSTi)

**1 – Explore os diversos tipos de controladores MIDI**

Existem muitos tipos de controladores MIDI ([para ver uma lista de teclados controladores, acesse esta postagem](/pt/blog/os-tipos-de-teclado-musical-controladores-arranjadores-sintetizadores-workstations-e-pianos-digitais)). O teclado controlador ainda é o mais comum, mas também existem os controladores de *pad*, baterias eletrônicas  e ferramentas avançadas como os teclados [*Komplete Kontrol*](https://www.native-instruments.com/en/products/komplete/keyboards/komplete-kontrol-s-series/) da NI com modos especiais de MIDI.

![Controladores MIDI](/blog-images/legacy/2016/12/50-best-midi_controllers-1200x627-1024x535.jpg)

Controladores MIDI

**2 -Utilize plugins e processadores MIDI em sua DAW**

Mesmo que você esteja apenas usando um simples teclado controlador, existem diversos plugins e processadores MIDI dentro de sua DAW que podem ajudar a criar combinações mais ricas e complexas. Um exemplo é o plugin *“compressor”* que permite ajustar os valores de *velocity* ao longo de sua trilha MIDI. Outro processador muito interessante e últil é o “*quantize*” que realizar um ajuste exato das notas no tempo.

![MIDI quantize](/blog-images/legacy/2016/12/6378_6122e77123ee293c22206006164e639c.gif)

MIDI quantize no Logic

**3 – “Nunca entre em pânico”**

Esse é apenas um trocadilho para falar sobre uma função presente na maioria dos instrumentos virtuais, DAW’s e controladores MIDI: ***panic*****!** O comando serve para dar um “reset” nas mensagens MIDI, o que é muito útil em casos de paradas inesperadas que deixam “notas sobrando” na sequência MIDI.

![Exemplo da função Panic](/blog-images/legacy/2016/12/CJerZGHUcAAoapZ.jpg)

**4 – Explore as curvas sensitivas de seu teclado**

Muitos instrumentos virtuais são “mal julgados” por não haver uma execução adequada. Os VSTi’s costumam oferecer variações do timbre de acordo com o *velocity*. Às vezes, para causar realismo e uma boa expressão, é necessário alterar a curva de *velocity* do seu teclado. Em timbres de piano, por exemplo, uma curva pesada (HARD) faz todo a diferença!

![Curvas de "velocity"](/blog-images/legacy/2016/12/MIDI_Fig_1-1024x599.jpg)

Curvas de “velocity”

**5 – Procure por teclas de “articulação”**

Alguns VSTi’s que buscam imitar instrumentos reais, disponibilizam teclas de articulação. São teclas que não reproduzem som, mas alteram o timbre. No exemplo abaixo, as teclas mais baixas alternam entre técnicas e articulações do violino.

![Teclas de Articulação em um Sampler de Violino para Kontakt](/blog-images/legacy/2016/12/cp_768_MIDI_Fig_4.jpg)

Teclas de Articulação em um Sampler de Violino para Kontakt

## Referências

http://www.philrees.co.uk/articles/midimode.htm

http://www.instructables.com/id/What-is-MIDI/

http://www.rolandmusiced.com/spotlight/article.php?ArticleId=1040

https://ask.audio/articles/5-mistakes-to-avoid-when-using-midi-virtual-instruments/don-rsquo-t-ignore-the-bottom-of-the-keyboard#article

_Algumas imagens externas do artigo original não estavam disponíveis na migração. As imagens recuperadas foram preservadas neste site._

_Nota editorial: no MIDI 1.0, pitch bend usa 14 bits (0 a 16.383, centro em 8.192), e os números de controle vão de 0 a 127. Esses valores corrigem as descrições do artigo original. Veja o [resumo da MIDI Association](https://midi.org/summary-of-midi-1-0-messages)._
