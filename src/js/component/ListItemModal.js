import React from 'react'
import { Modal, Button } from 'semantic-ui-react'


class ListItemModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shouldShowDeleteBtn: false
    }

    this._onComplete = this._onComplete.bind(this)
    this._onTop = this._onTop.bind(this)
    this._onMore = this._onMore.bind(this)
    this._onDelete = this._onDelete.bind(this)
  }
  _onComplete() {
    const { target, onComplete } = this.props
    onComplete(target)
  }
  _onTop() {
    const { target, onTop } = this.props
    onTop(target)
  }
  _onDelete() {
    const { target, onDelete } = this.props
    onDelete(target)
  }
  _onMore() {
    this.setState({
      shouldShowDeleteBtn: !this.state.shouldShowDeleteBtn
    })
  }
  render() {
    const { shouldShowDeleteBtn } = this.state
    const { target, onCancel } = this.props

    const { isTopping, isCompleted, isDeleted } = target
    const shouldShowCompletedBtn = !isDeleted
    const shouldShowToppingBtn = !isDeleted
    const shouldShowMoreBtn = !isDeleted
    return (
      <div>
        <Modal className="ListItemModal" open={true} >
          <Modal.Content>
            {
              shouldShowCompletedBtn &&
              <Button id="completeBtn" fluid color='green' onClick={this._onComplete}>
                {isCompleted ? 'Uncompleted' : 'Complete!'}
              </Button>
            }

            <p></p>

            {
              shouldShowToppingBtn &&
              <Button id="topBtn" fluid color='orange' onClick={this._onTop}>
                {isTopping ? 'Cancale Top' : 'Top'}
              </Button>
            }

            <p></p>

            {shouldShowMoreBtn && <Button id="moreBtn" fluid color='grey' onClick={this._onMore}>More</Button>}

            <p></p>

            {(shouldShowDeleteBtn || isDeleted) && <Button id="deleteBtn" fluid color='red' onClick={this._onDelete}>
              {isDeleted ? 'Recover' : 'Delete'}
            </Button>}

            {
              (shouldShowDeleteBtn || isDeleted) && <p></p>
            }

            <Button id="cancelBtn" fluid onClick={onCancel}>Cancel</Button>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

ListItemModal.propTypes = {
  target: React.PropTypes.object,
  onComplete: React.PropTypes.func,
  onTop: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};


export default ListItemModal