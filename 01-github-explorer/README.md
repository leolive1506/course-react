# Oq React
* Biblioteca p criação de interface
    * Web, moblie, tv, realidade virtual
* Single page aplication
    * Apenas o front com backend separado (API)
* Atualiza somente conteudo que sofreu alteração

# Criando estrutura
```
yarn add react
yarn add react-dom
```

* React-dom
    * Faz com que react se comunique com html

# Babel
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
            "@babel/preset-react",
        ]
    }
    ```

# Webpack
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
        entry: path.resolve(__dirname, "src", "index.jsx"), //arquivo inicial da aplicação
        output: { //arquivo que vai gerar com webpack
            path: path.resolve(__dirname, "dist"),
            filename: "bundle.js"
        },

        resolve: {
            extensions: ['.js', 'jsx'] //extensões de arquivos que vai ler
        },

        module: { // como vai se comportar quando estiver importanto diversos tipo de arquivos
            rules: [ //array de regras
                // definir um obj pra cada tipo de arquivo
                {
                    test: /\.js$/,
                    exclude: /node_modules/,  // excluir todos file dentro node_modules que ja são arquivos pronto p browser ler ja que isso é responsabilidade da biblioteca 
                    use: "babel-loader"
                }
            ]
        }
    }
    ```