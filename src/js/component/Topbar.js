import React from 'react'

import { Button, Dropdown } from 'semantic-ui-react'


const Topbar = () => (
  <div style={{ 
    textAlign: 'center',
    margin: '20px'
  }}>
    <Button.Group>
      <Button>Day</Button>
      <Button>Week</Button>
      <Button>Month</Button>
      <Button>Project</Button>
      <Dropdown text='Fn' floating button>
        <Dropdown.Menu>
          <Dropdown.Item text='Year' />
          <Dropdown.Item text='NextDay' />
          <Dropdown.Item text='NextWeek' />
          <Dropdown.Item text='NextMonth' />
          <Dropdown.Item text='NextYear' />
          <Dropdown.Item active text='Import Data' />
          <Dropdown.Item active text='Export Data' />
        </Dropdown.Menu>
      </Dropdown>
    </Button.Group>
  </div>
)


export default Topbar