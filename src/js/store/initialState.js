import moment from 'moment'


export const storeName = 'TargetsManagement'

export const targetModel = {
    name: null,
    type: null,
    level: null,
    createDate: null,
    isCompleted: null,
    completeDate: null,
    isTiming: null,
    startDate: null,
    endDate: null,
    isRepeating: null
  }

export const settingModel = {

}

export const allTargetTypes = new Map([
    ['today', 1],    
    ['week', 2],    
    ['month', 3],       
    ['project', 4],     
    ['year', 5],    
    ['long', 6],    
    ['tomorrow', 7],    
    ['nextWeek', 8],    
    ['nextMonth', 9],       
    ['nextYear', 10]
])

/**
 * time type in TimeSelector
 */
export const allTimeType = new Map([
    ['startTime', 1],
    ['endTime', 2]
])