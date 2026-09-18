# CineLog 🎬

Aplicativo mobile desenvolvido em **React Native** com **Expo**, como projeto acadêmico (OAT). O app consome a API pública do TMDb, exibindo filmes populares, permitindo buscar por título, ver detalhes de cada filme e salvar favoritos localmente no dispositivo.

## Alunos

- Levi Ramos Barbosa Santos
- Julio Cesar Brito da Silva
- Ana Luiza Lima Nicolodi

## O que o app faz

- **Lista filmes populares** (TMDb), com pôster, título e ano.
- **Busca por título**, em tempo real (com debounce), usando o endpoint de busca do TMDb.
- **Detalhes do filme**: pôster, sinopse, data de lançamento (formatada em `DD/MM/AAAA`), gêneros, avaliação e duração.
- **Favoritos**: toque no coração em qualquer filme (na lista, na busca ou nos detalhes) para salvá-lo localmente no aparelho; a tela de Favoritos (ícone no topo) lista tudo o que foi marcado.
- **Estados vazios tratados**: busca sem resultado e lista de favoritos vazia mostram uma mensagem clara, não uma tela em branco.
- **Loading e erro com retry** em toda chamada de rede (lista, busca e detalhes).
- **Layout responsivo**: número de colunas, tamanho de card e resolução da imagem do pôster se adaptam à largura da tela (celular, tablet ou navegador).

## Identidade visual

- **Paleta "Cinema Noir"**: fundo escuro (`#141218`), superfícies em cinza-chumbo (`#211D26`/`#2B2632`) e dourado (`#E8B94C`) como cor de destaque — usado em avaliação, botões, favoritos marcados e no ícone do app. Combina com a proposta de um catálogo de filmes: remete a sala de cinema/tapete vermelho sem cair no clichê do vermelho puro, e o dourado funciona bem tanto para "destaque" quanto para "favorito".
- **Tipografia**: **Poppins** (semibold/bold) nos títulos e cabeçalhos, **Inter** no texto corrido — definidas em [`src/theme/colors.js`](src/theme/colors.js) e [`src/theme/typography.js`](src/theme/typography.js) e carregadas uma única vez em `App.js`, então todas as telas puxam dessas mesmas fontes/cores em vez de valores soltos.
- **Ícone e splash screen**: gerados a partir da mesma marca (círculo dourado com um "play" recortado no meio, sobre o fundo escuro da paleta) — ver [`scripts/generate_icons.py`](scripts/generate_icons.py) e os arquivos em `assets/`. Cobre ícone padrão, ícone adaptativo do Android (camadas de fundo/frente/monocromática) e splash screen.
- **Consistência entre telas**: listagem, detalhes e favoritos reutilizam os mesmos componentes (`MovieGrid`, `MovieCard`, `FavoriteButton`, `Loading`, `ErrorMessage`, `EmptyState`) e o mesmo cabeçalho de navegação estilizado — nenhuma tela define cor, espaçamento ou fonte "na mão".

## Tecnologias e bibliotecas

| Necessidade | Biblioteca | Função |
|---|---|---|
| Navegação | `@react-navigation/native` + `@react-navigation/native-stack` | Navegar entre listagem, detalhes e favoritos |
| Consumo de API | `axios` | Requisições HTTP (populares, busca, detalhes) |
| Ícones | `@expo/vector-icons` | Ícones da interface (busca, favorito, voltar) |
| Tipografia | `@expo-google-fonts/poppins` + `@expo-google-fonts/inter` | Fontes customizadas |
| Favoritos locais | `@react-native-async-storage/async-storage` | Persiste a lista de favoritos no dispositivo, sem backend/login |
| Splash screen | `expo-splash-screen` | Configura a tela de abertura com a marca do app |
| Web (opcional) | `react-dom` + `react-native-web` | Rodar o app também no navegador (`npx expo start --web`) |

A API de filmes utilizada é a [TMDb (The Movie Database)](https://www.themoviedb.org/).

## Funcionalidade pós-MVP escolhida

O grupo implementou duas categorias do cardápio pós-MVP:

1. **Descoberta (busca por título)** — a mais barata de implementar: usa um endpoint que o TMDb já expõe (`/search/movie`), sem precisar de backend próprio nem de dados sensíveis.
2. **Personalização (favoritos)** — implementada **sem** exigir login: os favoritos são salvos localmente no dispositivo com `AsyncStorage`, então nenhum backend de autenticação foi necessário.

Categorias descartadas: **login/cadastro** (exigiria um backend de autenticação real, fora do escopo do curso nesta etapa), **preço/monetização** (não haveria o que "vender" de verdade num catálogo de descoberta, ficaria um mock sem função) e **notificações** (não existe, ainda, um gatilho de negócio real no app — como um filme novo sendo adicionado por um backend — que justifique uma notificação; seria só uma simulação vazia).

## Estrutura de pastas

```
CineLog/
├── App.js
├── assets/                    # ícone, splash e favicon (paleta Cinema Noir)
├── scripts/
│   └── generate_icons.py      # gera os PNGs de assets/ a partir da marca do app
├── src/
│   ├── screens/
│   │   ├── MovieListScreen.js     # lista + busca
│   │   ├── MovieDetailScreen.js
│   │   └── FavoritesScreen.js
│   ├── components/
│   │   ├── MovieGrid.js           # grade responsiva reaproveitada por lista e favoritos
│   │   ├── MovieCard.js
│   │   ├── SearchBar.js
│   │   ├── FavoriteButton.js
│   │   ├── FavoritesHeaderButton.js
│   │   ├── EmptyState.js          # busca sem resultado / sem favoritos
│   │   ├── Loading.js
│   │   ├── ErrorMessage.js
│   │   └── BackButton.js
│   ├── context/
│   │   └── FavoritesContext.js    # estado global de favoritos (React Context)
│   ├── services/
│   │   ├── movieService.js        # populares, busca, detalhes (TMDb)
│   │   ├── movieUtils.js          # funções puras (data, resolução de pôster)
│   │   └── favoritesService.js    # leitura/escrita no AsyncStorage
│   └── theme/
│       ├── colors.js
│       └── typography.js
```

- **screens/** → telas do aplicativo
- **components/** → componentes reutilizáveis
- **context/** → estado compartilhado entre telas (favoritos)
- **services/** → comunicação com a API, persistência local e funções utilitárias puras
- **theme/** → paleta de cores e famílias de fonte usadas em todo o app

## Telas

### Lista de Filmes
Exibe o pôster, título e ano dos filmes populares, com uma barra de busca no topo. Tocar em um filme abre os detalhes; tocar no coração marca/desmarca como favorito sem sair da tela.

### Busca
Digitar na barra de busca da listagem consulta o TMDb por título (com um pequeno atraso/debounce para não disparar uma requisição a cada tecla). Se não houver resultados, aparece um estado vazio explicando o que aconteceu.

### Detalhes do Filme
Exibe pôster, título, sinopse, data de lançamento (formatada), gênero, avaliação e duração do filme selecionado, além do botão de favoritar.

### Favoritos
Acessível pelo ícone de coração no topo da listagem. Mostra a grade de filmes favoritados; se estiver vazia, exibe uma mensagem explicando como adicionar o primeiro.

## Fluxo de dados

```
API (populares OU busca)
 ↓
Lista de Filmes
 ↓
Usuário toca em um filme
 ↓
ID do filme é enviado pela navegação
 ↓
Tela de Detalhes
 ↓
Nova requisição à API com o ID
 ↓
Informações completas do filme
```

A tela de detalhes recebe apenas o **ID** do filme pela navegação e faz uma nova requisição à API, evitando transportar grandes quantidades de dados entre as telas. Os favoritos seguem um fluxo à parte: ficam em `FavoritesContext` (memória) e são persistidos no `AsyncStorage` a cada alteração, independente de rede.

## Tratamento de erros e estados vazios

- Quando uma requisição à API falha (sem internet, timeout, etc.), a tela exibe uma mensagem de erro com um botão **"Tentar novamente"**, que refaz a mesma chamada (populares, busca ou detalhes) sem precisar sair da tela.
- Uma **busca sem resultados** mostra um estado vazio dedicado ("Nenhum filme encontrado"), diferente da tela de erro — não é uma falha, é uma resposta válida da API.
- A **lista de favoritos vazia** mostra uma mensagem explicando como favoritar o primeiro filme, em vez de uma tela em branco.

## Testes

O projeto possui testes automatizados com **Jest** + **jest-expo** (lógica React Native) e **@testing-library/react-native** (renderização de componentes).

- `src/services/__tests__/movieService.test.js` — testa `getPopularMovies`, `getMovieDetails` e `searchMovies` com o axios mockado, cobrindo o caminho de sucesso e o de erro de cada um.
- `src/services/__tests__/movieUtils.test.js` — testa `formatReleaseDate` (conversão de data para o padrão brasileiro) e `getResponsivePosterSize`/`getResponsivePosterUrl` (escolha do tamanho de imagem do TMDb conforme a largura da tela).
- `src/components/__tests__/MovieCard.test.js` — renderiza o `MovieCard` com dados fixos (mock), verifica o texto exibido, o disparo do `onPress` e o toggle de favorito (ícone de coração preenchido/vazio).
- `src/context/__tests__/FavoritesContext.test.js` — verifica que `toggleFavorite` adiciona e remove um filme da lista de favoritos.

Todos os testes escritos na etapa do MVP continuam passando; os dois que dependiam de componentes agora conectados ao contexto de favoritos (`MovieCard.test.js`) foram ajustados para renderizar dentro de um `FavoritesProvider`, já que isso reflete como o componente é realmente usado no app.

Para rodar os testes:

```bash
npm test
```

## Como executar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org) (LTS)
- App **Expo Go** instalado no celular (ou emulador Android/iOS configurado)

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd CineLog
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure sua chave da API do TMDb:
   ```bash
   cp .env.example .env
   ```
   e edite o `.env`, preenchendo `EXPO_PUBLIC_TMDB_API_KEY` com uma chave obtida em [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api). O `.env` não é commitado (está no `.gitignore`).

4. Inicie o projeto:
   ```bash
   npx expo start
   ```

5. Escaneie o QR Code exibido no terminal com o app **Expo Go**, ou pressione `a` (Android) / `i` (iOS) se tiver um emulador configurado.
6. TENHA CALMA !! as imagens vão carregar !😂😂

## Build de teste

Para gerar um build instalável (fora do Expo Go), o projeto já tem um [`eas.json`](eas.json) com um perfil `preview` (gera um `.apk` de instalação direta no Android). Para gerar:

```bash
npx eas login
npx eas build --profile preview --platform android
```

Isso exige uma conta Expo (gratuita) logada via `eas login` — passo que só quem está com as credenciais do grupo consegue fazer, por isso não foi executado neste ambiente de desenvolvimento. Ao terminar, o EAS devolve um link para baixar o `.apk` direto no celular.

## Decisões tomadas nesta etapa

- **Busca e favoritos foram escolhidos** em vez de login ou notificações porque nenhum dos dois precisa de um backend novo: a busca usa um endpoint que o TMDb já oferece, e os favoritos ficam só no dispositivo.
- **A `API_KEY` do TMDb saiu do código-fonte** e passou para uma variável de ambiente (`EXPO_PUBLIC_TMDB_API_KEY`, lida via `.env`) — ponto que já tinha sido identificado como pendência na etapa do MVP.
- **A lógica de grade responsiva foi extraída** para um componente (`MovieGrid`) compartilhado entre a listagem e os favoritos, em vez de duplicada nas duas telas.
- **Nome e ícone finais**: o app passou a se chamar **CineLog**, com ícone e splash screen próprios (ver seção de Identidade Visual).

