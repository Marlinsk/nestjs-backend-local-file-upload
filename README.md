# <img src="https://github.com/Marlinsk/upload-file-nestjs-application/blob/main/.github/upload-file.png" width="48px" height="48px"> Aplicação Back-end NestJs de upload de arquivos
O grande recurso dessa aplicação é servir como um tipo de canal para salvar arquivos, que são enviados via web. Para esse canal funcionar em uma aplicação desenvolvida em **Node.js** e **Nest.js**, utiliza-se o **Express.js Middleware multer**, através dele podemos tratar e manipular diferentes tipos e formatos de arquivos que o back-end captura em uma **requisição HTTP**. Para poder salvar o arquivo recebido, existem duas formas, a primeira através de integração com algum serviço de cloud como por exemplo um **Bucket** na **AWS**, a segunda opção é salvar em uma pasta de uploads dentro da aplicação. A opção de salvar o arquivo dentro da aplicação não é muito recomendável ser feito em aplicações que são alocadas dentro de conteineres, pois se o container cair, os arquivos somem ou são corrompidos, por isso utiliza-se essa técnica em projetos de escala menor ou de estudos, mas vale a pena fazer para entender como tudo funciona por baixo dos panos. Nesta aplicação, optei por utilizar a segunda opção, por ser gratuita e não ser dependente de um serviço de cloud.

## Descrição
A aplicação tem dois componentes de funcionalidade, sendo elas o com o banco de dados, onde é salvo os dados importantes do arquivo como por exemplo o nome e o caminho do arquivo, isso é feito para auxiliar na gestão do arquivo por meio de requisição HTTP, tendo esses dados salvos em um banco de dados, fica fácil do back-end buscar esse arquivo na pasta. O outro componente serve para salvar o arquivo na pasta de upload, esse componente na ocasião pega o nome original do arquivo e renomeia a partir de um conjunto de caracteres e depois o salva na pasta de uploads, isso é feito na ocasião para não ocorrer problemas de nome de arquivo igual dentro do sistema. A forma como esses arquivos são geridos são a partir dos dados salvos no banco de dados.

## Configurando o projeto em sua máquina
Execute o comando abaixo para clonar o projeto:
```
git clone https://github.com/Marlinsk/upload-file-nestjs-application.git
```
Após clonar o repositório instale as dependências executando comando abaixo: 
```
npm install
```
Finalizando isso vamos para a próxima etapa que é gerar o banco de dados utilizando o docker compose.

## Criação do Banco de Dados com Docker 🐳
Execute o seguinte comando no terminal para criar uma imagem com o banco de dados PostgreSQL:
```
docker-compose -f docker-compose.yml up -d
```
> Após a execução a imagem do banco de dados da aplicação será gerada no seu Docker.

## Criando a estrutura básica do Banco de Dados 🐘
Crie um arquivo **.env** e cole o schema abaixo para se conectar com o banco de dados:
```
DATABASE_URL="postgresql://prisma:prisma@localhost:5433/upfiledb?schema=public"
```
Para criar as tabelas no banco de dados, execute o seguinte comando:
```
npx prisma db push
```
