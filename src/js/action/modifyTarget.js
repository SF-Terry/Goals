const MODIFY_TARGET = 'MODIFY_TARGET'



/**
 * modify target
 * @param {object} param0 
 */
export const modifyTarget = ({id, key, value}) => {
  return {
    type: MODIFY_TARGET,
    id,
    key,
    value
  }
}