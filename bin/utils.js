const path = require('path')
const { createDir, addFile, readFile, editFile } = require('./helpers')

const log = console.log

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

module.exports = {
  appendLineRouteToMappedComponent,
  createDirectoryReact,
  createDirectoryAEM
}