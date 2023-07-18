const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('kick')
        .setDescription("Komenda do wyrzucania.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("target")
            .setDescription("Użytkownik do wyrzucenia.")
            .setRequired(true)
        ),
    async execute(interaction) {
        const {channel, options} = interaction;

        const user = options.getUser("target");

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = {
            color: 0xCC0000,
            title: 'Wyrzucanie',
            description: `Nie możesz wykonać tej akcji na ${user.username} ponieważ on ma wyższą role.`,
        };
        if (member.roles.highest.position >= interaction.member.roles.highest.position){
            return interaction.reply({ embeds: [ errEmbed ], ephemeral: true})
        };

        await member.kick()
            
        const success = {
            color: 0x93C47D,
            title: 'Wyrzucanie',
            description: `Pomyślnie wyrzucono użytkownika ${user}`,
        };
        await interaction.reply({ embeds: [ success ] })
    }
}