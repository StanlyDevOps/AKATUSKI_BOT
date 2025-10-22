import 'dotenv/config';

import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { loadCommands } from '@handlers/command-handler.js';
import { registerCommands } from 'register-commands.js';

const TOKEN = process.env.DISCORD_TOKEN!;
const CLIENT_ID = process.env.CLIENT_ID!;
const GUILD_ID = process.env.GUILD_ID!;

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

declare module 'discord.js' {
    interface Client {
        commands?: Collection<string, any>;
    }
}

const main = async () => {
    await loadCommands(client);

    await registerCommands(client, CLIENT_ID, GUILD_ID);
}

main().catch(console.error);

client.once('ready', () => {
    console.log(`🤖 Bot conectado como ${client.user?.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands?.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: '❌ Ocurrió un error al ejecutar el comando.',
            ephemeral: true,
        });
    }
});

client.login(TOKEN).then(_ => _);
