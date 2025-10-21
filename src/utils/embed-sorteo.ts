import { EmbedBuilder } from 'discord.js';

export const buildSorteoEmbed = (): EmbedBuilder => {
    return new EmbedBuilder()
        .setTitle('🎁 Reglas del Sorteo Mensual – Pass Royale')
        .setColor(0xf1c40f)
        .setDescription(
            'Cada mes se realizará un **sorteo del Pass Royale** entre los miembros más activos del clan.\n\nLee con atención las reglas para participar:'
        )
        .addFields(
            {
                name: '⚔️ Requisitos para participar',
                value:
                    '- **Donaciones:** mínimo 300 donaciones mensuales (promedio por semana)\n' +
                    '- **Puntos de guerra:** mínimo 700 puntos mensuales (promedio por semana)\n\n' +
                    'Si no cumples uno de los dos requisitos, **no podrás participar ese mes.**',
            },
            {
                name: '🗳️ Forma del sorteo',
                value:
                    'La forma del sorteo será decidida **por votación** entre los jugadores elegibles.\n\n' +
                    'Opciones comunes:\n' +
                    '- Torneo\n' +
                    '- Rifa con números\n' +
                    '- Rueda aleatoria',
            },
            {
                name: '🧾 Verificación',
                value:
                    'Los líderes revisarán las donaciones y puntos **al final de cada temporada**.\n' +
                    'La lista de jugadores elegibles se publicará antes del sorteo.',
            },
            {
                name: '🏆 Premio',
                value:
                    'El ganador recibirá el **Pass Royale del siguiente mes.**\n' +
                    'En caso de empate o error, se repetirá el sorteo o se votará cómo resolverlo.',
            },
            {
                name: '💬 Dudas o sugerencias',
                value: 'Comenta en **#sugerencias** o contacta a un líder.',
            }
        )
        .setFooter({ text: '✨ ¡Demuestra tu compromiso con el clan y gana tu Pass Royale!' });
}
