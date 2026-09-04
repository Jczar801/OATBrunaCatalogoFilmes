# Pesquisa de Bibliotecas

## 1. Quais bibliotecas o grupo escolheu?

| Necessidade | Biblioteca escolhida | Função |
|---|---|---|
| Navegação | `@react-navigation/native` + `@react-navigation/native-stack` | Navegar entre listagem e detalhes |
| Consumo de API | `axios` | Fazer requisições HTTP para buscar os filmes |
| Ícones | `@expo/vector-icons` | Utilizar ícones na interface |

## 2. Por que escolheram essas bibliotecas?

**React Navigation:** foi escolhida porque é uma das soluções mais utilizadas no ecossistema React Native, possui documentação ampla e permite criar facilmente navegação entre telas, como a tela de filmes e a tela de detalhes.

**Axios:** foi escolhido por facilitar o consumo de APIs REST, oferecendo uma sintaxe simples para requisições GET, tratamento de erros e organização da comunicação com o servidor.

**Expo Vector Icons:** foi escolhido porque possui integração direta com projetos Expo e oferece diversos conjuntos de ícones, evitando a necessidade de instalar e configurar manualmente bibliotecas de ícones nativas.

## 3. Alguma precisa ser instalada com `npx expo install`?

Sim. As bibliotecas relacionadas ao ambiente Expo devem ser instaladas preferencialmente utilizando:

```bash
npx expo install @expo/vector-icons
```

O `expo install` verifica a versão do SDK do Expo utilizada no projeto e tenta instalar uma versão compatível da dependência.

Para bibliotecas JavaScript independentes do ambiente nativo, como o Axios, podemos utilizar:

```bash
npm install axios
```

Para o React Navigation, também devemos instalar suas dependências de acordo com a versão do Expo/React Native utilizada.

## 4. Como verificaram se as bibliotecas são bem mantidas e documentadas?

O grupo verificou:

- documentação oficial;
- quantidade de downloads e utilização pela comunidade;
- atualizações recentes;
- compatibilidade com versões atuais do React Native/Expo;
- existência de exemplos e tutoriais;
- quantidade de issues e atividade dos repositórios oficiais.

## 5. Existe alguma limitação ou ponto de atenção?

Sim. O principal ponto de atenção é a compatibilidade das versões entre Expo, React Native e as bibliotecas utilizadas.

Além disso, a API de filmes pode possuir limites de requisições ou exigir uma chave de acesso. Por isso, a comunicação com a API deve ser centralizada e os erros devem ser tratados adequadamente.

## 6. Quais telas o app vai ter?

Inicialmente, o aplicativo terá duas telas principais:

### Tela 1 — Lista de Filmes

Exibe:

- pôster do filme;
- título;
- ano de lançamento, se disponível;
- possibilidade de tocar no filme para visualizar seus detalhes.

Os dados serão obtidos através da API de filmes.

### Tela 2 — Detalhes do Filme

Exibe informações completas do filme selecionado, como:

- pôster;
- título;
- sinopse;
- ano de lançamento;
- gênero;
- avaliação;
- duração;
- outras informações disponibilizadas pela API.

## 7. Como os dados vão fluir entre as telas?

- A tela de listagem receberá os filmes através da API.
- Quando o usuário tocar em um filme, o aplicativo enviará o ID do filme para a tela de detalhes através da navegação.

O fluxo será:

```text
API
 ↓
Lista de Filmes
 ↓
Usuário toca em um filme
 ↓
ID do filme é enviado
 ↓
Tela de Detalhes
 ↓
Informações completas do filme
```

Uma possibilidade é passar apenas o ID e fazer uma nova requisição à API na tela de detalhes. Isso evita transportar uma grande quantidade de informações pela navegação.

## 8. Por que separar `screens/`, `components/` e `services/`?

Porque essa separação organiza o projeto e facilita sua manutenção.

- `screens/` → contém as telas do aplicativo.
- `components/` → contém componentes reutilizáveis.
- `services/` → contém a comunicação com APIs e outras fontes externas.
- `assets/` → contém imagens, fontes e outros arquivos estáticos.

Se todo o código estivesse em um único arquivo, seria mais difícil encontrar, modificar e reutilizar determinadas partes do sistema.

Essa organização também facilita o trabalho em equipe, pois cada integrante consegue trabalhar em diferentes partes do projeto.

## 9. Quais componentes reutilizáveis serão necessários?

O grupo já consegue identificar:

### MovieCard

Responsável por mostrar:

- pôster;
- título;
- informações resumidas.

### Loading

Para indicar que os filmes estão sendo carregados.

### ErrorMessage

Para informar quando ocorreu algum problema na API.

### BackButton

Para retornar à tela anterior.

Também poderá existir um componente de busca:

### SearchBar

Caso o grupo implemente pesquisa de filmes.

## 10. Onde ficará a comunicação com a API?

A comunicação ficará centralizada em:

```text
services/
```

Por exemplo:

```text
services/
└── movieService.js
```

Esse arquivo ficará responsável pelas requisições relacionadas aos filmes.

Isso é uma boa prática porque evita espalhar URLs, requisições e regras de comunicação pela aplicação inteira.

Por exemplo:

```text
screens
   ↓
movieService.js
   ↓
API
```

Se futuramente a API mudar, será possível alterar principalmente o `movieService.js`, sem precisar modificar todas as telas.

## 11. Estrutura de pastas

A estrutura inicial pode ser:



## 12. README.md

## 13. Por que documentar as decisões desde o início?

Documentar as decisões ajuda o grupo a manter um entendimento comum sobre o projeto.

O README registra quais bibliotecas foram escolhidas, como o projeto está organizado e qual é o objetivo de cada pasta.

Isso também facilita a entrada de novos integrantes e evita que decisões importantes sejam esquecidas durante o desenvolvimento.

## 14. O README seria suficiente para outra pessoa entender o projeto?

Sim, para uma visão inicial do projeto.

O README apresenta:

- objetivo;
- tecnologias;
- bibliotecas;
- estrutura de pastas;
- telas;
- fluxo dos dados;
- instruções para executar o projeto.

Conforme o projeto evoluir, o README poderá ser atualizado com informações adicionais, como configuração da API, variáveis de ambiente e funcionalidades implementadas.

## 15. O que o primeiro commit representa?

O primeiro commit representa o ponto inicial oficial do desenvolvimento.

Ele registra o projeto criado, sua estrutura inicial, as bibliotecas escolhidas e a documentação inicial.

É como estabelecer uma primeira versão funcional da base do projeto.

## 16. Por que versionar desde o início?

Porque o Git permite acompanhar toda a evolução do projeto.

Começar o versionamento desde o início permite:

- recuperar versões anteriores;
- identificar alterações;
- desfazer alterações problemáticas;
- trabalhar em equipe;
- registrar quem realizou cada alteração;
- evitar perda de código.

Não é necessário esperar o aplicativo ficar pronto para começar a utilizar controle de versão.

## 17. O que ficará fora do controle de versão?

Principalmente:

```text
node_modules/
```

porque contém as dependências instaladas e pode ser recriado utilizando:

```bash
npm install
```

