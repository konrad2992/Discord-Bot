const { REST, Routes } = require('discord.js')
const fs = require('fs')

const commands = [];

for (const folder of fs.readdirSync(`./commands`)) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: "10"}).setToken('<TOKEN BOTA>');

(async () => {
    try {
        console.log("Update commend")

        const data = await rest.put(Routes.applicationCommands('<CLIENT ID>'), { body: commands })

        console.log("Done")
    } catch (error) {
        console.error(error);
    }
})();