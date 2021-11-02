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
    yarn add node-sass -D
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

# 2. Conceitos Importantes
## Componente
* Como se fosse as tags no HTML
* Própria funcionalidade, stilos, etc
* Começar com letra primeira letra maiúscula
* Um component por arquivo
* Qualquer código dentro component (que não seja useEffect nem useState), vai ser executado de novo toda vez que componente sofrer alteração (no estado, propriedade)
## Propriedade no React
* informações p passar no component
* props

* Colocar uma informação padrão caso não seja passado 
    ```jsx
    {props.repository ?? "Default"}
    ```

* Definir um obj com as props p ficar mais organizado
```jsx
const repository = {
    name: "unform",
    description: "Forms in React",
    link: "https://github.com/unform/unform"
}
```
* No component que recebe usar
```jsx
<strong>{props.repository?.name ?? "Default"}</strong>
```
    * Com "?" ele ve se ta null, se tiver não procura o name e retorna resultado padrão, nesse caso "Default"

## Estado
* Por padrão, react não fica monitorando variaveis para ver se os valores são alterados para então renderizar o conteudo component de novo

* Como solução react tem state
    * Fica monitorando, toda vez que mudar, muda component de novo
    * Retorna valor variavel e função p alterar valor da variavel
        * sintaxe
        ```jsx
        const [estado, setEstado] = useState("")
        ```

* Sempre que uma função React começar com "use", é um um hook -> gancho
* Sempre que variavel tiver troca de valor (por click, chamada api, etc), usar useState

### Imutabilidade
* preve que uma variavel nunca vai poder ter seu valor alterado, ela sempre vai receber um novo valor

* Ex mudando diretamente na variavel
    ```jsx
    usuarios = ['user1', 'user2']
    usuarios.push("user3")
    ```

* Com imutabilidade (`É um conceito que existe no estado do react`)
    ```
    usuarios = ['user1', 'user2']
    novoUsuario = [...usuarios, 'user3']
    ```

## Fast Refresh no Webpack
* Por padrão reseta tudo que tenha mudado na aplicação quando da o refresh ou altera o código

* Com react fast refresh isso não ocorre
```
yarn add -D @pmmmwh/react-refresh-webpack-plugin react-refresh
```

* No webpack.config.js
```js
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

// em module.exports
devServer: {
    static: path.join(__dirname, 'public'),
    hot: true, //add isso
},
plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(), //add isso
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
    })
].filter(Boolean),

module: {
    rules: [
        {
            test: /\.jsx$/, // ler jsx com babel-loader
            exclude: /node_modules/,
            use: { //muda isso pra baixo
                loader: 'babel-loader',
                options: {
                    plugins: [
                        isDevelopment && require.resolve('react-refresh/babel')
                ].filter(Boolean)
            }
        }
},
}
```
* Operador "&&" é usado pra fazer if sem else
* Se for falso, iria retornar como false e não tem plugin webpack chamado false, ficaria assim

```js
plugins: [
    false,
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
    })
],
```
* O filter Boolean remove tudo diferente de true


## Estilização
```scss
li {
    & + li {
        margin-top: 20px
    }
}
```
* & Representa próprio elemento
* Toda li que antes dela tem uma li tbm, vai da margin-top
* Faz com que a primeira li não tenha margin-top

* display: inline-block -> display inline que permite margin, aumentar altura

## useEffect
* Disparar uma função quando algo acontecer na aplicação
    * Ex: Variavel mudar

```jsx
useEffect(() => {função que vai executar}, [quando -> são as dependencias])
```

* Se passado um array vazio, é executado uma única vez, assim que o componente for exibido em tela
### Tomar cuidado
* Não usar sem passar array de depencias (pelo menos vazio), se entra em loop
* No array de depencias passar um variavel (state) e a função alterar valor dessa variavel, se não entra em loop tb
    ```jsx
    useEffect(() => {
        setVariavel(12)
    }, [variavel])
    ```

## Chamada pra API externa
* Normalmente usa o useEffect com array de depencias vazio ou preenchido caso precisa ser colocado algum parametro na URL da API
    * Assim que component for carregado, vai buscar na API


## API Github
* pegar os dados do meu usuario
    * [api.github.com/users/leolive1506]() <br />

* Em repos_url da pre pegar os repositórios
    * [https://api.github.com/users/leolive1506/repos]()
        

## Erros
```
Each child in a list should have a unique "key" prop.
```
* Acontece toda vez que fazer map no HTML
    * Passar a key (informação única)
