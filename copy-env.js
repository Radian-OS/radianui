const fs = require('fs');
const path = require('path');

const rootEnvPath = path.join(__dirname, '.env');
const targetAppEnvPath = path.join(__dirname, 'apps', 'website', '.env'); // Adjust the path to your Next.js app

// Function to copy the .env file
function copyEnvFile() {
    return new Promise((resolve, reject) => {
        fs.copyFile(rootEnvPath, targetAppEnvPath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Function to check if the .env file exists
function envFileExists() {
    return fs.existsSync(targetAppEnvPath);
}

// Main function to check and copy the .env file
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

// Call the main function and exit afterward
main().then(() => process.exit(0)); 