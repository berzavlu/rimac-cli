const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const { createDir, addFile, readFile, editFile } = require('./helpers')
const { log, red } = require('../src/utils')

function generateContentReact(newRoute) {
  const file = path.resolve(__dirname, 'defaultReactComponent.txt')

  return new Promise((resolve, reject) => {
    readFile(file)
      .then((res) => {
        const data = res.replace(/AUTOREPLACETHISPATH/g, newRoute)
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function appendLineRouteToMappedComponent(name) {
  const path = './app/react/src/components/MappedComponents.js'
  const content = `\nrequire("./content/${name}/index.jsx")`

  return new Promise((resolve, reject) => {
    addFile(path, content)
      .then(() => {
        log('Ruta de componente agregado al archivo MappedComponents.js')
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function createDirectoryReact(name) {
  return new Promise(async(resolve, reject) => {
    const componentReactRoute = './app/react/src/components/content'
    const newRoute = `${componentReactRoute}/${name}`
    const newFile = `${newRoute}/index.jsx`

    try {
      await createDir(newRoute)
      const data = await generateContentReact(name)
      await editFile(newFile, data)
      log('Ruta de componente y archivo .jsx creados')
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

function createDirectoryAEM(name) {
  return new Promise(async(resolve, reject) => {
    const file = path.resolve(__dirname, 'defaultAEM-content-xml.txt')
    const fileTwo = path.resolve(__dirname, 'defaultAEMComponent.txt')
    const componentReactRoute = './app/core/content/jcr_root/apps/rimac-private-people/components/content'
    const newRoute = `${componentReactRoute}/${name}`
    const newContent = `${newRoute}/.content.xml`
    const newRouteCqDialog = `${newRoute}/_cq_dialog`
    const newContentXmlCqDialog = `${newRoute}/_cq_dialog/.content.xml`

    try {
      await createDir(newRoute)

      const res = await readFile(file)
      await editFile(newContent, res)
      log('Archivo .content.xml generado')

      await createDir(newRouteCqDialog)

      const resTwo = await readFile(fileTwo)
      await editFile(newContentXmlCqDialog, resTwo)
      log('Archivo .content.xml generado en _cq_dialog')

      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

function appendLineRouteToSass(name) {
  const path = './app/react/src/styles/styles.scss'
  const content = `\n@import "./components/${name}";`

  return new Promise((resolve, reject) => {
    addFile(path, content)
      .then(() => {
        log('Ruta de estilo agregado al archivo style.scss')
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function createFileSass(name) {
  const path = './app/react/src/styles/components'
  const newFile = `${path}/_${name}.scss`

  const contentStyle = `.newComponentColor {
  color: red;
}`

  return new Promise((resolve, reject) => {
    editFile(newFile, contentStyle)
      .then(() => {
        log('Archivo de estilo creado en components css')
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

async function buildComponent(name) {
  const isRootPathAEM = fs.existsSync('app')
  if (isRootPathAEM) {
    try {
      await appendLineRouteToMappedComponent(name)
      await createDirectoryReact(name)
      await createDirectoryAEM(name)
      await appendLineRouteToSass(name)
      await createFileSass(name)
      log(chalk.green.bold('¡AEM componente listo!'))
    } catch (err) {
      log(red('Ocurrió un error al crear los archivos'))
    }
  } else {
    log(red('No es un APP de aem o no se encuentra en la ruta raíz del proyecto'))
  }
}

module.exports = buildComponent