/**
 * decorate InfoPanel 
 * @param {object} o obect parameter
 *     @param {function} connect redux's connect method 
 *     @param {React.Component} InfoPanel 
 *     @param {function} getName 
 *         @return {string}
 *     @param {function} getLevel 
 *         @return {number}
 *     @param {function} getType 
 *         @return {number}
 *     @param {function} modifyName 
 *     @param {function} modifyLevel 
 *     @param {function} modifyType 
 * 
 * 
 *     @param {function} modifyRoute 
 */
const decorate = ({
  connect,
  InfoPanel,
  getName,
  getLevel,
  getType,
  getIsTiming,
  getIsRepeating,
  modifyRoute,
  modifyName,
  modifyLevel,
  modifyType,
  modifyIsTiming,
  modifyIsRepeating,
}) => {
  const mapStateToProps = state => {
    return {
      name: getName(),
      level: getLevel(),
      type: getType(),
      isTiming: getIsTiming(),
      isRepeating: getIsRepeating(),
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
        dispatch(modifyName(value))
      },
      /**
       * level button click event
       * @param {number} level 
       */
      onLevelBtnClick(level) {
        // change the level of temporary target
        dispatch(modifyLevel(level))
      },
      /**
       * type selector change event
       * @param {} e
       * @param {object} info type info
       */
      onTypeSelectorChange(type) {
        // change the type of temporary target
        dispatch(modifyType(type))
        // show time selector when type is 'project' or 'long'
        const shouldShowTimeSelector = type === 4 || type === 6
        shouldShowTimeSelector && dispatch(modifyRoute(3))
      },
      /**
       * timer's click event
       * @param {boolean} isTiming 
       */
      onTimerClick(isTiming) {
        // change the timing state of temporary target
        dispatch(modifyIsTiming(isTiming))
        // show time selector when timer is activated
        const shouldShowTimeSelector = isTiming
        shouldShowTimeSelector && dispatch(modifyRoute(3))
      },
      /**
       * repeater's click event
       * @param {boolean} isTiming 
       */
      onRepeaterClick(isRepeating) {
        // change the repeating state of temporary target
        dispatch(modifyIsRepeating(isRepeating))
      },
      /**
       * cancel button click event
       */
      onCancelClick() {
        dispatch(modifyRoute(0))
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