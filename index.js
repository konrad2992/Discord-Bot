const { Client, GatewayIntentBits, ActivityType, Collection, GuildBan, GuildBanManager } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
    ]
});

//tworzymy liste komend
client.commands = new Collection();

for (const folder of fs.readdirSync(`./commands`)) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        client.commands.set(command.data.name, command);
    }
}

// robi to tylko raz przy uruchomieniu 
client.once('ready', () => {
    // wysyla do konsoli ze jest gotowy
    console.log('Gotowe!')
    // Dodajemy opis ActivityType jest to co on robi np stremuje slucha itp a name to nazwa 
    client.user.setPresence({ activities: [{ name: 'Test', type: ActivityType.Listening}]})
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        return console.error('Nie znaleziono takiej komendy')
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "Wystąpił błąd podczas wykonywania tej komendy", ephemeral: true });
    }
});
// Logujemy sie do bota
client.login('<TOKEN BOTA>')