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

## Ponto de atenção

- A comunicação com a API é centralizada em `services/movieService.js`, evitando espalhar URLs e regras de requisição pela aplicação.
- A chave da API não deve ser versionada publicamente; o ideal é movê-la para uma variável de ambiente (`.env`) futuramente.
- É necessário manter a compatibilidade entre as versões do Expo, React Native e as bibliotecas utilizadas.
