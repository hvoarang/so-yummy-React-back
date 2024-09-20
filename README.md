# So-yummy React back

The backend was created for the So Yummy application, in which after a short registration you can find more than hundred delicious recipes and add them to your favorites so as not to lose, you can also save your personal recipe in the database, there is also a convenient shopping list of ingredients. The server part is built on the following technologies: Node.js, Express, Mongoose. Database - MongoDB. We use Cloudinary for cloud storage of images. The documentation is written in Swagger.

========================= To run the backend you need:==========================

Go to the MongoDB site and create a classter there. After creating a user. The default login is admin, and specify the password yourself. Back up your IP address by clicking on the button below. Click the Browse Collections button and click Create Database. Then click the "Connect" button and then click "Connect App". Copy the link. Create a file ".env" in the root of the project and insert a link to connect to the database using the key "DB_HOST=", it will look like this "DB_HOST=mongodb+srv://User:@cluster0.1spufqi .mongodb.net/?retryWrites= true&w=majority" Change the login and password to those specified during registration and add the name of our database "exampel". The link should look like this: "DB_HOST=mongodb+srv://User: QWE123QWE123QWE1@cluster0.1spufqi.mongodb.net/exampel?retryWrites=true&w=majority".

Also you have to create SECRET_KEY for JWT-token creation and verification. Store this key in variable environmet on MongoDB and you local machine for local usage. Secret key is used to verify user token on all routes, except registration and login.

Backend requires access to Cloudinary service to store user avatars and user's recipes images. For this Cloudinary service gives genereted 'Cloud Name', "API key" and "API secret". This data is used in cloudinary.js file and allows to access and store images on Cloudinary. Configure storage folder you can in cloudinary.js.

Open a terminal in the root folder of the server. You can also go there with the "cd server" command. Enter the command "npm i". After downloading the data, enter the command "npm start". The console should show "Server OK" and "Connection to database successful"

===============================================================================

Бэкенд создан для приложения So Yummy, в котором после короткой регистрации можно найти более сотни вкусных рецептов и добавить их в избранное, чтобы не потерять, также можно сохранить свой личный рецепт в базе данных, также есть удобный список покупок ингредиентов. Серверная часть построена на следующих технологиях: Node.js, Express, Mongoose. База данных - MongoDB. Для облачного хранения изображений мы используем Cloudinary. Документация написана на Swagger.

=========================== Для запуска бэкенда нужно:=========================

Перейти на сайт MongoDB и создать там класстер. После создания пользователя. Логин по умолчанию - admin, а пароль указать самостоятельно. Сделать резервную копию своего IP-адреса, нажав на кнопку ниже. Нажать кнопку Browse Collections и нажать Create Database. Затем нажать кнопку «Connect» и затем «Connect App». Копируем ссылку. Создаем файл ".env" в корне проекта и вставляем ссылку для подключения к базе данных с помощью ключа "DB_HOST=", это будет выглядеть так "DB_HOST=mongodb+srv://User:@cluster0.1spufqi .mongodb.net/?retryWrites= true&w=majority" Меняем логин и пароль на указанные при регистрации и добавляем имя нашей базы данных "exampel". Ссылка должна выглядеть так: "DB_HOST=mongodb+srv://User: QWE123QWE123QWE1@cluster0.1spufqi.mongodb.net/exampel?retryWrites=true&w=majority".

Также необходимо создать SECRET_KEY для создания и проверки JWT-токена. Сохраняем этот ключ в переменной environmet на MongoDB и на локальной машине для локального использования. Секретный ключ используется для проверки токена пользователя на всех маршрутах, кроме регистрации и входа.

Бэкенду требуется доступ к сервису Cloudinary для хранения аватаров пользователей и изображений рецептов пользователя. Для этого сервис Cloudinary выдает сгенерированные «Cloud Name», «API key» и «API secret». Эти данные используются в файле cloudinary.js и позволяют получать доступ к изображениям и хранить их в Cloudinary. Настроить папку хранения можно в cloudinary.js.

Откройте терминал в корневой папке сервера. Вы также можете перейти туда с помощью команды «cd server». Введите команду «npm i». После загрузки данных введите команду «npm start». В консоли должно отображаться «Server OK» и «Connection to database successful»

Swagger documentation: https://so-yummy-426w.onrender.com/api/api-docs
