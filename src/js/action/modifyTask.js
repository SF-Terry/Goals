const MODIFY_TASK = 'MODIFY_TASK'



/**
 * modify task
 * @param {object} param0 
 */
export const modifyTask = ({id, key, value}) => {
  return {
    type: MODIFY_TASK,
    id,
    key,
    value
  }
}