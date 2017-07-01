import React from 'react'

import {
  Icon,
  Form,
  Message,
  TextArea
} from 'semantic-ui-react'


class Remarks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isRemarkEditing: this.props.isRemarkEditing || false
    }

    this.onEditClick = this.onEditClick.bind(this)
    this.onTextareBlur = this.onTextareBlur.bind(this)
  }

  onEditClick() {
    this.setState({
      isRemarkEditing: true
    })
  }

  onTextareBlur() {
    console.log('bluring')
  }

  render() {
    const {
      content,
      onChange
    } = this.props

    const {
      isRemarkEditing
    } = this.state

    const isEmpty = content.trim() === ''

    return (
      <div>
        {
          isEmpty && !isRemarkEditing && 
          <span>
            <Icon name='commenting outline' color='blue' size='large' onClick={this.onEditClick} />
            &nbsp;&nbsp;
          </span> 
        }

        <p></p>

        <div style={{
          textAlign: 'left'
        }}>
          {
            !isEmpty && !isRemarkEditing &&
            <Message color='yellow' onClick={this.onEditClick}>
              {content}
            </Message>
          }
          {
            isRemarkEditing &&
            <Form>
              <TextArea rows={3} placeholder='备注内容' value={content} onChange={onChange} />
            </Form>
          }
        </div>



      </div>
    )
  }
}


export default Remarks