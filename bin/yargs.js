const yargs = require('yargs')

module.exports = yargs
  .usage('Uso: -n <name>')
  .option('n', {
    alias: 'name',
    describe: 'Name of component',
    type: 'string',
    demandOption: true
  })
  .argv