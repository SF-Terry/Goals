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
    isRepeating: null,
  }

export const settingModel = {

}

export const allTargetTypes = [
    'today',
    'week',
    'month',
    'project',
    'year',
    'long',
    'nextWeek',
    'nextMonth',
    'nextYear'
]