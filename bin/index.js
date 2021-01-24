#!/usr/bin/env node
// Dependencias
const inquirer = require('inquirer'),
      figlet = require('figlet')

// Files
const buildComponent = require('./build-component')
const prompt = require('../src/prompt')
const constants = require('../src/constants')
const config = require('../src/config')
const { log, red } = require('../src/utils')

const arrQuestions = [
  prompt.typeProyect,
  prompt.typeComponentAEM,
  prompt.nameComponent
]

async function init() {
  try {
    const answers = await inquirer.prompt(arrQuestions)
    buildComponent(answers.nameComponent)
  } catch (error) {
    if (error.isTtyError) {
      log(red('Prompt no funciona en el entorno actual'))
    } else {
      log(red('Ocurrió un error inesperado'))
      log(error)
    }
  }
}

figlet(
  constants.TEXT_ASCII,
  config.ASCII_CONFIG,
  async (err, dataASCII) => {
  if (err) {
    log(red('Ocurrió un error de ASCII'))
    return
  }
  log(dataASCII)
  init()
})
