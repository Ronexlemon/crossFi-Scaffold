#!/usr/bin/env node
import inquirer from "inquirer";
import { execSync } from "child_process";
import chalk from "chalk";
import fsExtra from "fs-extra";

import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { prompt } = inquirer;
const { existsSync, copySync } = fsExtra;

console.log(chalk.blueBright("\n🚀 Welcome to the CrossFid App Scaffold!\n"));


(async () => {
    const { projectName, frontend, backend } = await prompt([
        {
            type: "input",
            name: "projectName",
            message: "Enter your project name:",
            default: "crossfidapp",
        },
        {
            type: "list",
            name: "frontend",
            message: "Which frontend framework do you want to use?",
            choices: ["React", "Next.js"],
        },
        {
            type: "list",
            name: "backend",
            message: "Which backend framework do you want to use?",
            choices: ["Hardhat", "Foundry"],
        }
    ]);

    const destinationPath = join(process.cwd(), projectName);
    const frontendPath = join(destinationPath, "frontend");
    const backendPath = join(destinationPath, "backend");

    if (existsSync(destinationPath)) {
        console.log(chalk.red("❌ A project with this name already exists! Choose a different name."));
        process.exit(1);
    }

    console.log(chalk.green(`\n📦 Setting up ${frontend} for frontend and ${backend} for backend in ${projectName}...\n`));

    // Define template locations
    const templatePath = join(__dirname, "..", "templates");
    const frontendMap = {
        "React": "react-template",
        "Next.js": "nextjs-template"
    };
    const backendMap = {
        "Hardhat": "hardhat-template",
        "Foundry": "foundry-template"
    };

    // Copy frontend and backend templates
    copySync(join(templatePath, frontendMap[frontend]), frontendPath);
    copySync(join(templatePath, backendMap[backend]), backendPath);

    console.log(chalk.yellow("\n📥 Installing dependencies for frontend...\n"));
    execSync(`cd ${frontendPath} && npm install`, { stdio: "inherit" });

    console.log(chalk.yellow("\n📥 Installing dependencies for backend...\n"));
    execSync(`cd ${backendPath} && npm install`, { stdio: "inherit" });

    console.log(chalk.greenBright("\n✅ Setup complete! Run the following to start:\n"));
    console.log(chalk.cyan(`  cd ${projectName}/frontend && npm run dev  # Start frontend`));
    console.log(chalk.cyan(`  cd ${projectName}/backend && npx hardhat test  # Run backend tests\n`));
})();