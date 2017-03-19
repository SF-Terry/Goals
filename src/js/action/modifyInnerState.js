/**
 * modify innerState
 */

const MODIFY_INNERSTATE_ROUTE = 'MODIFY_INNERSTATE_ROUTE'
const MODIFY_INNERSTATE_TIMETYPE = 'MODIFY_INNERSTATE_TIMETYPE'
const MODIFY_INNERSTATE_TMPTARGET = 'MODIFY_INNERSTATE_TMPTARGET'
const MODIFY_INNERSTATE_TMPTARGET_NAME = 'MODIFY_INNERSTATE_TMPTARGET_NAME'
const MODIFY_INNERSTATE_TMPTARGET_LEVEL = 'MODIFY_INNERSTATE_TMPTARGET_LEVEL'
const MODIFY_INNERSTATE_TMPTARGET_TYPE = 'MODIFY_INNERSTATE_TMPTARGET_TYPE'
const MODIFY_INNERSTATE_TMPTARGET_ISTIMING = 'MODIFY_INNERSTATE_TMPTARGET_ISTIMING'
const MODIFY_INNERSTATE_TMPTARGET_ISCOMPLETED = 'MODIFY_INNERSTATE_TMPTARGET_ISCOMPLETED'
const MODIFY_INNERSTATE_TMPTARGET_ISREPEATING = 'MODIFY_INNERSTATE_TMPTARGET_ISREPEATING'
const MODIFY_INNERSTATE_TMPTARGET_CREATEDATE = 'MODIFY_INNERSTATE_TMPTARGET_CREATEDATE'
const MODIFY_INNERSTATE_TMPTARGET_COMPLETEDATE = 'MODIFY_INNERSTATE_TMPTARGET_COMPLETEDATE'
const MODIFY_INNERSTATE_TMPTARGET_STARTDATE = 'MODIFY_INNERSTATE_TMPTARGET_STARTDATE'
const MODIFY_INNERSTATE_TMPTARGET_ENDDATE = 'MODIFY_INNERSTATE_TMPTARGET_ENDDATE'
const MODIFY_INNERSTATE_TMPTARGET_MINDATE = 'MODIFY_INNERSTATE_TMPTARGET_MINDATE'
const MODIFY_INNERSTATE_TMPTARGET_MAXDATE = 'MODIFY_INNERSTATE_TMPTARGET_MAXDATE'


/**
 *  manufature actions
 * @param {string} type 
 * @return {function} action function
 *     @param {} value 
 */
const manufature = type => value => ({
  type,
  value
})

/**
 * modify route in innerState
 * @param  {number} value 
 */
export const modifyInnerState_route = manufature(MODIFY_INNERSTATE_ROUTE)

/**
 * modify time type(time selector) in innerState
 * @param  {number} value 
 */
export const modifyInnerState_timeType = manufature(MODIFY_INNERSTATE_TIMETYPE)

/**
 * modify temporary target in innerState
 * @param {object} value 
 */
export const modifyInnerState_tmpTarget = manufature(MODIFY_INNERSTATE_TMPTARGET)

/**
 * modify temporary target's name in innerState
 * @param {string} value 
 */
export const modifyInnerState_tmpTarget_name = manufature(MODIFY_INNERSTATE_TMPTARGET_NAME)

/**
 * modify temporary target's level in innerState
 * @param {number} value 
 */
export const modifyInnerState_tmpTarget_level = manufature(MODIFY_INNERSTATE_TMPTARGET_LEVEL)

/**
 * modify temporary target's type in innerState
 * @param {number} value 
 */
export const modifyInnerState_tmpTarget_type = manufature(MODIFY_INNERSTATE_TMPTARGET_TYPE)

/**
 * modify temporary target's timing state in innerState
 * @param {boolean} value 
 */
export const modifyInnerState_tmpTarget_isTiming = manufature(MODIFY_INNERSTATE_TMPTARGET_ISTIMING)

/**
 * modify temporary target's completed state in innerState
 * @param {boolean} value 
 */
export const modifyInnerState_tmpTarget_isCompleted = manufature(MODIFY_INNERSTATE_TMPTARGET_ISCOMPLETED)

/**
 * modify temporary target's repeating state in innerState
 * @param {boolean} value 
 */
export const modifyInnerState_tmpTarget_isRepeating = manufature(MODIFY_INNERSTATE_TMPTARGET_ISREPEATING)

/**
 * modify temporary target's create date in innerState
 * @param {boolean} value 
 */
export const modifyInnerState_tmpTarget_createDate = manufature(MODIFY_INNERSTATE_TMPTARGET_CREATEDATE)

/**
 * modify temporary target's complete date in innerState
 * @param {boolean} value 
 */
export const modifyInnerState_tmpTarget_completeDate = manufature(MODIFY_INNERSTATE_TMPTARGET_COMPLETEDATE)

/**
 * modify temporary target's start date in innerState
 * @param {boolean} value 
 */
export const modifyInnerState_tmpTarget_startDate = manufature(MODIFY_INNERSTATE_TMPTARGET_STARTDATE)

/**
 * modify temporary target's end date in innerState
 * @param {boolean} value 
 */
export const modifyInnerState_tmpTarget_endDate = manufature(MODIFY_INNERSTATE_TMPTARGET_ENDDATE)

/**
 * modify temporary target's minimum date in innerState
 * @param {boolean} value 
 */
export const modifyInnerState_tmpTarget_minDate = manufature(MODIFY_INNERSTATE_TMPTARGET_MINDATE)

/**
 * modify temporary target's maximum date in innerState
 * @param {boolean} value 
 */
export const modifyInnerState_tmpTarget_maxDate = manufature(MODIFY_INNERSTATE_TMPTARGET_MAXDATE)