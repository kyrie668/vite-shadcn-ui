#!/usr/bin/env node
import { execSync } from 'child_process';
import simpleGit from 'simple-git';
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs';
import { createRequire } from 'module';

// 因为 ES 模块中无法直接使用 require，使用 createRequire 读取 package.json
const require = createRequire(import.meta.url);
const { version } = require('./package.json');

// 初始化 Commander
const program = new Command();
const git = simpleGit();

program
  .name('create-vite-shadcn-ui')
  .description('Bootstrap a Vite project with shadcn UI components')
  .version(version);

program
  .argument('<project-directory>', 'Directory to create your new project')
  .action(async (projectDir) => {
    const targetPath = path.resolve(process.cwd(), projectDir);

    // 检查目录是否已存在
    if (fs.existsSync(targetPath)) {
      console.log(chalk.red(`\n❌ The directory "${projectDir}" already exists!`));

      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      // 提示用户是否覆盖
      rl.question('Do you want to overwrite it? (y/N): ', async (answer) => {
        rl.close();
        if (answer.toLowerCase() === 'y') {
          try {
            await fs.promises.rm(targetPath, { recursive: true, force: true });
            console.log(chalk.yellow(`\n⚠️ The existing directory "${projectDir}" was removed.`));

            // 增加延时确保系统释放资源
            setTimeout(() => {
              cloneRepo(projectDir);
            }, 500); // 500ms 延时
          } catch (err) {
            console.error(chalk.red(`Failed to remove directory: ${err.message}`));
            process.exit(1);
          }
        } else {
          console.log(chalk.blue('\nOperation cancelled.'));
          process.exit(1);
        }
      });
    } else {
      cloneRepo(projectDir);
    }
  });

// 克隆 GitHub 仓库的函数
async function cloneRepo(projectDir) {
  const spinner = ora('Cloning the repository...').start();
  const repoUrl = 'https://github.com/kyrie668/vite-shadcn-ui.git';

  try {
    execSync(`git clone ${repoUrl} ${projectDir}`, { stdio: 'ignore' });
    spinner.succeed('Project cloned successfully!');

    // 移除 .git 文件夹以断开 Git 关联
    await fs.promises.rm(path.join(projectDir, '.git'), { recursive: true, force: true });
    console.log(
      chalk.green('\n✅ Git history removed. You can now initialize your own repository.')
    );

    console.log(chalk.cyan(`\n👉 Next steps:`));
    console.log(`   cd ${projectDir}`);
    console.log('   npm install');
    console.log('   npm run dev');
  } catch (error) {
    spinner.fail('Failed to clone the repository.');
    console.error(chalk.red(`\nError: ${error.message}`));
    process.exit(1);
  }
}
program.parse();
