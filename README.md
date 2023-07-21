# <img src="https://github.com/Marlinsk/upload-file-nestjs-application/blob/main/.github/upload-file.png" width="48px" height="48px"> Aplicação Back-end NestJs de upload de arquivos
O grande recurso dessa aplicação é servir como um tipo de canal para salvar arquivos, que são enviados via web. Para esse canal funcionar em uma aplicação desenvolvida em **Node.js** e **Nest.js**, utiliza-se o **Express.js Middleware multer**, através dele podemos tratar e manipular diferentes tipos e formatos de arquivos que o back-end captura em uma **requisição HTTP**. Para poder salvar o arquivo recebido, existem duas formas, a primeira através de integração com algum serviço de cloud como por exemplo um **Bucket** na **AWS**, a segunda opção é salvar em uma pasta de uploads dentro da aplicação. A opção de salvar o arquivo dentro da aplicação não é muito recomendável ser feito em aplicações que são alocadas dentro de conteineres, pois se o container cair, os arquivos somem ou são corrompidos, por isso utiliza-se essa técnica em projetos de escala menor ou de estudos, mas vale a pena fazer para entender como tudo funciona por baixo dos panos. Nesta aplicação, optei por utilizar a segunda opção, por ser gratuita e não ser dependente de um serviço de cloud.

## Descrição
A aplicação tem dois componentes de funcionalidade, sendo elas o com o banco de dados, onde é salvo os dados importantes do arquivo como por exemplo o nome e o caminho do arquivo, isso é feito para auxiliar na gestão do arquivo por meio de requisição HTTP, tendo esses dados salvos em um banco de dados, fica fácil do back-end buscar esse arquivo na pasta. O outro componente serve para salvar o arquivo na pasta de upload, esse componente na ocasião pega o nome original do arquivo e renomeia a partir de um conjunto de caracteres e depois o salva na pasta de uploads, isso é feito na ocasião para não ocorrer problemas de nome de arquivo igual dentro do sistema. A forma como esses arquivos são geridos são a partir dos dados salvos no banco de dados.

## Configurando o projeto em sua máquina
Comando para clonar o projeto em sua máquina.
```
git clone https://github.com/Marlinsk/upload-file-nestjs-application.git
```

