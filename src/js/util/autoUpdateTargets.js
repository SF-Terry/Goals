import moment from 'moment'

import { allTargetTypeUnits } from '../store/initialState'
import { modifyTarget } from '../action/modifyTarget'


/**
 * auto update targets
 * @param {number} interval
 */
const autoUpdateTargets = timeInterval => {
  const dispatch = ReduxStore.dispatch
  const getTargets = () => ReduxStore.getState().targets

  /**
   * set target completed to uncompleted
   * @param {object} target 
   */
  const setTargetUnCompleted = id => {
    dispatch(modifyTarget({
      id,
      key: 'isCompleted',
      value: false
    }))
  }

  /**
   * update the start date, end date, minimum date and maximum date of target by target's type
   * @param {object} o 
   *     @param {string} id
   *     @param {number} type
   *     @param {moment} startDate
   *     @param {moment} endDate
   *     @param {moment} minDate
   *     @param {moment} maxDate
   */
  const updateTargetDate = ({ id, type, startDate, endDate, minDate, maxDate }) => {
    const unit = allTargetTypeUnits.get(type)
    const beginOfNow = moment().startOf(type)

    const updateDate = (date, dateStr) => {
      const beginOfDate = date.startOf(unit)
      const interval = Math.abs(beginOfNow.diff(beginOfDate, unit))
      const resultDate = date.add(interval, unit)
      dispatch(modifyTarget({
        id,
        key: dateStr,
        value: resultDate
      }))
    }

    // update startDate
    updateDate(startDate, 'startDate')
    // update startDate
    updateDate(endDate, 'endDate')
    // update startDate
    updateDate(minDate, 'minDate')
    // update startDate
    updateDate(maxDate, 'maxDate')
  }

  /**
   * get minimum obsoleted date 
   * @param {moment} completeDate 
   * @param {number} type 
   */
  const getObsoletedDate = (completeDate, type) => {
    const unit = allTargetTypeUnits.get(type)
    return completeDate.endOf(unit)
  }

  /**
   * settle repeating target
   * @param {object} target 
   */
  const settleRepeatingTarget = target => {
    const {
      id,
      type,
      isTiming,
      isCompleted
    } = target
    const completeDate = target.completeDate ? moment(target.completeDate) : null
    const startDate = target.startDate ? moment(target.startDate) : null
    const endDate = target.endDate ? moment(target.endDate) : null
    const minDate = target.minDate ? moment(target.minDate) : null
    const maxDate = target.maxDate ? moment(target.maxDate) : null

    const notTimingObsoletedDate = isCompleted ? getObsoletedDate(completeDate, type) : null
    const isTimingObsoletedDate = startDate ? getObsoletedDate(startDate, type) : null
    const obsoletedDate = isTiming ? isTimingObsoletedDate : notTimingObsoletedDate
    // { target isn't timing
    if (!isTiming) {
      // { target isn't completed
      // do nothing
      // } target isn't completed
      // { target is completed
      if (isCompleted) {
        // completed date is obsoleted
        const isCompletedDateObsoleted = moment().isAfter(obsoletedDate)
        if (isCompletedDateObsoleted) {
          // set target completed to uncompleted
          setTargetUnCompleted(id)
        }
      }
      // } target is completed
    }
    // } target isn't timing

    // { target is timing
    if (isTiming) {
      // { target isn't completed
      if (!isCompleted) {
        //   completed date is obsoleted, update start date, end date, minimum date and maximum date
        const isCompletedDateObsoleted = moment().isAfter(obsoletedDate)
        if (isCompletedDateObsoleted) {
          //   update start date, end date, minimum date and maximum date
          updateTargetDate({
            id,
            type,
            startDate,
            endDate,
            minDate,
            maxDate
          })
        }
      }
      // } target isn't completed
      // { target is completed
      if (isCompleted) {
        // completed date is obsoleted
        const isCompletedDateObsoleted = moment().isAfter(obsoletedDate)
        if (isCompletedDateObsoleted) {
          // set target completed to uncompleted
          setTargetUnCompleted(id)
          //   update start date, end date, minimum date and maximum date
          updateTargetDate({
            id,
            type,
            startDate,
            endDate,
            minDate,
            maxDate
          })
        }
      }
      // } target is completed
    }
    // } target is timing
  }

  // settle repeating target every 'timeInterval' millisconds
  setInterval(() => {
    // { update target by its repeating propery
    const targets = getTargets()
    // fileter target repeating, not deleted, and its type is 'today', 'week', 'month' or 'year'
    targets
      .filter(target => !target.isDeleted && target.isRepeating && (target.type === 1 || target.type === 2 || target.type === 3 || target.type === 5))
      .map(target => {
        settleRepeatingTarget(target)
      })
    // } update target by its repeating propery
  }, timeInterval)

}

export default autoUpdateTargets