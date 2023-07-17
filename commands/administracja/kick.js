const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('kick')
        .setDescription("Komenda do wyrzucania.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("target")
            .setDescription("Użytkownik do wyrzucenia.")
            .setRequired(true)
        ),
    async execute(interaction) {
        const {channel, options} = interaction;

        const user = options.getUser("target");

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = new EmbedBuilder()
            .setDescription(`Nie możesz wykonać tej akcji na ${user.username} ponieważ on ma wyższą role.`)
            .setColor(0xc72c3b);

        if (member.roles.highest.position >= interaction.member.roles.highest.position){
            return interaction.replay({embeds: [errEmbed], ephemeral: true});
        }

        await member.kick()

        const embed = new EmbedBuilder()
            .setDescription(`Pomyślnie zbanowano użytkownika ${user}`)
            .setColor(0x5fb041)
            .setTimestamp()

        await interaction.reply(`Pomyślnie wyrzucono użytkownika ${user}`);
    }
}