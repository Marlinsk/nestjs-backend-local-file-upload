# <img src="https://github.com/Marlinsk/upload-file-nestjs-application/blob/main/.github/upload-file.png" width="48px" height="48px"> Aplicação NestJs de Upload de Arquivos
O grande recurso dessa aplicação é servir como um tipo de canal para salvar arquivos, que são enviados via web. Para esse canal funcionar em uma aplicação desenvolvida em **Node.js** e **Nest.js**, utiliza-se o **Express.js Middleware multer**, através dele podemos tratar e manipular diferentes tipos e formatos de arquivos que o back-end captura em uma requisição HTTP. Para poder salvar o arquivo recebido, existem duas formas, a primeira através de integração com algum serviço de cloud como por exemplo um bucket na **AWS**, a segunda opção é salvar em uma pasta de uploads dentro da aplicação. A opção de salvar o arquivo dentro da aplicação não é muito recomendável ser feito em aplicações que são alocadas dentro de conteineres, pois se o container cair, os arquivos somem ou são corrompidos, por isso utiliza-se essa técnica em projetos de escala menor ou de estudos, mas vale a pena fazer para entender como tudo funciona por baixo dos panos. Nesta aplicação, optei por utilizar a segunda opção, por ser gratuita e não ser dependente de um serviço de cloud.
