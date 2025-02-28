#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const { version } = require('./package.json');
const { generateFileTree } = require('./index');

// CLI argument parsing
const args = process.argv.slice(2);
let folderPath = null;
let outputPath = null;
let showEmoji = true;
let showLineNumbers = false;

args.forEach(arg => {
    if (arg === '--no-emoji' || arg === '--icon=false') {
        showEmoji = false;
    } else if (arg === '--line-numbers') {
        showLineNumbers = true;
    } else if (arg.startsWith('--output=')) {
        outputPath = arg.substring(9);
    } else if (!folderPath) {
        folderPath = arg;
    }
});

if (!folderPath) {
    console.log(chalk.yellow('Usage: gft <folder-path> [--no-emoji] [--line-numbers] [--output=output.txt]'));
    process.exit(1);
}

if (!fs.existsSync(folderPath)) {
    console.error(logSymbols.error, chalk.red('The specified folder does not exist.'));
    process.exit(1);
}

// ASCII art header with package version
const asciiArt = `

  ▄████   █████▒▄▄▄█████▓      ▄▄▄██▀▀▀██████ 
 ██▒ ▀█▒▓██   ▒ ▓  ██▒ ▓▒        ▒██ ▒██    ▒ 
▒██░▄▄▄░▒████ ░ ▒ ▓██░ ▒░        ░██ ░ ▓██▄   
░▓█  ██▓░▓█▒  ░ ░ ▓██▓ ░      ▓██▄██▓  ▒   ██▒
░▒▓███▀▒░▒█░      ▒██▒ ░  ██▓  ▓███▒ ▒██████▒▒
 ░▒   ▒  ▒ ░      ▒ ░░    ▒▓▒  ▒▓▒▒░ ▒ ▒▓▒ ▒ ░
  ░   ░  ░          ░     ░▒   ▒ ░▒░ ░ ░▒  ░ ░
░ ░   ░  ░ ░      ░       ░    ░ ░ ░ ░  ░  ░  
      ░                    ░   ░   ░       ░  
                           ░                  
`;
console.log(chalk.red(asciiArt));

try {
    // Always generate a plain-text tree from the API.
    const tree = generateFileTree(folderPath, { showEmoji, showLineNumbers });
    
    if (outputPath) {
        // Write plain text to file.
        fs.writeFileSync(outputPath, tree);
        console.log(logSymbols.warning, chalk.green(`${chalk.blue(`v${version}`)} \n${logSymbols.success} File structure saved to ${outputPath}`));
    } else {
        // For terminal output, we add color to directory lines.
        // (This example colors any line containing '📁' or ending with "/" as a directory.)
        const coloredOutput = tree.split('\n').map(line => {
            if (line.includes('📁') || line.trim().endsWith('/')) {
                return chalk.blue(line);
            }
            return line;
        }).join('\n');
        console.log(coloredOutput);
    }
} catch (error) {
    console.error(logSymbols.error, chalk.red(error.message));
    process.exit(1);
}
