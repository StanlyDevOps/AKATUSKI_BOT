import { REST, Routes, Client } from 'discord.js';

export const registerCommands = async (client: Client, clientId: string, guildId?: string) => {
    const TOKEN = process.env.DISCORD_TOKEN!;
    const rest = new REST({ version: '10' }).setToken(TOKEN);

    const commands = client.commands?.map(cmd => cmd.data.toJSON()) || [];

    console.log('📦 Registrando comandos...');
    try {
        if (guildId) {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
            console.log(`✅ Comandos registrados en el servidor ${guildId}`);
        } else {
            await rest.put(Routes.applicationCommands(clientId), { body: commands });
            console.log('✅ Comandos registrados globalmente (puede tardar unos minutos)');
        }
    } catch (error) {
        console.error('❌ Error registrando comandos:', error);
    }
}
