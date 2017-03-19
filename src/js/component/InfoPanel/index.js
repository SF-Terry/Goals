import React from 'react'
import { Button, Grid, Input, Checkbox } from 'semantic-ui-react'
const { Row, Column } = Grid

import LevelBtnGroup from './LevelBtnGroup'
import TypeSelector from './TypeSelector'



class InfoPanel extends React.Component {
  constructor(props) {
    super(props)

    this._onTimerClick = this._onTimerClick.bind(this)
    this._onRepeaterClick = this._onRepeaterClick.bind(this)
  }

  /**
   * timer checkbox's click event
   * @param {*} e 
   * @param {*} info 
   */
  _onTimerClick(e, info) {
    const { onTimerClick } = this.props
    const { checked } = info
    
    onTimerClick(!checked)
  }

  /**
   * repeater checkbox's click event
   * @param {*} e 
   * @param {*} info 
   */
  _onRepeaterClick(e, info) {
    const { onRepeaterClick } = this.props
    const { checked } = info
    
    onRepeaterClick(!checked)
  }

  /**
   * TypeSelector component's callback 
   * @param {String}  type target type
   */
  _typeSelector_callback(type) {
    console.log(type)
  }

  render() {
    const {
      name,
      level,
      type,
      isTiming,
      isRepeating,
      onNameInputChange,
      onLevelBtnClick,
      onTypeSelectorChange,
      onCancelClick
    } = this.props

    return (
      <Grid>
        {/*  Name{ */}
        <Row centered>
          <Column width={14}>
            <Input placeholder='任务内容' fluid value={name} onChange={onNameInputChange} />
          </Column>
        </Row>
        {/*  Name} */}

        {/* Level{ */}
        <Row centered>
          <Column width={16} textAlign='center'>
            <LevelBtnGroup activatedLevel={level} onBtnClick={onLevelBtnClick} />
          </Column>
        </Row>
        {/* Level} */}

        {/*TypeSelector{ */}
        <Row centered>
          <Column width={16}>
            <TypeSelector type={type} onChange={onTypeSelectorChange} />
          </Column>
        </Row>
        {/* TypeSelector} */}

        <Row centered>
          {/* Timer{ */}
          <Column width={8} textAlign='center'>
            <Checkbox label='定时'  checked={isTiming} onClick={this._onTimerClick} />
          </Column>
          {/* Timer}*/}

          {/* Repeat{ */}
          <Column width={8} textAlign='center'>
            <Checkbox label='重复' checked={isRepeating} onClick={this._onRepeaterClick} />
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
            <Button content='返回' fluid color='grey' onClick={onCancelClick} />
          </Column>
        </Row>
        {/* Cancel Btn} */}

      </Grid>
    )
  }
}

InfoPanel.propTypes = {
  name: React.PropTypes.string,
  level: React.PropTypes.number,
  type: React.PropTypes.number,
  isTiming: React.PropTypes.bool,
  isRepeating: React.PropTypes.bool,
  onNameInputChange: React.PropTypes.func,
  onLevelBtnClick: React.PropTypes.func,
  onTypeSelectorChange: React.PropTypes.func,
  onTimerClick: React.PropTypes.func,
  onRepeaterClick: React.PropTypes.func,
  onCancelClick: React.PropTypes.func,
}


export default InfoPanel