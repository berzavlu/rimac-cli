#!/usr/bin/env node
const fs = require('fs')
const chalk = require('chalk')

const log = console.log
const error = chalk.red.bold
const isRootPathAEM = fs.existsSync('app')

const {
  appendLineRouteToMappedComponent,
  createDirectoryReact,
  createDirectoryAEM
} = require('./utils')

const options = require('./yargs')

async function init() {
  if (isRootPathAEM) {
    try {
      const { name } = options

      await appendLineRouteToMappedComponent(name)
      await createDirectoryReact(name)
      await createDirectoryAEM(name)

      log(chalk.green.bold('¡AEM componente listo!'))
    } catch (err) {
      log(error('Ocurrió un error al crear los archivos'))
      console.log(err)
    }
  } else {
    log(error('No es un APP de aem o no se encuentra en la ruta raíz del proyecto'))
  }
}

init()