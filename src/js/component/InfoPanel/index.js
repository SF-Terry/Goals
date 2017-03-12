import React from 'react'
import { Button, Grid, Input, Checkbox } from 'semantic-ui-react'
const { Row, Column } = Grid

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
      <Grid>
        {/*  Name{ */}
        <Row centered>
          <Column width={14}>
            <Input placeholder='任务内容' fluid value={name} />
          </Column>
        </Row>
        {/*  Name} */}

        {/* Level{ */}
        <Row centered>
          <Column width={16} textAlign='center'>
            <LevelBtnGroup level={level} callback={this.levelBtnGroup_callback} />
          </Column>
        </Row>
        {/* Level} */}

        {/* TypeSelector{ */}
        <Row centered>
          <Column width={16}>
            <TypeSelector callback={this.typeSelector_callback} />
          </Column>
        </Row>
        {/* TypeSelector} */}

        <Row centered>
          {/* Timer{ */}
          <Column width={8} textAlign='center'>
            <Checkbox label='定时' />
          </Column>
          {/* Timer}*/}

          {/* Repeat{ */}
          <Column width={8} textAlign='center'>
            <Checkbox label='重复' />
          </Column>
          {/* Repeat}*/}
        </Row>

        {/* Complete Btn{ */}
        <Row centered>
          <Column width={12} >
            <Button content='完成' fluid color='blue' />
          </Column>
        </Row>
        {/* Complete Btn} */}

        {/* ContinueToAdd Btn{ */}
        <Row centered>
          <Column width={12} >
            <Button content='继续添加' fluid color='teal' />
          </Column>
        </Row>
        {/* ContinueToAdd Btn} */}

        {/* Cancel Btn{ */}
        <Row centered>
          <Column width={12} >
            <Button content='返回' fluid color='grey' />
          </Column>
        </Row>
        {/* Cancel Btn} */}
        
      </Grid>
    )
  }
}



export default InfoPanel