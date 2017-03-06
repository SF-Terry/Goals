import React from 'react'

import { Button } from 'semantic-ui-react'


const buttonInfo = {
  a: {
    color: 'red',
    text: '重急'
  },
  b: {
    color: 'orange',
    text: '重要'
  },
  c: {
    color: 'yellow',
    text: '紧急'
  },
  d: {
    color: 'blue',
    text: '正常'
  }
}

class LevelBtnGroup extends React.Component {
  constructor(props) {
    super(props)

    const {level: defaultLevel} = this.props

    this.state = {
      level: defaultLevel
    }
  }

  btnClick(level) {

    // callback
    this.props.callback(level)
    
    // change state
    this.setState({
      level
    })
  }

  isNotActive(level) {
    return this.state.level !== level
  }
  
  render() {
    // make up 4 button jsx
    const buttons = Object.keys(buttonInfo).map((level) => {
      const content = buttonInfo[level].text
      const color = buttonInfo[level].color
      return <Button key={level} className='levelBtn' basic={ this.isNotActive( level ) } content={content} color={color} onClick={ () => this.btnClick(level) } />
    })

    return (
      <div>
        {buttons}
      </div>
    )
  }
}



export default LevelBtnGroup