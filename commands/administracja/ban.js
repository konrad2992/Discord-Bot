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

        const errEmbed = new EmbedBuilder()
            .setDescription(`Nie możesz wykonać tej akcji na ${user.username} ponieważ on ma wyższą role.`)
            .setColor(0xc72c3b);

        if (member.roles.highest.position >= interaction.member.roles.highest.position){
            return interaction.replay({embeds: [errEmbed], ephemeral: true});
        }

        await member.ban({reason})

        const embed = new EmbedBuilder()
            .setDescription(`Pomyślnie zbanowano użytkownika ${user} za ${reason}`)
            .setColor(0x5fb041)
            .setTimestamp()

        await interaction.reply(`Pomyślnie zbanowano użytkownika ${user} za ${reason}`);
    }
}