const fs = require('fs')

function createDir(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      err ? reject('Error porque directorio ya existe') : resolve()
    })
  })
}

function addFile(file, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(file, data, (err) => {
      err ? reject('Error al agregar archivo') : resolve()
    })
  })
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      err ? reject('Error al leer el archivo') : resolve(data)
    })
  })
}

function editFile(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      err ? reject('Error al editar contenido de archivo') : resolve()
    })
  })
}

module.exports = {
  createDir,
  addFile,
  readFile,
  editFile
}