# App de Filmes 🎬

Aplicativo mobile desenvolvido em **React Native** com **Expo**, como projeto acadêmico (OAT). O app consome uma API pública de filmes, exibindo uma lista de filmes populares e permitindo visualizar os detalhes de cada um.

## Alunos

- Levi Ramos Barbosa Santos
- Julio Cesar Brito da Silva
- Ana Luiza Lima Nicolodi

## Tecnologias e bibliotecas

| Necessidade | Biblioteca | Função |
|---|---|---|
| Navegação | `@react-navigation/native` + `@react-navigation/native-stack` | Navegar entre a listagem e os detalhes do filme |
| Consumo de API | `axios` | Fazer requisições HTTP para buscar os filmes |
| Ícones | `@expo/vector-icons` | Ícones utilizados na interface |

A API de filmes utilizada é a [TMDb (The Movie Database)](https://www.themoviedb.org/).

## Estrutura de pastas

```
app-filmes/
├── App.js
├── src/
│   ├── screens/
│   │   ├── MovieListScreen.js
│   │   └── MovieDetailScreen.js
│   ├── components/
│   │   ├── MovieCard.js
│   │   ├── Loading.js
│   │   ├── ErrorMessage.js
│   │   └── BackButton.js
│   ├── services/
│   │   └── movieService.js
│   └── assets/
```

- **screens/** → telas do aplicativo
- **components/** → componentes reutilizáveis
- **services/** → comunicação com a API e outras fontes externas
- **assets/** → imagens, fontes e outros arquivos estáticos

## Telas

### Lista de Filmes
Exibe o pôster, título e ano de lançamento dos filmes populares, com a possibilidade de tocar em um filme para ver seus detalhes.

### Detalhes do Filme
Exibe pôster, título, sinopse, ano de lançamento, gênero, avaliação e duração do filme selecionado.

## Fluxo de dados

```
API
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

A tela de detalhes recebe apenas o **ID** do filme pela navegação e faz uma nova requisição à API, evitando transportar grandes quantidades de dados entre as telas.

## Tratamento de erros

Quando a requisição à API falha (sem internet, timeout, etc.), a tela exibe uma mensagem de erro com um botão **"Tentar novamente"**, que refaz a mesma chamada sem precisar sair da tela ou reiniciar o app.

## Testes

O projeto possui testes automatizados com **Jest** + **jest-expo** (telas/lógica React Native) e **@testing-library/react-native** (renderização de componentes).

- `src/services/__tests__/movieService.test.js` — testa `getPopularMovies` e `getMovieDetails` com o axios mockado, cobrindo tanto o caminho de sucesso quanto o de erro.
- `src/components/__tests__/MovieCard.test.js` — renderiza o `MovieCard` com dados fixos (mock) e verifica o texto exibido e o disparo do `onPress`.

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
   cd app-filmes
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure sua chave da API do TMDb em `src/services/movieService.js`, na constante `API_KEY`.

4. Inicie o projeto:
   ```bash
   npx expo start
   ```

5. Escaneie o QR Code exibido no terminal com o app **Expo Go**, ou pressione `a` (Android) / `i` (iOS) se tiver um emulador configurado.
6. TENHA CALMA !! as imagens vão carregar !😂😂

> ⚠️ **Ponto de atenção:** a `API_KEY` atual está com o valor exposto diretamente no código-fonte (commitado no repositório). Para um projeto real, o recomendado é mover essa chave para uma variável de ambiente (ex: `.env` + `react-native-dotenv` ou `expo-constants`) e adicionar o arquivo ao `.gitignore`.

