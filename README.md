# ListAnything-react

> Front-End do site ListAnything

ListAnything é um site designado para a criação de listas sobre quaisquer 'assuntos'.
Tais assuntos são divididos em 'abas' e são constituidos por um conjunto de 'campos'.

Clique [aqui](https://imgur.com/a/K2s8p) para ver algumas imagens do site.

**Observação:** Toda a parte base de login e cadastro de usuários foi retirada de um projeto desenvolvido por [Remchi](https://github.com/Remchi/bookworm-react).

## Desenvolvimento

### Construido com

* [React 3.7.2](https://www.npmjs.com/package/react)
* [Redux 3.7.2](https://www.npmjs.com/package/redux)
* [Semantic-ui-React 0.77.0](https://www.npmjs.com/package/semantic-ui-react)

### Pré-requisitos

* [NodeJS 8.9.1](https://nodejs.org/en/)
* [ListAnything-API](https://github.com/nogenem/list-anything-api)
* [Yarn 1.3.2](https://yarnpkg.com/pt-BR/) [Opcional]

### Setting up Dev

Para inicializar este projeto, primeiro é necessário seguir os passos descritos na parte de "Setting up Dev" do README da [API](https://github.com/nogenem/list-anything-api).
Em seguida, deve-se executar os seguintes comandos:
```shell
git clone https://github.com/nogenem/list-anything-react
cd list-anything-react
yarn install
yarn start
```

**Observação**: o comando yarn é opcional e pode ser trocado por npm:
```shell
npm install
npm start
```

## Guia de estilo de código

O código foi escrito utilizando:
* [Eslint 4.12.0](https://www.npmjs.com/package/eslint)
* [Eslint-config-airbnb 15.0.1](https://www.npmjs.com/package/eslint-config-airbnb)
* [Prettier 1.8.2](https://www.npmjs.com/package/prettier)

Além disso, ele foi escrito no [Visual Studio Code](https://code.visualstudio.com/) utilizando o plugin do [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) configurado para formatar o código automáticamente no salvamento dos arquivos.
