# MVP Funcional — Catálogo de Filmes

## 1. Tela de listagem

**1. Como ficou a estrutura do componente de card de filme? Ele foi feito para ser reutilizado em outros pontos do app?**

O componente `MovieCard` (`src/components/MovieCard.js`) recebe apenas duas props: `movie` (o objeto do filme) e `onPress` (função chamada ao tocar no card). Ele não conhece a origem dos dados nem a navegação — só exibe pôster, título e ano, e delega o toque para quem o usa. Isso o torna reutilizável em qualquer lista de filmes (populares, favoritos, resultado de busca, etc.), bastando passar um objeto de filme e um callback diferente.

**2. De onde vêm os dados exibidos na lista — de uma chamada direta à API na própria tela ou de uma função centralizada em services/?**

Vêm de `getPopularMovies()`, centralizada em `src/services/movieService.js`. A tela (`MovieListScreen`) não sabe nada sobre URL, chave de API ou formato da resposta HTTP — apenas chama a função e recebe a lista já tratada.

**3. O que acontece na tela enquanto os dados ainda estão sendo carregados?**

O estado `loading` começa `true`, e enquanto isso o componente `Loading` (um `ActivityIndicator` centralizado) é exibido no lugar da lista. Só quando a requisição termina (com sucesso ou erro) é que a tela decide o que renderizar.

## 2. Navegação e tela de detalhes

**4. Qual biblioteca de navegação foi usada e como os dados do filme selecionado são passados para a tela de detalhes?**

`@react-navigation/native-stack`. Ao tocar em um filme, a lista chama `navigation.navigate('MovieDetail', { movieId: item.id })` — ou seja, só o **ID** do filme é passado pelos parâmetros de rota, não o objeto completo.

**5. A tela de detalhes busca os dados novamente na API ou reaproveita os dados recebidos da tela de listagem? Qual foi a decisão do grupo e por quê?**

Busca novamente, usando `getMovieDetails(movieId)`. A decisão foi passar só o ID para não transportar objetos grandes pela navegação e porque o endpoint de detalhes da API retorna campos que não vêm no endpoint de listagem (como `runtime` e `genres`), então uma nova requisição é necessária de qualquer forma.

**6. É possível voltar da tela de detalhes para a listagem sem perder o estado da lista (ex: posição do scroll)?**

Sim. Como o React Navigation mantém a tela de listagem montada na pilha (não a desmonta ao navegar para os detalhes), o estado do componente — incluindo a posição de scroll do `FlatList` — é preservado ao voltar com o `BackButton`.

## 3. Tratamento de estados (loading e erro)

**7. O que o usuário vê se a API demorar para responder? E se a requisição falhar (ex: sem internet)?**

Enquanto a resposta não chega, o usuário vê o indicador de carregamento (`Loading`). Se a requisição falhar, o `movieService` captura o erro do axios e relança uma mensagem amigável em português (ex: "Não foi possível carregar os filmes."), exibida pelo componente `ErrorMessage`.

**8. O grupo implementou alguma forma de tentar novamente (retry) após um erro? Por que isso é importante em apps mobile?**

Sim — nesta etapa foi adicionado um botão **"Tentar novamente"** dentro do `ErrorMessage`, que recebe a mesma função de carregamento (`loadMovies` ou `loadDetails`) usada no `useEffect` inicial e a executa novamente. Isso é importante porque em mobile a conectividade é instável (o usuário pode estar em movimento, com sinal fraco, em modo avião etc.), e obrigar a pessoa a fechar e reabrir o app para tentar de novo é uma péssima experiência.

## 4. Testes manuais do MVP

**9. Em quais dispositivos/ambientes o grupo testou o app? Quais diferenças de comportamento ou de layout foram observadas entre eles?**

O app foi testado via Expo Go em Android e no modo web (`npx expo start --web`). No modo web, o layout em grade de 2 colunas do `FlatList` se comporta de forma um pouco diferente (sem o efeito nativo de "bounce" do scroll), mas os fluxos de navegação, loading e erro funcionaram da mesma forma nos dois ambientes.

**10. Quais bugs ou comportamentos inesperados foram encontrados durante os testes manuais? Como foram corrigidos?**

O principal ponto encontrado foi a ausência de uma forma de recuperação quando a API falhava: antes desta etapa, um erro de rede deixava o usuário "preso" na tela de erro, sem nenhuma ação possível além de fechar o app. Isso foi corrigido com a adição do botão de retry.

**11. Por que testar em mais de um ambiente é especialmente importante em desenvolvimento mobile híbrido?**

Porque frameworks como o Expo/React Native compilam para múltiplas plataformas (Android, iOS, Web) a partir do mesmo código, mas cada plataforma tem sua própria engine de renderização e comportamento de componentes nativos. Um bug de layout ou uma API do dispositivo podem se comportar de forma diferente (ou nem existir) em uma plataforma específica, então testar só em um ambiente pode esconder problemas que só aparecem para parte dos usuários finais.

## 5. Teste automatizado simples

**12. Qual ferramenta de teste foi usada (ex: Jest, React Native Testing Library) e por que essa foi a escolha do grupo?**

Foram usados **Jest** (com o preset `jest-expo`, que já configura o ambiente para React Native/Expo) e **@testing-library/react-native**. Essa combinação foi escolhida por ser o padrão recomendado pela própria documentação do Expo e por permitir testar tanto lógica pura (funções de `services/`) quanto a renderização de componentes de forma simples, sem precisar de um emulador rodando.

**13. O que exatamente o teste escrito verifica? O que ele NÃO cobre (limitações)?**

Foram escritos dois arquivos de teste:

- `src/services/__tests__/movieService.test.js`: mocka o axios e verifica que `getPopularMovies` e `getMovieDetails` chamam o endpoint correto e retornam os dados no formato esperado, além de verificar que, quando a chamada falha, a função lança a mensagem de erro amigável correta.
- `src/components/__tests__/MovieCard.test.js`: renderiza o `MovieCard` com um objeto de filme fixo (mock) e verifica se o título e o ano aparecem na tela corretamente, e se `onPress` é chamado ao tocar no card.

O que **não** é coberto: a integração real com a API do TMDb (os testes não fazem nenhuma requisição de rede de verdade), a navegação entre telas, e o comportamento visual/estilo dos componentes.

**14. Qual a diferença entre o que esse teste automatizado garante e o que os testes manuais da Etapa 4 garantem?**

O teste automatizado garante, de forma rápida e repetível, que uma função ou componente isolado continua se comportando como esperado a cada mudança no código (ex: se alguém alterar `movieService.js` e quebrar o tratamento de erro, o teste falha imediatamente). Já o teste manual garante que o **fluxo completo do app**, incluindo navegação, chamadas reais à API e comportamento visual em um dispositivo real, funciona de ponta a ponta — algo que o teste automatizado, por ser isolado e mockado, não é capaz de verificar sozinho.

## 6. Documentação e commit

**15. O que foi acrescentado ao README nesta etapa? Isso é suficiente para outra pessoa entender o estado atual do MVP?**

Foram acrescentadas ao README: a seção de tratamento de erros (explicando o botão de retry), a seção de testes (como rodá-los e o que cada um cobre) e um aviso sobre a chave de API estar exposta no código. Combinado com o que já existia (tecnologias, estrutura de pastas, telas e fluxo de dados), o README agora descreve o estado atual do MVP de forma suficiente para outra pessoa entender o projeto e executá-lo, embora detalhes de configuração de ambiente (variáveis de ambiente, por exemplo) ainda possam ser aprofundados.

**16. O que esse commit representa em relação ao commit anterior (o do setup)? O grupo considera que o app já é um MVP utilizável? Por quê?**

O commit anterior representava apenas a base do projeto (estrutura de pastas, bibliotecas instaladas, nenhuma tela funcional). Este commit representa a transformação dessa base em um app navegável de ponta a ponta: lista de filmes reais, detalhes completos, tratamento de loading/erro com retry e testes automatizados cobrindo a lógica central. Sim, o grupo considera que o app já é um MVP utilizável — ele cumpre o fluxo principal (ver lista → abrir detalhes → voltar) de forma estável, mesmo sem funcionalidades extras como busca ou favoritos.

**17. Olhando para o app pronto até aqui, qual seria o próximo problema técnico ou funcional mais importante a resolver?**

Mover a `API_KEY` do TMDb para fora do código-fonte (variável de ambiente), já que hoje ela está commitada em texto puro no repositório público. Depois disso, a próxima prioridade funcional seria implementar uma busca de filmes, já que o MVP atual só mostra os populares.
