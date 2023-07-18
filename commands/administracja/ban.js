const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('ban')
        .setDescription("Komenda do banowania")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("target")
            .setDescription("Użytkownik do zbanowania.")
            .setRequired(true)
            )
        .addStringOption(option =>
            option.setName("reason")
            .setDescription("Powód bana.")
        ),
    async execute(interaction) {
        const {channel, options} = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "Nie podano powodu.";

        const member = await interaction.guild.members.fetch(user.id);

        const errEmbed = {
            color: 0xCC0000,
            title: 'Banowanie',
            description: `Nie możesz wykonać tej akcji na ${user.username} ponieważ on ma wyższą role.`,
        };
        if (member.roles.highest.position >= interaction.member.roles.highest.position){
            return interaction.reply({ embeds: [ success ], ephemeral: true });
        };

        await member.ban({reason})

        const success = {
            color: 0x93C47D,
            title: 'Banowanie',
            description: `Pomyślnie zbanowane użytkownika ${user}`,
        };
        await interaction.reply({ embeds: [ success ] })
    }
}