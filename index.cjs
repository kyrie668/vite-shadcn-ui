#!/usr/bin/env node
const { execSync } = require('child_process');
const { Command } = require('commander');
const simpleGit = require('simple-git');

const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const fs = require('fs');
const { version } = require('./package.json');

const program = new Command();
const git = simpleGit();

program
  .name('create-vite-shadcn-ui')
  .description('Bootstrap a Vite project with shadcn UI components')
  .version(version);

program
  .argument('<project-directory>', 'Directory to create your new project')
  .action((projectDirectory) => {
    const repoUrl = 'https://github.com/kyrie668/vite-shadcn-ui.git';
    const projectPath = path.resolve(process.cwd(), projectDirectory);

    console.log(`\n📦 Cloning project into ${projectDirectory}...\n`);

    // 克隆仓库
    execSync(`git clone ${repoUrl} ${projectDirectory}`, { stdio: 'inherit' });

    // 删除 .git 文件夹
    const gitPath = path.join(projectPath, '.git');
    if (fs.existsSync(gitPath)) {
      fs.rmSync(gitPath, { recursive: true, force: true });
    }

    console.log(`\n🎉 Project setup complete!`);
    console.log(`\nNext steps:\n`);
    console.log(`  cd ${projectDirectory}`);
    console.log(`  npm install`);
    console.log(`  npm run dev`);
    console.log(`\nTo initialize a new Git repository:\n`);
    console.log(`  git init`);
    console.log(`  git remote add origin <your-repo-url>`);
    console.log(`  git add .`);
    console.log(`  git commit -m "Initial commit"`);
    console.log(`  git push -u origin main\n`);
  });

program.parse();
