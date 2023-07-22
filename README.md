# <img src="https://github.com/Marlinsk/upload-file-nestjs-application/blob/main/.github/upload-file.png" width="48px" height="48px"> Aplicação back-end NestJs de upload de arquivos
O grande recurso dessa aplicação é servir como um tipo de canal para salvar arquivos, que são enviados via web. Para esse canal funcionar em uma aplicação desenvolvida em **Node.js** e **Nest.js**, utiliza-se o **Express.js middleware multer**, através dele podemos tratar e manipular diferentes tipos e formatos de arquivos que o back-end captura em uma **requisição HTTP**. Para poder salvar o arquivo recebido, existem duas formas, a primeira através de integração com algum serviço de cloud como por exemplo um **Bucket** na **AWS**, a segunda opção é salvar em uma pasta de uploads dentro da aplicação. A opção de salvar o arquivo dentro da aplicação não é muito recomendável ser feito em aplicações que são alocadas dentro de conteineres, pois se o container cair, os arquivos somem ou são corrompidos, por isso utiliza-se essa técnica em projetos de escala menor ou de estudos, mas vale a pena fazer para entender como tudo funciona por baixo dos panos. Nesta aplicação, optei por utilizar a segunda opção, por ser gratuita e não ser dependente de um serviço de cloud.

## Descrição
A aplicação tem dois componentes de funcionalidade, sendo elas o com o banco de dados, onde é salvo os dados importantes do arquivo como por exemplo o nome e o caminho do arquivo, isso é feito para auxiliar na gestão do arquivo por meio de requisição HTTP, tendo esses dados salvos em um banco de dados, fica fácil do back-end buscar esse arquivo na pasta. O outro componente serve para salvar o arquivo na pasta de upload, esse componente na ocasião pega o nome original do arquivo e renomeia a partir de um conjunto de caracteres e depois o salva na pasta de uploads, isso é feito na ocasião para não ocorrer problemas de nome de arquivo igual dentro do sistema. A forma como esses arquivos são geridos são a partir dos dados salvos no banco de dados.

## Clonando o projeto em sua máquina
Execute o comando abaixo para clonar o projeto:
```
git clone https://github.com/Marlinsk/upload-file-nestjs-application.git
```
Após clonar o repositório instale as dependências executando comando abaixo: 
```
npm install
```
> Finalizando isso vamos para a próxima etapa que é gerar o banco de dados utilizando o docker compose.

## Criação do banco de dados com Docker 🐳
Execute o seguinte comando no terminal para criar uma imagem com o banco de dados PostgreSQL:
```
docker-compose -f docker-compose.yml up -d
```
> Após a execução a imagem do banco de dados da aplicação será gerada no seu Docker.

## Criando a estrutura básica do banco de dados 🐘
Crie um arquivo **.env** e cole o schema abaixo para se conectar com o banco de dados:
```
DATABASE_URL="postgresql://prisma:prisma@localhost:5433/upfiledb?schema=public"
```
Para criar as tabelas no banco de dados, execute o seguinte comando:
```
npx prisma db push
```

## Rodando a aplicação 🚀
**Obs.:** Antes de por a aplicação para rodar, certifique-se que a imagem do banco de dados docker esteja rodando, caso contrário ocorrerá um erro. 

Para executar o servidor rode o seguinte comando:
```
npm run start:dev
```
> Se estiver tudo ok aparecerá a seguinte mensagem no terminal: Server starting 🚀 http://localhost:3000. 

## Rotas HTTP da aplicação 🚏
Descrição das rotas da aplicação junto da instrução de como fazer a requisição pelo **Postman**.

**POST** Upload file

Rota de upload do arquivo

> /

Para poder fazer a requisição nesta rota via **Postman,** acesse a aba body e clique em form-data, feito isso basta colocar o nome do campo na coluna **Key** para file e mudar o tipo dele para arquivo, feito isso aparecerá na coluna **Value** o **Select files**, clique nele e selecione o arquivo que deseja fazer upload, após isso só fazer a requisição. 

<img align="center" src="https://github.com/Marlinsk/upload-file-nestjs-application/blob/main/assets/255339216-64043c98-4115-4732-a618-ad0d38222c5e.png">

**Obs.:** Em outras ferramentas, basta procurar uma opção de form-data na aba de corpo da requisição.

**GET** List all files

Lista todos os dados dos arquivos salvos na pasta **uploads**

> /

Basta fazer uma requisição http do tipo **GET** sem nenhum parâmetro na url

<img align="center" src="https://github.com/Marlinsk/upload-file-nestjs-application/blob/main/assets/255339439-552c7d7f-95be-4ed7-9e19-ece127df52f6.png">

**GET** Get file

Busca um arquivo salvo na pasta **uploads** pelo id

> /:id

Faça uma requisição http do tipo **GET** com o id na url

<img align="center" src="https://github.com/Marlinsk/upload-file-nestjs-application/blob/main/assets/255340143-8da5448f-4edf-4213-a96e-a2f45abb8dad.png">

**PATCH** Change file

Substitui o arquivo salvo com aquele id

> /:id

Repita o mesmo processo ensinado na requisição POST, mas passando o id na url do arquivo que deseja mudar, feito isso faça a requisição http no tipo PATCH.

<img align="center" src="https://github.com/Marlinsk/upload-file-nestjs-application/blob/main/assets/255339159-bd16e0d5-272c-49b4-95c4-d56c20a6a37b.png">

**DELETE** Remove file

Remove o arquivo a partir do id dele registrado no banco

> /:id

Faça a requisição passando o id, fazendo isso o arquivo é removido junto com o dado salvo no banco de dados.

<img align="center" src="https://github.com/Marlinsk/upload-file-nestjs-application/blob/main/assets/255340245-43c6f738-b0d1-42d7-ab12-9e60e7d8c423.png">
