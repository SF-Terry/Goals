import moment from 'moment'

import { getLanguage } from '../../store/localStore'



/**
 * get timing info
 * @param {moment} startDate
 * @param {moment} endDate
 */
const getTimingInfo = (startDate, endDate) => {
  const currentLanguage = getLanguage()

  const isBefore = moment().isSameOrBefore(startDate);
  const isDoing = moment().isAfter(startDate) && moment().isSameOrBefore(endDate);
  const isAfter = moment().isAfter(endDate);

  if (isBefore) {
    const s = moment().to(startDate, true);
    if (currentLanguage === 'zh') {
      return s.replace(/ /g, "") + '后开始';
    }
    if (currentLanguage === 'en') {
      return 'Start after ' + s;
    }
    
  }
  if (isDoing) {
    const s = moment().to(endDate, true);
    if (currentLanguage === 'zh') {
      return s.replace(/ /g, "") + '后结束';   
    }
    if (currentLanguage === 'en') {
      return 'End after ' + s;
    }
  }
  if (isAfter) {
    const s = moment().to(endDate, true);
    if (currentLanguage === 'zh') {
      return '超时' + s.replace(/ /g, "");
    }
    if (currentLanguage === 'en') {
      return 'Timeout: ' + s;
    }
  }
}


export default getTimingInfo