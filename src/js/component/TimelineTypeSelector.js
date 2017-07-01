import React from 'react'

import TypeSelector from './TypeSelector'
import Lang from '../util/lang/index'


class TimelineTypeSelector extends TypeSelector {
  constructor(props) {
    super(props)

    // add the type
    const isAdded = this.taskTypesOptions.some(option => option.text == Lang.ALL)
    !isAdded && this.taskTypesOptions.splice(0, 0, {
      text: Lang.ALL,
      value: 0
    })
  }

}

export default TimelineTypeSelector