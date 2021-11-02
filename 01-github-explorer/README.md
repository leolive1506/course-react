# 1. Configuração ambiente
## Oq React
* Biblioteca p criação de interface
    * Web, moblie, tv, realidade virtual
* Single page aplication
    * Apenas o front com backend separado (API)
* Atualiza somente conteudo que sofreu alteração

## Criando estrutura
```
yarn add react
yarn add react-dom
```

* React-dom
    * Faz com que react se comunique com html

## Babel
* Converte código para browser entenderem
```
yarn add @babel/core @babel/cli @babel/preset-env -D
```
* Babel core -> Maioria funcionalidades babel
* Babel cli -> Comandos terminal
* Babel present-env -> Biblioteca que identica ambiente que ta sendo executada pra converter código da melhor maneira possível

* Usar p converter
    ```
    yarn babel src/index.js --out-file dist/bundle.js
    ```
    * out-file -> Qual arquivo quer gerar a partir do arquivo inicial

* Pra ele entender código react
    ```
    yarn add @babel/preset-react -D
    ```
* Criar um `babel.config.js`
    ```js
    module.exports = {
        presets: [
            "@babel/preset-env",
            ["@babel/preset-react", {
                runtime: "automatic" // pra não precisa import React from 'react' em todo arquivo
            }]
        ]
    }
    ```

## Webpack
* Inseri config de como tratar cada tipo arquivo e converte em arquivo que o browser entende
    * Ex: Inserir estilo no código
        ```ts
        import "./styles/styles.scss"
        ```

    ```
    yarn add webpack webpack-cli webpack-dev-server babel-loader -D
    ```
    * babel-loader 
        * Integração entre babel e webpack
    * Criar um webpack.config.js
    ```js
    const path = require("path")

    module.exports = {
        entry: path.resolve(__dirname, 'src', 'index.jsx'), //arquivo inicial da aplicação
        output: { //arquivo que vai gerar com webpack
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js"
        },

        resolve: {
            extensions: ['.js', '.jsx']  //extensões de arquivos que vai ler
        },
          

        module: { // como vai se comportar quando estiver importanto diversos tipo de arquivos
            rules: [ //array de regras
                // definir um obj pra cada tipo de arquivo
               {
                    test: /\.jsx$/,
                    exclude: /node_modules/, // excluir todos file dentro node_modules que ja são arquivos pronto p browser ler ja que isso é responsabilidade da biblioteca 
                    use: 'babel-loader'
                }
                    
            ]
        }
    }
    ```

    * Fazer Build com webpack
        ```
        yarn webpack
        ```

## Estrutura ReactJS
    ```jsx
    import { render } from "react-dom"

    //render(oq vai exebir em tela, dentro qual elemento)
    render(<h1>Test</h1>, document.getElementById("root"))
    ```

## Servindo HTML estático
* Existe um plugin webpack que injeta arquivo js no html pra não preocupar em ficar injetando arquivo no html
```
yarn add html-webpack-plugin -D
```
* Add no webpack.config.js
    ```js
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    // dentro module.exports
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ],
    ```

## Webpack Dev Server
```
yarn add webpack-dev-server -D
```
* Automatizar o `yarn webpack` a cada vez que houver alterações
* No webpack.congig.js, dentro module.exports
    ```js
    devServer: {
        static: path.resolve(__dirname, "public")
    },
    ```

* Para executar (abre em  [PORTA 8080](http://localhost:8080/))
    ```
    yarn webpack serve
    ```

## Source maps
* Forma conseguir visualizar código original app mesmo quando código está no bundle.js
    * Ex: Se não usar, consta a linha do bundle.js e não arquivo original
* Existem souce map pra desenvolvimento e produção
* Dentro webpack.config.js, dentro de module.exports
``` js
devtool: "eval-source-map",
```

### Ambiente dev e produção
* Cross-env -> definir variaveis ambientes independente sistema operacional
```
yarn add cross-env -D
```

* NODE_ENV -> variavel ambiente verificando se é dev ou produção
```js
const isDevelopment = process.env.NODE_ENV
mode: isDevelopment ? "development" : "production",
devtool: isDevelopment ? "eval-source-map" : "source-map",
```

* package.json
```json
"scripts": {
    "dev": "webpack serve",
    "build": "cross-env NODE_ENV=production webpack"
  },
```

## Importando arquivo css
```
yarn add style-loader css-loader -D
```

* `Usando SASS`
    ```
    yarn add node-sass
    yarn add sass-loader -D
    ```

    * Dentro de module: {rules []}
    ```js
    {   // regra p arquivos scss
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
    }
    ```