# Identidade Visual e Feature Pós-MVP — CineLog

## 1. Identidade visual

**1. Qual paleta de cores e fonte de destaque o grupo escolheu? Por que essas escolhas combinam com a proposta do app?**

A paleta escolhida foi a **"Cinema Noir"**: fundo escuro (`#141218`), superfícies em cinza-chumbo (`#211D26`/`#2B2632`) e dourado (`#E8B94C`) como cor de destaque, usada em avaliações, botões e no coração de favorito marcado. A fonte de destaque é a **Poppins** (semibold/bold) nos títulos, combinada com **Inter** no texto corrido. Essa combinação foi escolhida porque um catálogo de filmes remete naturalmente a sala de cinema — fundo escuro tipo "luzes apagadas" e um acento dourado tipo "tapete vermelho/premiação", sem cair no clichê de usar vermelho puro (que fica pesado em telas grandes de texto) ou no azul genérico de app corporativo. As cores e fontes estão centralizadas em `src/theme/colors.js` e `src/theme/typography.js`.

**2. O que foi feito para manter consistência visual entre a tela de listagem e a tela de detalhes (espaçamento, botões, componentes)?**

Nenhuma tela define cor, fonte ou espaçamento "solto": todas importam de `src/theme/colors.js` e `src/theme/typography.js`. Os componentes visuais (`Loading`, `ErrorMessage`, `FavoriteButton`, `BackButton`, `EmptyState`) são compartilhados entre listagem, detalhes e a nova tela de favoritos — por exemplo, o mesmo `FavoriteButton` aparece como selo sobre o pôster na listagem e ao lado do título nos detalhes, sempre com o mesmo ícone e a mesma cor dourada quando ativo. A grade de filmes (`MovieGrid`) também foi extraída como componente único, reaproveitado pela listagem e pelos favoritos, para que o comportamento responsivo (colunas, tamanho de card) seja idêntico nas duas telas. O cabeçalho de navegação (cor de fundo, cor do texto, fonte do título) é configurado uma única vez em `App.js`, então todas as telas herdam o mesmo estilo de header.

**3. O ícone e a splash screen do app já refletem essa identidade, ou ainda estão no padrão do template?**

Antes desta etapa, **não existia nem pasta `assets/`** — o `app.json` apontava para arquivos de ícone que não existiam, então o app rodava com o ícone padrão do Expo. Nesta etapa foram gerados o ícone principal, o ícone adaptativo do Android (camadas de fundo, frente e versão monocromática), o favicon e a splash screen — todos com a mesma marca (um círculo dourado com um "play" recortado no meio, sobre o fundo escuro da paleta), feitos com o script `scripts/generate_icons.py` e configurados em `app.json` (incluindo o plugin `expo-splash-screen`).

## 2. Funcionalidade pós-MVP

**4. Qual(is) categoria(s) do cardápio pós-MVP o grupo escolheu implementar? Por que essa escolha faz sentido para o tipo de app que estão construindo?**

O grupo escolheu **Descoberta (busca por título)** e **Personalização (favoritos)**. Fazem sentido para um catálogo de filmes porque são exatamente os dois recursos que um usuário espera de qualquer catálogo: encontrar algo específico (busca) e guardar o que interessou para depois (favoritos) — sem depender de nenhuma infraestrutura de backend própria, já que o app é hoje um consumidor puro da API do TMDb.

**5. O que foi necessário instalar ou configurar para implementar essa funcionalidade (bibliotecas, serviços externos, permissões)?**

- Para a busca: nenhuma biblioteca nova — apenas uma nova função (`searchMovies`) em `src/services/movieService.js` chamando o endpoint `/search/movie`, que o TMDb já expõe.
- Para os favoritos: a biblioteca `@react-native-async-storage/async-storage` (armazenamento local chave-valor no dispositivo), instalada via `npx expo install`. Não foi preciso nenhuma permissão especial do sistema operacional nem nenhum serviço externo — os favoritos nunca saem do aparelho.

**6. Existe alguma categoria do cardápio que o grupo considerou e descartou? Por quê?**

Sim, três:
- **Login e cadastro**: descartado porque exigiria um backend de autenticação real (cadastro, senha, sessão) para não ser apenas uma tela decorativa — trabalho fora do escopo desta etapa e que lida com dados sensíveis (senha de usuário).
- **Notificações**: descartado porque, hoje, não existe nenhum gatilho de negócio real por trás — o app não tem um backend que "avisa" quando um filme novo é lançado; implementar notificação aqui seria simular um alarme sem nenhuma lógica real disparando ele.
- **Preço/monetização**: descartado porque no formato atual do app (catálogo de descoberta, sem carrinho/assinatura) um preço mockado não se conecta a nada — ficaria um número solto na tela sem propósito, ao contrário da busca e dos favoritos, que se conectam diretamente ao fluxo já existente.

**7. Como a nova funcionalidade se conecta às telas já existentes (listagem e detalhes)?**

A busca **substitui a fonte dos dados** da tela de listagem: a mesma tela (`MovieListScreen`) que antes só chamava `getPopularMovies()` agora decide, a cada mudança no campo de busca, entre mostrar os populares (campo vazio) ou os resultados da busca (`searchMovies`), reaproveitando o mesmo componente de grade e o mesmo fluxo de navegação para os detalhes. Os favoritos aparecem como um botão de coração sobreposto ao pôster em **todo card da grade** (seja na listagem, na busca ou nos favoritos) e como um botão ao lado do título na **tela de detalhes** — ou seja, dá para favoritar um filme em qualquer um dos três lugares onde ele aparece, e o estado (favoritado ou não) fica sincronizado entre eles porque vem todos da mesma fonte, o `FavoritesContext`.

**8. A funcionalidade implementada é real (ex: login funcional) ou uma simulação de interface (ex: preço mockado)? Justifiquem a escolha.**

As duas são **reais**, não simulações. A busca faz uma chamada de verdade ao endpoint de busca do TMDb e mostra resultados reais (inclusive o estado de "nenhum resultado" acontece de verdade quando a API não retorna nada). Os favoritos são persistidos de verdade no `AsyncStorage` do dispositivo — fechar e reabrir o app mantém a lista de favoritos, porque não é um estado só na memória, é gravado em disco. A escolha por implementações reais (em vez de mockadas) foi possível justamente porque as duas categorias escolhidas (descoberta e personalização local) não exigem nenhum backend que o grupo não tem — diferente de login ou preço, que exigiriam mockar uma infraestrutura inteira para simular algo que pareça funcional.

## 3. Refinamento da experiência

**9. Quais estados vazios (ex: busca sem resultado) foram tratados? O que o usuário vê nesses casos?**

Dois estados vazios novos, além do estado de erro que já existia desde o MVP:
- **Busca sem resultado**: em vez de uma tela em branco, aparece um ícone de lupa, o título "Nenhum filme encontrado" e uma mensagem citando o termo buscado, sugerindo tentar outro título — a barra de busca continua visível e usável, então dá para tentar de novo sem perder o contexto.
- **Lista de favoritos vazia**: aparece um ícone de coração vazio, o título "Nenhum favorito ainda" e uma instrução direta ("toque no ícone de coração em um filme para adicioná-lo aos favoritos").

Os dois reaproveitam o mesmo componente `EmptyState`, para manter a mesma linguagem visual (ícone + título + mensagem) em vez de cada tela inventar seu próprio jeito de mostrar "vazio".

**10. O que mudou na experiência de uso depois da revisão cruzada com outro participante do grupo? Algum ponto de confusão foi identificado?**

O app foi testado ativamente durante o desenvolvimento (fora do simulador padrão — no Expo Web e simulando diferentes larguras de tela) e isso revelou dois problemas reais de UX que foram corrigidos antes desta etapa: (1) nas setas de navegação do navegador (voltar/avançar), o app não tinha URL própria por tela, então as setas do navegador não levavam de volta à listagem — corrigido configurando `linking` no React Navigation, para que cada tela tenha sua própria URL; (2) os pôsteres sempre baixavam uma resolução fixa (`w200`/`w500`), ficando desnecessariamente pesados em telas pequenas e borrados em telas grandes — corrigido calculando a resolução ideal a partir da largura real do card/pôster na tela. **Pendência**: a revisão cruzada formal com o app de **outro grupo da turma** (conforme pedido no enunciado) ainda precisa ser feita pela equipe — este documento foi gerado durante o desenvolvimento e não teve acesso ao repositório de nenhum outro grupo.

**11. O que foi removido ou reorganizado na limpeza do código (código morto, imports não usados, nomenclatura)?**

- A constante `POSTER_ASPECT_RATIO`, que estava duplicada (com o mesmo valor e comentário) em `MovieCard.js` e `MovieDetailScreen.js`, foi movida para um único lugar em `src/services/movieUtils.js` e importada nos dois.
- A função `isFavorite` do `FavoritesContext` reimplementava a mesma checagem do helper interno `isFavoriteIn` — agora `isFavorite` apenas chama `isFavoriteIn`, sem duplicar a lógica.
- O estado `loaded` do `FavoritesContext` estava sendo calculado mas nunca lido em lugar nenhum — em vez de removê-lo, ele foi conectado à tela de Favoritos, que agora mostra um indicador de carregamento enquanto os favoritos ainda não foram lidos do armazenamento local (evita mostrar "nenhum favorito" por um instante antes da leitura terminar).
- Em `MovieListScreen.js`, a lógica de "buscar pelo termo atual ou recarregar os populares" estava escrita de forma parecida em dois lugares (troca de texto e botão de tentar novamente); foi extraída para uma função única (`loadForQuery`).
- A chave da API do TMDb, que estava com o valor exposto direto no código-fonte desde o MVP, foi movida para uma variável de ambiente (`EXPO_PUBLIC_TMDB_API_KEY`, lida de um `.env` fora do controle de versão).

**12. Os testes automatizados escritos na etapa do MVP ainda passam depois das mudanças desta etapa? Se algum quebrou, o que foi ajustado?**

Sim, os testes da etapa do MVP continuam passando, mas dois deles precisaram de ajuste porque `MovieCard` passou a depender do `FavoritesContext` (para saber se o filme está favoritado): os testes de `MovieCard.test.js` agora envolvem o componente em um `FavoritesProvider` ao renderizar, já que essa é a forma como o componente realmente é usado dentro do app. Também foi preciso configurar um mock de teste para o `AsyncStorage` (`jest.setup.js`), porque o módulo nativo não existe no ambiente de testes. Foram adicionados 4 testes novos: busca com sucesso e com erro em `movieService.test.js`, a função de resolução responsiva de pôster em `movieUtils.test.js`, o toggle de favorito em `MovieCard.test.js`, e o comportamento de adicionar/remover favorito em `FavoritesContext.test.js` — totalizando 16 testes, todos passando.

**13. O README atual documenta o que o app faz, como rodar o projeto e as principais decisões tomadas? O que foi adicionado nesta etapa?**

Sim. Nesta etapa o README ganhou: uma seção "O que o app faz" resumindo todas as funcionalidades (incluindo busca e favoritos); uma seção de identidade visual explicando a paleta, a tipografia e o ícone/splash; uma seção explicando qual(is) categoria(s) do cardápio pós-MVP foram escolhidas e por quê; a árvore de pastas atualizada com os arquivos novos (`context/`, `favoritesService.js`, `MovieGrid.js`, etc.); a lista de testes atualizada; o passo a passo de configuração da API key via `.env` (em vez de editar o código-fonte); instruções para gerar um build de teste via EAS; e uma seção final resumindo as decisões tomadas nesta etapa.

## 4. Build e fechamento

**14. O grupo conseguiu gerar um build de teste (ex: build de preview via Expo)? Se não, qual foi o obstáculo?**

Não foi possível gerar o build **neste ambiente de desenvolvimento**. Dois obstáculos: (1) não há Android SDK/Gradle instalado localmente, então um build nativo local (`expo run:android`) não é viável nesta máquina; (2) a alternativa — build em nuvem via **EAS Build** — exige login em uma conta Expo (`eas login`), que depende de credenciais pessoais do grupo e não pode ser feito por quem está assistindo o desenvolvimento. Para deixar o caminho pronto, foi criado o arquivo `eas.json` com um perfil `preview` (gera um `.apk` de instalação direta, sem precisar de loja de aplicativos) — falta só a equipe rodar `npx eas login` seguido de `npx eas build --profile preview --platform android` com a própria conta.

**15. Olhando o app finalizado, o que ele tem hoje que o MVP original não tinha — e o que ainda ficaria para uma futura versão?**

O que tem hoje e o MVP não tinha: busca por título, favoritos persistidos localmente (com uma tela própria para eles), formatação de data no padrão brasileiro, resolução de imagem responsiva à largura real da tela, navegação com URL própria por tela (voltar/avançar do navegador funcionando), estados vazios tratados (busca sem resultado, favoritos vazio), identidade visual própria (paleta, tipografia, ícone e splash screen) e a chave de API fora do código-fonte. Ficaria para uma futura versão: login/cadastro de usuário (para sincronizar favoritos entre aparelhos, em vez de ficarem só localmente), notificações (uma vez que exista um gatilho de negócio real por trás), paginação/scroll infinito na listagem e na busca (hoje mostra só a primeira página de resultados da API), e mover os favoritos de local-only para um backend próprio caso o app cresça além do escopo acadêmico.
