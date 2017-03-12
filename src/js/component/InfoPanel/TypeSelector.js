import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import { allTargetTypes } from '../../store/initialState'



class TypeSelector extends React.Component {
  constructor(props) {
    super(props)

    this.options = Object.values(allTargetTypes).map( (type, index) => ({
      text: type,
      value: type  
    }) )
    
    this.value = this.props.value   

    this.handleDropdownChange = this.handleDropdownChange.bind(this)
  }

  handleDropdownChange(e, result) {
    const { value: type } = result
    
    this.props.callback(type)
  }

  render() {
    return (
      <div>
        <Dropdown fluid selection default options={this.options} onChange={this.handleDropdownChange} />
      </div>
    )
  }
}


export default TypeSelector