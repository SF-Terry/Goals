import React from 'react'

import {
  Button,
  Dropdown
} from 'semantic-ui-react'

// activate button by current list type
const _activateBtn = (type, listType) => {
  return type === listType
}

const Topbar = ({ listType, onDayClick, onWeekClick, onMonthClick, onProjectClick, onYearClick, onLongClick, onNextDayClick, onNextWeekClick, onNextMonthClick, onNextYearClick, onTimelineClick, onRecycleClick, onImportClick, onExportClick }) => {



  return (
    <div style={{
      textAlign: 'center',
      margin: '20px'
    }}>
      <Button.Group  >
        <Button basic active={_activateBtn(1, listType)} onClick={onDayClick}>D</Button>
        <Button basic active={_activateBtn(2, listType)} onClick={onWeekClick}>W</Button>
        <Button basic active={_activateBtn(3, listType)} onClick={onMonthClick}>M</Button>
        <Button basic active={_activateBtn(4, listType)} onClick={onProjectClick}>P</Button>
        <Dropdown text='Fn' button basic >
          <Dropdown.Menu>
            <Dropdown.Item text='Year' active={_activateBtn(5, listType)} onClick={onYearClick} />
            <Dropdown.Item text='Long' active={_activateBtn(6, listType)} onClick={onLongClick} />
            <Dropdown.Item text='NextDay' active={_activateBtn(7, listType)} onClick={onNextDayClick} />
            <Dropdown.Item text='NextWeek' active={_activateBtn(8, listType)} onClick={onNextWeekClick} />
            <Dropdown.Item text='NextMonth' active={_activateBtn(9, listType)} onClick={onNextMonthClick} />
            <Dropdown.Item text='NextYear' active={_activateBtn(10, listType)} onClick={onNextYearClick} />
            <Dropdown.Item active text='Timeline' onClick={onTimelineClick} />
            <Dropdown.Item active text='Recycle' onClick={onRecycleClick} />
            <Dropdown.Item active text='Import Data' onClick={onImportClick} />
            <Dropdown.Item active text='Export Data' onClick={onExportClick} />
          </Dropdown.Menu>
        </Dropdown>
      </Button.Group>
    </div>
  )
}


Topbar.propTypes = {
  onDayClick: React.PropTypes.func,
  onWeekClick: React.PropTypes.func,
  onMonthClick: React.PropTypes.func,
  onProjectClick: React.PropTypes.func,
  onYearClick: React.PropTypes.func,
  onLongClick: React.PropTypes.func,
  onNextDayClick: React.PropTypes.func,
  onNextWeekClick: React.PropTypes.func,
  onNextMonthClick: React.PropTypes.func,
  onNextYearClick: React.PropTypes.func,
  onTimelineClick: React.PropTypes.func,
  onRecycleClick: React.PropTypes.func,
  onImportClick: React.PropTypes.func,
  onExportClick: React.PropTypes.func
};


export default Topbar