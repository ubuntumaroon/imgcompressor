const { program } = require('commander');

function cli() {
  program
    .version('0.0.1')
    .arguments('<dir>')
    .description('Compress images in a directory recursively', {
      dir: 'directory where images are saved',
    })
    .option('-s, --sizes   <number...>', 'list of required image width', [500, 1000])
    .option('-q, --quality <number>', 'image quanlity 1-100', 80)
    .action(dir =>{
    })
  
  program.parse();

  return {dir: program.args[0], ...program.opts()}
}


module.exports = cli
