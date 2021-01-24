const typeProyect = {
  name:'typeProyect',
  type: 'list',
  message: '¿En qué proyecto AEM te encuentras trabajando?',
  choices: [
    {
      name: 'Mi mundo rimac',
      value: 'PRIVATE'
    },
    {
      name: 'Web pública',
      value: 'PUBLIC'
    },
    {
      name: 'Brokers',
      value: 'BROKERS'
    }
  ]
}

const typeComponentAEM = {
  name:'typeComponentAEM',
  type: 'checkbox',
  message: 'Selecciona los tipo de authoring base a generar:',
  choices: [
    {
      name: 'Select',
      value: 'SELECT'
    },
    {
      name: 'Checkbox',
      value: 'CHECKBOX'
    },
    {
      name: 'Text Field',
      value: 'TEXTFIELD'
    },
    {
      name: 'Rich Text',
      value: 'RICH_TEXT'
    },
    {
      name: 'Path URL',
      value: 'PATH_URL'
    }
  ]
}

const nameComponent = {
  type: 'input',
  name: 'nameComponent',
  message: "Ingrese el nombre de su nuevo componente(camelCase):",
}

module.exports = {
  typeProyect,
  typeComponentAEM,
  nameComponent
}