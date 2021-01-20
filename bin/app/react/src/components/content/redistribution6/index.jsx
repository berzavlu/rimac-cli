import React from 'react'
import { MapTo } from '@adobe/cq-react-editable-components'

const NewComponentConfig = {
  emptyLabel: 'Nuevo componente',
  isEmpty: function (props) {
    return !props || !props.authoring
  }
}

export default function NewComponent(props) {
  console.log(props)
  return (
    <div>Nuevo componente</div>
  )
}

MapTo('rimac-private-people/components/content/redistribution6')(NewComponent, NewComponentConfig)