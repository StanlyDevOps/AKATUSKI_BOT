import fs from 'fs';
import path from 'path';
import { Client, Collection } from 'discord.js';

/**
 * Carga automáticamente todos los comandos desde src/commands/
 */
export const loadCommands = (client: Client) => { // Función ahora síncrona
    const commands = new Collection<string, any>();
    const commandsPath = path.resolve('src/commands');

    const files = fs.readdirSync(commandsPath).filter(f => f.endsWith('.ts') || f.endsWith('.js'));

    for (const file of files) {
        const filePath = path.join(commandsPath, file);

        const { command } = require(filePath);

        if (command?.data && command?.execute) {
            commands.set(command.data.name, command);
            console.log(`⚙️  Comando cargado: ${command.data.name}`);
        } else {
            console.warn(`⚠️  El archivo ${file} no exporta un comando válido.`);
        }
    }

    (client as any).commands = commands;

    console.log(`${commands.size} comandos cargados correctamente`);
}