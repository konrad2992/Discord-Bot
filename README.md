## Discord-Bot v.14.11.0
* Bot discord oparty na discord.js v.14.11.0

## Info
Celem tego projektu było nauczenie się czegoś nowego! <br>
Bot jest ciągle rozwijany! <br>
<br>
Dodaje on slash komendy: <br>
/ban - Banuje wyznaczoną osobę. <br>
/kick - Wyrzuca wyznaczoną osobę. <br>
/ping - Odpowiada "Pong!", sprawdza czy bot działa. <br>
	
## Technologie
Projekt stworzony z:
* Discord.js v.14.11.0
* Node.js
	
## Uruchomienie
Do uruchomienia projektu, potrzebne jest node.js:
[Node.js](https://nodejs.org/en)
* W pliku index.js zmienić
```
51 client.login('<TOKEN BOTA>')

<TOKEN BOTA> - > Na swój token bota
```
* W pliku deploy-commands.js
```
16 const rest = new REST({ version: "10"}).setToken('<TOKEN BOTA>');
<TOKEN BOTA> - > Na swój token bota

22 const data = await rest.put(Routes.applicationCommands('<CLIENT ID>'), { body: commands })
<CLIENT ID> - > Na client id bota
```
* W terminalu folderu bota uruchomić :
```
$ npm i discord.js@14.11.0
$ node deploy-commands.js
$ node .
```
