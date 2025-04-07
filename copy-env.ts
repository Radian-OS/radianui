import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootEnvPath = path.join(__dirname, '.env');
const targetAppEnvPath = path.join(__dirname, 'apps', 'website', '.env'); 

function copyEnvFile() {
    return new Promise((resolve, reject) => {
        fs.copyFile(rootEnvPath, targetAppEnvPath, (err: NodeJS.ErrnoException | null) => {
            if (err) {
                reject(err);
            } else {
                resolve(undefined);
            }
        });
    });
}


function envFileExists() {
    return fs.existsSync(targetAppEnvPath);
}


async function main() {
    try {
        if (!envFileExists()) {
            console.log('.env file does not exist in the Next.js app. Copying from root...');
            await copyEnvFile();
            console.log('.env file copied successfully.');
        } else {
            console.log('.env file already exists in the Next.js app.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


main().then(() => process.exit(0));