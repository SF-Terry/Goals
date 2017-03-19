import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import { allTargetTypes, allTargetTypes_reverse } from '../../store/initialState'


/**
 * @const {array} 
 * options for Dropdown
 */
const taskTypesOptions = [...allTargetTypes.values()].map(type => ({
  text: type,
  value: type
}))


class TypeSelector extends React.Component {
  constructor(props) {
    super(props)

    this._onSelectorChange = this._onSelectorChange.bind(this)
  }

  /**
   * selector's change event
   * @param {} e 
   * @param {object} info 
   */
  _onSelectorChange(e, info) {
    const { onChange } = this.props

    const { value } = info
    const type = allTargetTypes_reverse.get(value)

    onChange(type)
  }

  render() {
    const { type } = this.props
    const value = allTargetTypes.get(type)

    return (
      <div>
        <Dropdown fluid selection value={value} options={taskTypesOptions} onChange={ this._onSelectorChange } ></Dropdown>
      </div>
    )
  }
}

TypeSelector.propTypes = {
  type: React.PropTypes.number,
  onChange: React.PropTypes.func
};


export default TypeSelector