import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, TextChannel } from 'discord.js';
import { buildSorteoEmbed } from 'utils/embed-sorteo';

const ANNOUNCE_CHANNEL_ID = process.env.ANNOUNCE_CHANNEL_ID;
const ANNOUNCE_ROLE_ID = process.env.ANNOUNCE_ROLE_ID;

export const command = {
    data: new SlashCommandBuilder()
        .setName('anunciar-sorteo-cr')
        .setDescription('Publica el anuncio del sorteo mensual en el canal de anuncios')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction: ChatInputCommandInteraction) {
        const embed = buildSorteoEmbed();

        if (!ANNOUNCE_CHANNEL_ID) {
            await interaction.reply({ content: '⚠️ No se configuró el canal de anuncios.', ephemeral: true });
            return;
        }

        const channel = await interaction.client.channels.fetch(ANNOUNCE_CHANNEL_ID);
        if (!channel || !channel.isTextBased()) {
            await interaction.reply({ content: '❌ No se pudo acceder al canal configurado.', ephemeral: true });
            return;
        }

        const mention = ANNOUNCE_ROLE_ID ? `<@&${ANNOUNCE_ROLE_ID}>` : '';
        await (channel as TextChannel).send({
            content: `${mention}\n🎉 ¡Atención clan! Estas son las reglas del sorteo 👇`,
            embeds: [embed],
        });

        await interaction.reply({
            content: `✅ Reglas del sorteo publicadas en <#${ANNOUNCE_CHANNEL_ID}>`,
            ephemeral: true,
        });
    },
};
