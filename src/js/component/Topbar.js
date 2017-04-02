import React from 'react'

import {
  Button,
  Dropdown
} from 'semantic-ui-react'


const Topbar = ({ onDayClick,
  onWeekClick,
  onMonthClick, onProjectClick, onYearClick, onLongClick, onNextDayClick, onNextWeekClick, onNextMonthClick, onNextYearClick, onTimelineClick, onRecycleClick, onImportClick, onExportClick }) => (
    <div style={{
      textAlign: 'center',
      margin: '20px'
    }}>
      <Button.Group>
        <Button onClick={onDayClick}>D</Button>
        <Button onClick={onWeekClick}>W</Button>
        <Button onClick={onMonthClick}>M</Button>
        <Button onClick={onProjectClick}>P</Button>
        <Dropdown text='Fn' floating button>
          <Dropdown.Menu>
            <Dropdown.Item text='Year' onClick={onYearClick} />
            <Dropdown.Item text='Long' onClick={onLongClick} />
            <Dropdown.Item text='NextDay' onClick={onNextDayClick} />
            <Dropdown.Item text='NextWeek' onClick={onNextWeekClick} />
            <Dropdown.Item text='NextMonth' onClick={onNextMonthClick} />
            <Dropdown.Item text='NextYear' onClick={onNextYearClick} />
            <Dropdown.Item active text='Timeline' onClick={onTimelineClick} />
            <Dropdown.Item active text='Recycle' onClick={onRecycleClick} />
            <Dropdown.Item active text='Import Data' onClick={onImportClick} />
            <Dropdown.Item active text='Export Data' onClick={onExportClick} />
          </Dropdown.Menu>
        </Dropdown>
      </Button.Group>
    </div>
  )


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