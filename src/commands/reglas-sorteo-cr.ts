import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { buildSorteoEmbed } from '@utils/embed-sorteo.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('reglas-sorteo-cr')
        .setDescription('Muestra las reglas del sorteo mensual del Pass Royale'),

    async execute(interaction: ChatInputCommandInteraction) {
        const embed = buildSorteoEmbed();
        await interaction.reply({ embeds: [embed] });
    },
};
