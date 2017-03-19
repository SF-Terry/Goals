import {
  modifyInnerState_route,
  modifyInnerState_tmpTarget_name,
  modifyInnerState_tmpTarget_level,
  modifyInnerState_tmpTarget_type,
  modifyInnerState_tmpTarget_isTiming,
  modifyInnerState_tmpTarget_isRepeating
} from '../../action/modifyInnerState'

import validator from '../../util/validator'


/**
 * get current state
 */
const getState = () => ReduxStore.getState()
/**
 * get temporary target
 */
const getTmpTarget = () => getState().innerState.tmpTarget


/**
 * decorate InfoPanel 
 * @param {object} o obect parameter
 *     @param {function} connect redux's connect method 
 *     @param {React.Component} InfoPanel 
 *     @param {function} onClickConfirm confirm button's click event
 *     @param {function} onClickContinueAdd continute adding button's click event
 */
const decorate = ({
  connect,
  InfoPanel,
  onConfirmClick,
  onContinueAddClick
}) => {
  const mapStateToProps = state => {
    return {
      name: getTmpTarget().name,
      level: getTmpTarget().level,
      type: getTmpTarget().type,
      isTiming: getTmpTarget().isTiming,
      isRepeating: getTmpTarget().isRepeating,
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      /**
       * name Input's change event 
       * @param {} e 
       * @param {object} info input info 
       */
      onNameInputChange(e, info) {
        const { value } = info

        // change the name of temporary target
        dispatch(modifyInnerState_tmpTarget_name(value))
      },
      /**
       * level button click event
       * @param {number} level 
       */
      onLevelBtnClick(level) {
        // change the level of temporary target
        dispatch(modifyInnerState_tmpTarget_level(level))
      },
      /**
       * type selector change event
       * @param {} e
       * @param {object} info type info
       */
      onTypeSelectorChange(type) {
        // change the type of temporary target
        dispatch(modifyInnerState_tmpTarget_type(type))
        // reset timer to untime
        dispatch(modifyInnerState_tmpTarget_isTiming(false))
        // show time selector when type is 'project' or 'long'
        const shouldShowTimeSelector = type === 4 || type === 6
        shouldShowTimeSelector && dispatch(modifyInnerState_route(3))
      },
      /**
       * timer's click event
       * @param {boolean} isTiming 
       */
      onTimerClick(isTiming) {
        // make timer unchecked when timer is checked
        const shouldUncheck = isTiming
        shouldUncheck && dispatch(modifyInnerState_tmpTarget_isTiming(false))
        // show time selector when timer is activated
        const shouldShowTimeSelector = !isTiming
        shouldShowTimeSelector && dispatch(modifyInnerState_route(3))
      },
      /**
       * repeater's click event
       * @param {boolean} isTiming 
       */
      onRepeaterClick(isRepeating) {
        // change the repeating state of temporary target
        dispatch(modifyInnerState_tmpTarget_isRepeating(!isRepeating))
      },
      /**
       * confirm button's click event
       */
      onConfirmClick,
      /**
       * continute to add button's click event, used in adding page info panel
       */
      onContinueAddClick,
      /**
       * cancel button click event
       */
      onCancelClick() {
        dispatch(modifyInnerState_route(0))
      },
      /**
       * validate the temporary target
       */
      validate() {
        const { tmpTarget } = ReduxStore.getState().innerState
        const isValidSuccess = validator.target(tmpTarget)
        return isValidSuccess
      }
    }
  }

  const InfoPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(InfoPanel)

  return InfoPanelContainer
}


export default decorate