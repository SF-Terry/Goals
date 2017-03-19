import moment from 'moment'

import { getReverseMap } from '../util'


/**
 * @const {string}
 * name used in localStorage 
 */
export const storeName = 'TargetsManagement'


/**
 * @const {object}
 * target model
 */
export const targetModel = {
    /**
     * @var {number}
     * id
     * default is null
     */
    id: null,
    /**
     * @var {string}
     * name
     * default is empty string
     */
    name: '',
    /**
     * @var {number}
     * type
     * default is 'today'
     */
    type: 1,
    /**
     * @var {number}
     * level
     */
    level: 2,
    /**
     * @var {moment}
     * createDate
     */
    createDate: null,
    /**
     * @var {moment}
     * completeDate
     */
    completeDate: null,
    /**
     * @var {moment}
     * startDate
     */
    startDate: null,
    /**
     * @var {moment}
     * endDate
     */
    endDate: null,
    /**
     * @var {moment}
     * minimum date used in time selector
     */
    minDate: null,
    /**
     * @var {moment}
     * maximum date  in time selector
     */
    maxDate: null,
    /**
     * @var {boolean}
     * is or not Completed
     */
    isCompleted: null,
    /**
     * @var {boolean}
     * is or not timing
     */
    isTiming: false,
    /**
     * @var {boolean}
     * is or not repeating
     */
    isRepeating: false
  }

/**
 * @const {object}
 * setting model
 */
export const settingModel = {

}

/**
 * @const {object}
 * innerState model
 */
export const innerStateModel = {
    /**
     * @var {number}
     * current mock page id
     * default is 0(home page)
     */
    route: 2,
    /**
     * @var {number}
     * prev mock page id
     * default is 0(home page)
     */
    prevRoute: 0,
    /**
     * @var {object}
     * temporary target
     */
    tmpTarget: {...targetModel},
    /**
     * @var {object}
     * the time type of time selector
     * default is 'startTime'
     */
    timeType: 1,
    /**
     * show caveat or not
     */
    shouldShowCaveat: false
}

/**
 * @const {map}
 * all the target types 
 */
export const allTargetTypes = new Map([
    [1, 'today'],    
    [2, 'week'],    
    [3, 'month'],       
    [4, 'project'],     
    [5, 'year'],    
    [6, 'long'],    
    [7, 'tomorrow'],    
    [8, 'nextWeek'],    
    [9, 'nextMonth'],       
    [10, 'nextYear']
])

/**
 * @const {map}
 * all the target types (reverse)
 */
export const allTargetTypes_reverse = getReverseMap(allTargetTypes)

/**
 * @const {map}
 * all the target levels
 */
export const allTargetLevels = new Map([
    [1, {
        color: 'red',
        text: 'Imp&Urg'
    }],
    [2, {
        color: 'orange',
        text: 'Imp'
    }],
    [3, {
        color: 'yellow',
        text: 'Urg'
    }],
    [4, {
        color: 'blue',
        text: 'Norm'
    }],
])

/**
 * @const {map}
 * all time types in TimeSelector
 */
export const allTimeType = new Map([
    [1, 'startTime'],
    [2, 'endTime']
])


/**
 * @const {map}
 * all route pages
 */
export const allPages = new Map([
    ['home', 0],
    ['add', 1],
    ['modify', 2],
    ['setTime', 3]
])

