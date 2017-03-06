import React from 'react'
import { Button, Grid, Input } from 'semantic-ui-react'
const {Row, Column} = Grid

import LevelBtnGroup from './LevelBtnGroup'
import TypeSelector from './TypeSelector'




class InfoPanel extends React.Component {
  constructor(props) {
    super(props)
  }

  /**
   * LevelBtnGroup component's callback 
   * @param {String} level target level
   */
  levelBtnGroup_callback(level) {
    console.log(level)
  }

  /**
   * TypeSelector component's callback 
   * @param {String}  type target type
   */
  typeSelector_callback(type) {
    console.log(type)
  }

  render() {
    const { level } = this.props

    return (
      <div>
        {/*  Name{ */}
        <Row centered>
          <Column width={14}>
            <Input placeholder='任务内容' fluid value={name} />
          </Column>
        </Row>
        {/*  Name} */}

        {/* Level{ */}
        <Row centered>
          <Column width={16}>
            <LevelBtnGroup level={level} callback={ this.levelBtnGroup_callback } />
          </Column>
        </Row>
        {/* Level} */}

        {/* TypeSelector{ */}
        <Row centered>
          <Column width={16}>
            <TypeSelector callback={ this.typeSelector_callback } />
          </Column>
        </Row>
        {/* TypeSelector} */}
      </div>
    )
  }
}



export default InfoPanel