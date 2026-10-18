---
title: "Guia para utilizar teclado, samplers & VSTs no palco: performances ao vivo"
date: "2016-12-13"
legacy: true
revised: "2026-10-18"
description: "Monte um setup de teclado ao vivo com Logic, apps de iPad, Sunday Keys, instrumentos atuais, diagramas e preparação do show. Revisão de 2026."
category: "music"
tags: ["live-performance", "virtual-instruments"]
---

**Indico para:** tecladistas e pianistas que querem levar instrumentos virtuais para o palco.

**Revisado em 18 de outubro de 2026.** Publicado originalmente em 2016, este guia agora inclui hosts atuais, instrumentos virtuais e opções para tocar com iPad, com exemplos visuais para ajudar a montar seu setup.

Comecei com essa história em meados de 2009. Na época eu possuía um **Roland Fantom FA-76** e tinha um forte interesse em produção musical. Através de um amigo de São Paulo, conheci melhor os instrumentos virtuais e samplers. Aos poucos, fui experimentando maneiras de levar tudo isso para o palco.

Demorou até encontrar uma configuração que me atendesse. A liberdade de escolher os timbres era ótima, mas havia outra parte do trabalho: preparar o computador, organizar os controles e aprender a resolver problemas.

A ideia deste guia continua sendo um *quickstart*. **Comece com um timbre confiável, toque com ele e só depois aumente a complexidade.** Um bom setup é aquele que você consegue operar enquanto faz música.

## O caminho do som

São três elementos principais:

1. **Teclado:** envia MIDI — notas, intensidade, pedal e outros comandos.
2. **Computador ou iPad:** executa os aplicativos, instrumentos virtuais e efeitos compatíveis com a plataforma.
3. **Interface de áudio:** converte o áudio digital em sinal para fones, monitores ou a mesa de som.

![O teclado envia MIDI ao computador; o host gera áudio digital, que passa pela interface e segue como áudio analógico para a mesa, PA e retorno.](/blog-images/legacy/live-keyboard-guide/signal-path.pt.svg)

*Figura 1. Exemplo com computador. Do toque ao som: os comandos MIDI e o áudio percorrem etapas diferentes.*

MIDI não é áudio. Um cabo USB pode transportar MIDI, áudio ou ambos, conforme o equipamento; ter uma porta USB não significa que o teclado envia seu som por ela. Se quiser misturar os timbres internos do teclado com os virtuais, planeje também a conexão de áudio do teclado.

Uma workstation reúne várias dessas funções no mesmo instrumento. Aqui, nós as distribuímos entre dispositivos. Ganhamos flexibilidade e assumimos a responsabilidade pelas conexões.

## O teclado controlador

Você não precisa comprar um controlador dedicado se o teclado que já possui envia MIDI compatível. USB-MIDI costuma permitir conexão direta; uma saída MIDI DIN de cinco pinos precisa de uma entrada MIDI, presente em algumas interfaces de áudio ou em uma interface MIDI separada.

Escolha pelas suas mãos e pelo repertório:

- **Teclas e extensão:** ação confortável, resposta à velocidade e quantidade de teclas suficiente para seus splits.
- **Pedais:** entrada de sustain; expressão, se necessária. Confira compatibilidade e polaridade no manual.
- **Controles:** botões para trocar timbres e faders ou knobs que você realmente vai usar.
- **Expressividade:** pitch bend, modulação e aftertouch fazem sentido quando o instrumento virtual responde a eles.
- **Alimentação e conexões:** confirme se funciona por USB e teste o hub, quando necessário.

Experimente a curva de velocidade com seu piano virtual. Um controlador cheio de recursos pode ser uma escolha pior do que um modelo simples com teclas adequadas à sua técnica.

Os modelos e preços citados em 2016 saíram desta lista de compra: não existe um teto em reais que continue válido para todos. Inclua pedais, cabos, suporte e transporte no orçamento. Para entender as categorias, veja [os tipos de teclado musical](/pt/blog/os-tipos-de-teclado-musical-controladores-arranjadores-sintetizadores-workstations-e-pianos-digitais).

## O computador: escolha pelo repertório

**Não precisa ser Mac.** Precisa executar, com folga, a combinação de host, plugins e bibliotecas que você vai usar.

Como ponto de partida para uma compra, eu priorizaria **16 GB de RAM e SSD**; consideraria **32 GB ou mais** para várias bibliotecas grandes carregadas ao mesmo tempo. É uma recomendação de planejamento, não um requisito universal nem uma promessa de desempenho. Um projeto leve pode funcionar em menos memória; um piano pesado com várias camadas pode exigir mais.

O antigo “Core i5 + 4 GB + HD de 500 GB” não serve mais como regra. Verifique o modelo e a geração do processador, a memória exigida pelas bibliotecas, espaço livre, refrigeração e portas. Os [requisitos do Live](https://help.ableton.com/hc/en-us/articles/115001663530-Live-Minimum-System-Requirements), por exemplo, distinguem processadores e instruções compatíveis: o nome “i7” sozinho não responde à pergunta.

Reserve espaço para instrumentos, samples e backups. Se as bibliotecas estiverem em SSD externo, esse disco e seu cabo passam a fazer parte do instrumento: precisam estar conectados e com os caminhos corretos antes de abrir o show.

### Compatibilidade vem antes da atualização

Confira a combinação completa: **versão do sistema → host → formato e arquitetura do plugin → driver da interface**. Verifique também o instalador e o gerenciador de licenças.

- **Apple Silicon:** prefira versões nativas ou Universal. No Live rodando nativamente, VST2/VST3 precisam ser compatíveis com Apple Silicon; o comportamento de AU pode ser diferente. Rosetta e bridges dependem do host e do sistema, e não garantem que qualquer plugin antigo funcione. Veja a [orientação da Ableton para plugins no Mac](https://help.ableton.com/hc/en-us/articles/4410323149074-Plug-ins-on-Mac-in-Live-11-1-and-later).
- **Windows:** confira a arquitetura do computador. Uma aplicação x64, um plugin ARM e um driver de interface não são automaticamente intercambiáveis. Em um notebook com Windows on Arm, exija confirmação para cada parte do setup.
- **Sistema suportado:** um host ainda aceitar Windows 10 não significa que o sistema tenha suporte regular. O suporte padrão do Windows 10 terminou em 14 de outubro de 2025; programas de atualização estendida e edições especiais têm condições próprias. Planeje a migração fora da agenda de apresentações. [Ciclo de suporte da Microsoft](https://support.microsoft.com/en-us/windows/deployment/updates-lifecycle/windows-10-support-has-ended-on-october-14-2025).

Faça backup e reserve tempo para ensaiar depois de atualizar. A véspera do show não é o momento de descobrir que uma biblioteca deixou de abrir.

## Host, DAW e instrumentos virtuais

O **host** carrega plugins e organiza MIDI, efeitos e saídas. Uma **DAW** também pode fazer isso, além de gravar, editar e sequenciar. Você não precisa obrigatoriamente de uma DAW completa para tocar piano e pad.

### Qual host escolher?

Esta é uma seleção por necessidade, não um ranking. Confira os requisitos da versão e os recursos da edição antes de comprar.

| Host | Sistema e formatos |
| --- | --- |
| MainStage | macOS; instrumentos internos e Audio Units (AU). Não carrega VST diretamente. |
| Logic Pro (Mac) | macOS; instrumentos internos e Audio Units (AU). Não carrega VST diretamente. |
| Gig Performer | Windows e macOS; VST2/VST3, além de AU no Mac. |
| Cantabile | Windows; VST2/VST3. |
| Ableton Live | Windows e macOS; VST2/VST3, além de AU no Mac. |

- **MainStage** — [Site oficial ↗](https://www.apple.com/mainstage/): para organizar patches, splits e layers no Mac, com uma coleção de instrumentos incluída.
- **Logic Pro (Mac)** — [Site oficial ↗](https://www.apple.com/logic-pro/): para quem já produz no Logic e quer tocar instrumentos virtuais, combinar timbres e usar trilhas ou loops no mesmo projeto.
- **Gig Performer** — [Site oficial ↗](https://gigperformer.com/): para conectar plugins visualmente e organizar sons, músicas e setlists. Confira as diferenças entre edições.
- **Cantabile** — [Site oficial ↗](https://www.cantabilesoftware.com/): para um setup de teclado com roteamento e controles MIDI. Lite permite começar; setlists entram no Solo, e estados e racks compartilhados no Performer. Veja a [comparação de edições](https://www.cantabilesoftware.com/compare).
- **Ableton Live** — [Site oficial ↗](https://www.ableton.com/en/live/): para quem também precisa de clips, cenas, loops, backing tracks e produção no mesmo ambiente.

Para a instalação, consulte os [requisitos do Cantabile](https://www.cantabilesoftware.com/guides/installation), os [downloads do Gig Performer](https://gigperformer.com/download) e os [formatos aceitos no Live](https://help.ableton.com/hc/en-us/articles/5937501570460-Supported-Plug-in-Formats). Os requisitos de cada plugin também contam.

**Atenção à edição do MainStage:** na consulta desta revisão, a [ficha de compra avulsa](https://apps.apple.com/us/app/mainstage/id634159523) exige macOS 15.6 ou posterior. A oferta [MainStage: Perform Live, do Apple Creator Studio](https://apps.apple.com/us/app/mainstage-perform-live/id6746637089), exige também chip Apple M1 ou posterior. Confira a ficha da edição que pretende instalar, especialmente em um Mac Intel; ter uma versão antiga funcionando não comprova compatibilidade com a atual.

**Usando o Logic Pro ao vivo:** a versão para Mac aceita [instrumentos e efeitos Audio Units](https://support.apple.com/guide/logicpro/lgcp22a0dab0/mac). Para camadas, um [summing stack](https://support.apple.com/guide/logicpro/lgcp9bc4b63d/mac) pode reunir instrumentos que você toca juntos. Prepare as pistas e os controles antes do ensaio e teste a troca de sons com notas e sustain segurados. O Logic segue o fluxo de uma DAW; o MainStage oferece uma organização voltada a patches de palco. Escolha pelo modo como você conduz o show.

No Logic, o **Low Latency Monitoring Mode** pode desativar plugins e envios que afetam o caminho monitorado para reduzir o atraso. Isso pode mudar o timbre ou retirar um reverb do retorno: confira o resultado antes de tocar. A Apple explica o comportamento na [documentação de latência do Logic](https://support.apple.com/guide/logicpro/lgcpe11997ba/mac).

O Brainspawn Forte citado no texto de 2016 fica como referência histórica, fora desta seleção atual. Se você já trabalha bem em outra DAW, avalie o que falta no seu fluxo antes de trocar: mudança de timbres, controles acessíveis e recuperação rápida são mais importantes do que o rótulo do programa.

### VST3, AU e Kontakt não são a mesma coisa

**VST2, VST3 e AU são formatos de plugin.** Um instrumento pode existir em vários deles. “VSTi” costuma indicar um instrumento virtual, enquanto outros plugins processam áudio como efeitos. Para um setup novo, prefira um formato atual que o fabricante e o host suportem — normalmente VST3, ou AU no MainStage e no Logic Pro. Salve uma cópia do projeto antes de trocar de formato: não presuma que os presets e as automações serão transferidos automaticamente.

**Kontakt é uma plataforma de instrumentos baseados em samples.** A biblioteca é o conteúdo carregado dentro dele; instalar o Kontakt não instala todos os timbres. O Kontakt 8 oferece VST3, AU no Mac e AAX, além do modo independente; não oferece VST2. Confira os [formatos e requisitos do Kontakt](https://www.native-instruments.com/products/kontakt).

Antes de comprar uma biblioteca, veja se ela funciona no **Kontakt Player gratuito** ou exige o **Kontakt completo**, e qual versão mínima pede. Instrumentos que exigem a versão completa podem entrar em modo de demonstração limitado no Player. Esse detalhe não pode aparecer só no palco. [Comparação oficial do Kontakt Player](https://www.native-instruments.com/products/kontakt-player).

Escolha poucos timbres que resolvam seu repertório. Um piano, um elétrico, um órgão e um pad bem preparados podem ser mais úteis do que dezenas de bibliotecas que você ainda não conhece.

## iPad no palco: Sunday Keys e outras opções

O iPad também pode ser o instrumento do setup, recebendo MIDI e gerando áudio. O ecossistema é diferente: procure a versão para iPad do instrumento e o suporte a **AUv3** do host. Um instalador VST3 de Windows ou Mac não se transforma em app de iPad, mesmo quando os aparelhos usam processadores da mesma família. A [documentação do Camelot para iPad](https://kb.audiomodeling.com/support/solutions/articles/206000050981-on-ipad-why-are-some-music-apps-not-displayed-in-the-plugin-list-) explica essa distinção de formatos.

| Aplicativo | Quando vale experimentar |
| --- | --- |
| [Sunday Keys](https://sundaysounds.com/pages/sunday-keys-app) | Pianos, pads, camadas e setlists preparados para música de igreja; app para iPad e Mac. |
| [Camelot Pro](https://audiomodeling.com/products/camelot/) | Organizar músicas e cenas, combinar instrumentos virtuais com teclados externos, backing tracks e partituras. Também existe para Mac e Windows. |
| [AUM](https://www.kymatica.com/apps/aum) | Montar um mixer de instrumentos e efeitos AUv3, com roteamento de MIDI, buses e saídas. Você constrói o fluxo do seu setup. |
| [Loopy Pro](https://loopypro.com/) | Tocar e gravar loops de áudio e MIDI, disparar clips e montar uma superfície de controle adaptada à performance. |

**Sunday Keys, da Sunday Sounds**, merece atenção de quem toca em igreja. O [walkthrough oficial de 2026](https://sundaysounds.com/blogs/news/the-complete-sunday-keys-app-walkthrough-2026) mostra criação de patches, Tonic Pad, snapshots e o AI Patch Builder. Snapshots guardam ajustes dentro de um patch para preparar momentos diferentes da música; o gerador assistido pode servir como ponto de partida, mas volumes, transições e controles continuam precisando de ensaio. A marca também vende recursos para MainStage e Ableton: confira o formato da compra.

Segundo o [manual atual de hospedagem de plugins](https://support.sundaysounds.com/article/3193-hosting-auv3-au-instrument-plugins), o Sunday Keys aceita **instrumentos AUv3 no iPad e AU/AUv3 no Mac**, com licença ativa. Essa função não inclui hospedar plugins externos de efeitos de áudio ou MIDI. Confira também as condições de renovação e o que permanece disponível se a licença expirar.

![Sunday Keys no Mac e no iPad, com setlist à esquerda, canais de instrumentos, efeitos, faders e regiões do teclado.](/blog-images/legacy/live-keyboard-guide/sunday-keys.webp)

*Figura 2. Sunday Keys: repertório, camadas e controles de execução na mesma tela. As barras coloridas acima do teclado mostram as regiões dos instrumentos. Imagem de divulgação: [Sunday Sounds](https://sundaysounds.com/pages/sunday-keys-app).*

Para escolher entre os outros três, pense na tarefa principal. No Camelot, ela tende a ser a organização do repertório e a troca de cenas; no AUM, as conexões e a mixagem; no Loopy Pro, loops, clips e controles personalizados. São pontos de partida para experimentar, não limites absolutos. O [manual do Loopy Pro](https://loopypro.com/manual/) descreve os recursos atuais, incluindo clips MIDI; comparações antigas podem se referir a uma versão anterior.

Para os sons, [KORG Module](https://www.korg.com/us/products/software/korg_module/) reúne instrumentos de teclado e suporta AUv3; verifique quais expansões habilitam os recursos desejados, como layers e splits. O [Pianoteq para iOS](https://www.modartt.com/user_manual?product=pianoteq) oferece outra abordagem: piano por modelagem física, em modo independente ou AUv3.

**Monte e teste o conjunto completo:** iPad, controlador MIDI, interface compatível com iPadOS e hub/adaptador que permita a alimentação necessária. Verifique carga da bateria durante o uso, acesso aos pedais, saídas para PA e retorno, reabertura dos projetos e operação offline. O formato compacto não elimina cabos, licenças nem o plano B.

## Novidades para produção e preparação do show

Este recorte foi consultado em **16 de outubro de 2026**. Ele reúne novidades de 2025–2026 e ferramentas estabelecidas que continuam relevantes; não é uma lista de lançamentos do mês.

- **[Ableton Live 12.4](https://www.ableton.com/en/blog/live-12-4-is-out-now/):** trouxe Link Audio para transmitir áudio entre dispositivos compatíveis em uma rede local. Também refinou a separação de stems, disponível no Live 12 Suite. Isso pode ajudar a preparar material para ensaio e rearranjos; escute o resultado da separação e exporte o que for necessário antes de levar o projeto ao palco. Link Audio exige compatibilidade específica, além da sincronização de tempo do Link tradicional.
- **[Bitwig Studio 6](https://www.bitwig.com/stories/on-another-level-bitwig-studio-6-is-out-now-416/):** acrescentou clips de automação e aliases, que permitem reutilizar material mantendo uma ligação com o original. É uma opção para produção eletrônica e performances construídas com clips. Seus [formatos de plugin](https://www.bitwig.com/modern-foundations/) incluem VST2, VST3 e CLAP em Windows, macOS e Linux; confira também a versão do plugin para cada sistema.
- **[Steinberg VST Live 3](https://www.steinberg.net/vst-live/):** amplia a organização do show para instrumentos, backing tracks, letras/acordes, vídeo e luzes. Faz sentido investigar quando você precisa sincronizar várias partes da apresentação. Se só precisa de piano e pad, compare o trabalho de preparar tudo isso com o de um host mais simples.

![Detalhe da Session View do Ableton Live, com clips coloridos nas pistas, mixer e editor de notas MIDI abaixo.](/blog-images/legacy/live-keyboard-guide/ableton-live-session.webp)

*Figura 3. Ableton Live: a Session View permite combinar e disparar clips durante a execução; o editor abaixo mostra as notas do clip selecionado. Imagem oficial: [Ableton](https://www.ableton.com/en/live/what-is-live/).*

### Instrumentos para conhecer, sem comprar todos

Esses produtos geram timbres; não substituem, por si só, o host que organiza o show. Escolha pelo som que falta no repertório e teste a edição compatível com seu sistema.

- **[Serum 2](https://xferrecords.com/products/serum-2):** expande a síntese wavetable com reprodução de samples, granular e espectral. Vale explorar para criar baixos, leads e texturas próprias.
- **[Pigments 7](https://www.arturia.com/products/software-instruments/pigments/update):** atualiza a página de performance, filtros, efeitos e visualização das modulações. A Arturia informa otimizações de CPU; isso não dispensa medir o patch no seu computador.
- **[Omnisphere 3](https://www.spectrasonics.net/products/omnisphere/overview.php):** combina uma grande biblioteca com síntese, novos controles globais e expressão por nota via MPE. É um candidato para pesquisar texturas e sons em camadas; considere espaço em disco, tempo de carregamento e o quanto você quer editar.
- **[Pianoteq 9](https://www.modartt.com/pianoteq_overview):** usa modelagem física em vez de uma grande biblioteca de samples. Vale comparar resposta ao toque e caráter do piano com as alternativas sampleadas; ocupar pouco disco não significa não usar CPU.
- **[Surge XT](https://surge-synthesizer.github.io/):** opção gratuita e de código aberto para aprender síntese e construir sons. É uma alternativa estabelecida para começar sem comprar outro instrumento.

![Interface do Omnisphere 3, com biblioteca e lista de patches à esquerda e controles de síntese, modulação, filtro e envelopes à direita.](/blog-images/legacy/live-keyboard-guide/omnisphere-3.webp)

*Figura 4. Omnisphere 3: escolha um patch na biblioteca e ajuste suas camadas no painel de síntese. Vale experimentar quanto você consegue adaptar um preset antes de começar um som do zero. Imagem oficial: [Spectrasonics](https://www.spectrasonics.net/products/omnisphere/overview.php).*

Antes de comprar, confira também os instrumentos e efeitos que sua DAW já inclui. No estúdio, você pode editar e renderizar partes; ao vivo, o patch precisa responder com a latência, os controles e a carga de processamento que o show permite.

## Escolha pelo seu jeito de tocar

Uma lista de recursos não mostra como o programa vai funcionar no meio de uma música. Antes de migrar seu repertório, prepare um pequeno set e observe três coisas:

- **Controles ao alcance:** mapeie troca de música, volume e os comandos que você usa durante a execução. Toque uma música inteira com o controlador e os pedais. Se precisa procurar botões na tela a cada seção, simplifique o mapa antes de acrescentar mais recursos.
- **Presets ou criação de timbres:** experimente chegar ao som de uma música do repertório. Você prefere escolher um preset e ajustar poucos controles ou construir o timbre desde os osciladores? Considere o tempo de preparação, além do tamanho da biblioteca e do preço.
- **Transições e recuperação:** passe de uma música para outra, segure notas e sustain durante a troca e reabra o projeto. Confira volumes, caudas de efeitos e tempo de carregamento. Quando o conjunto funcionar bem, salve o projeto e registre as versões usadas.

Minha sugestão para experimentar é escolher **uma tarefa**: piano e pad de igreja no Sunday Keys; repertório com cenas e hardware no Camelot; roteamento no AUM; loops no Loopy Pro; produção com clips no Live ou Bitwig. Compare apenas duas opções de cada vez, usando a mesma música, controlador e saída de áudio.

## A interface de áudio

Áudio integrado também usa uma interface, interna ao computador. Uma interface externa costuma trazer conexões mais adequadas ao palco, controles físicos e opções de driver e roteamento. Ela não resolve sozinha problemas de CPU ou de plugins.

Priorize:

- Driver e firmware compatíveis com seu sistema e suporte do fabricante.
- Saídas de linha adequadas à mesa, preferencialmente balanceadas, e controle de fones.
- Quantidade de **saídas independentes**: para estéreo no PA e um click separado, planeje pelo menos três canais de saída; interfaces com quatro saídas de linha facilitam esse arranjo. Uma saída de fones que apenas duplica o par principal não resolve.
- Cabos, alimentação e adaptadores que você consiga montar com segurança.

No Windows, comece pelo **ASIO do fabricante**. No macOS, use **Core Audio** e instale o driver se o fabricante exigir. ASIO4ALL pode ser uma alternativa para dispositivos sem ASIO próprio; não substitui uma interface física nem garante baixa latência. [Configuração de interfaces pela Ableton](https://help.ableton.com/hc/en-us/articles/211476789-Setting-up-an-Audio-Interface).

USB-C descreve um conector; não é uma medida de latência. USB 3 ou Thunderbolt também não garantem resposta melhor que uma boa interface USB 2. A recomendação antiga de priorizar FireWire saiu do guia. Escolha pela compatibilidade e pelo desempenho do conjunto.

Combine com o técnico as saídas, os cabos e a necessidade de DI. Confirme se o PA receberá mono ou estéreo e ouça seus timbres nessa configuração. Mantenha o click fora das saídas destinadas ao público.

![Dois mixes estéreo: instrumentos e backing tracks nas saídas 1/2 para o PA; instrumentos e click nas saídas 3/4 para o amplificador de fones ou sistema in-ear dos músicos.](/blog-images/legacy/live-keyboard-guide/output-routing.pt.svg)

*Figura 5. Exemplo com quatro saídas independentes. Crie no host um mix para o público e outro para o retorno, incluindo os instrumentos que os músicos precisam ouvir. Saídas de linha alimentam o equipamento de monitoração; não conecte fones diretamente a elas.*

## Latência: resposta rápida sem estalos

Latência é o atraso entre tocar e ouvir. O número mostrado pelo host pode representar entrada, saída ou ida e volta do áudio; não é necessariamente o tempo completo entre a tecla e o retorno. Para um instrumento virtual controlado por MIDI, a entrada de áudio não faz parte do mesmo caminho de um microfone processado pelo computador.

Uma conta ajuda a entender a escala: **128 samples ÷ 48.000 samples por segundo ≈ 2,67 ms por buffer**. Isso não significa latência total de 2,67 ms: ainda existem outras etapas. Portanto, “menos de 5 ms” não deve ser uma regra absoluta. [Como a latência funciona](https://help.ableton.com/hc/en-us/articles/360010545559-How-Latency-Works).

Meu ponto de partida para testar seria **44,1 ou 48 kHz e buffer de 128 ou 256 samples**, conforme o equipamento. São valores iniciais de ensaio, não uma configuração garantida. Toque o trecho mais pesado, com sustain, camadas e efeitos; ajuste até encontrar uma resposta confortável sem interrupções.

Buffer menor reduz a espera, mas exige processamento mais frequente. Taxas maiores também aumentam a carga; não são automaticamente a melhor escolha para o palco. Efeitos com *lookahead* e outros processamentos podem acrescentar atraso. Evite Bluetooth no caminho de monitoração do instrumento. [Orientações para reduzir latência](https://help.ableton.com/hc/en-us/articles/209072289-How-to-reduce-latency).

O **direct monitoring** da interface monitora uma entrada física sem passar pelo host. Ele não elimina o processamento necessário para um piano virtual gerar som. [Monitoração direta e latência](https://help.ableton.com/hc/en-us/articles/360011924559-How-to-reduce-latency-while-monitoring).

## Monte o primeiro show em sete passos

![Split divide o teclado entre baixo à esquerda e piano à direita. Layer sobrepõe piano e pad na mesma região para que soem juntos.](/blog-images/legacy/live-keyboard-guide/split-layer.pt.svg)

*Figura 6. No split, a região da tecla escolhe o instrumento; no layer, uma nota pode acionar mais de um timbre. As regiões são ilustrativas: ajuste-as ao repertório.*

1. **Faça um único timbre tocar.** Conecte teclado e interface, selecione as portas de MIDI e áudio, carregue um piano e confirme canal MIDI, sustain e saída. Salve e reabra o projeto.
2. **Crie as combinações necessárias.** Experimente piano com pad em layer e baixo com piano em split. Ajuste regiões, oitavas e velocidade. Confira se o sustain deve afetar todas as camadas. Veja [como misturar timbres](/pt/blog/como-misturar-varios-timbres-no-teclado).
3. **Organize a ordem das músicas.** Nomeie patches por música e seção. Mapeie avançar, voltar, volume e um comando de emergência (*panic*, para notas presas). Teste o que cada comando realmente interrompe.
4. **Ensaie as transições.** Troque de patch segurando notas e sustain; ouça cortes, caudas de reverb e saltos de volume. Preload pode ajudar, mas usa memória. Não presuma transição contínua só porque o host oferece esse recurso.
5. **Equilibre os volumes no contexto.** Compare piano, órgão, synth e camadas junto da banda. Deixe margem antes do clipping. Se usar click ou backing tracks, teste o roteamento de cada saída separadamente.
6. **Ensaie como se fosse o show.** Use o mesmo controlador, pedais, interface, cabos e alimentação durante o repertório inteiro. Teste a abertura a frio e, se pretende tocar sem rede, abra tudo offline para verificar samples e licenças.
7. **Prepare e ensaie o plano B.** Um timbre interno do teclado, módulo ou segundo sistema só é reserva se houver um caminho de áudio pronto. Aprenda a silenciar o sinal com problema e continuar tocando; um backup de arquivos sozinho não substitui um instrumento durante a música.

## Antes de sair e na passagem de som

- Faça backup do projeto, presets e mapas MIDI; registre as versões que funcionaram. Confirme que as bibliotecas e autorizações estão disponíveis no computador de reserva, se houver.
- Feche aplicações desnecessárias, interrompa sincronizações pesadas e programe atualizações fora do horário da apresentação. Evite suspender o computador durante o uso. Desligar a rede é opcional: confira antes se controle remoto ou licenças dependem dela.
- Leve alimentação e cabos de reserva, identifique conexões e deixe o computador ventilado, protegido de esbarrões. Use sempre o arranjo de hub e discos que foi ensaiado.
- Com o volume baixo, confira MIDI, áudio, pedais, retorno, troca de timbres e o plano B. Depois teste o patch mais exigente no volume combinado com o técnico.

Se houver problema, siga o caminho do sinal:

| Sintoma | Primeira verificação |
| --- | --- |
| Nenhum som | O host recebe MIDI? O instrumento está carregado, com canal correto? Há sinal no medidor e na saída certa? |
| Estalos ou cortes | Aumente o buffer para comparar; confira carga de áudio, leitura do SSD, alimentação e conexões. Isole um plugin por vez. |
| Notas presas | Acione o panic ensaiado e confira sustain, canal e mensagens MIDI. Se necessário, silencie a saída antes de reiniciar o host. |
| Plugin ausente ou em demo | Confira formato, arquitetura, versão, instalação e licença. Use o timbre de reserva se não houver tempo para resolver. |

Para investigar interrupções com mais detalhe, consulte o [guia de estalos e dropouts da Ableton](https://help.ableton.com/hc/en-us/articles/209070329-How-to-avoid-crackles-and-audio-dropouts).

## Vale a pena?

A grande vantagem continua sendo a liberdade: escolher sons, criar camadas e adaptar o instrumento ao repertório. O custo depende do que você já tem e do que precisa comprar; não existe economia garantida de 50%. A polifonia também tem limites de vozes, processamento, memória e leitura de disco.

Em troca dessa flexibilidade, você precisa cuidar de montagem, compatibilidade, licenças e recuperação de falhas. Equipamento caro, sozinho, não garante estabilidade.

Minha sugestão é começar pequeno. Prepare um som, entenda o [MIDI](/pt/blog/descomplicando-midi), faça um ensaio completo e expanda a partir daí. Vale gastar tempo descobrindo timbres; vale tanto quanto aprender a manter a música acontecendo.
