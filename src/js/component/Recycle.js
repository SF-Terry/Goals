import React from 'react'
import moment from 'moment'
import ListItemContainer from '../container/ListItemContainer'
import { Segment, Button } from 'semantic-ui-react'


/**
 * sort list items
 * @param {object} a 
 * @param {object} b 
 */
const sort = (a, b) => {
  // sort by deleted date 
  const aDate = moment(a.deletedDate)
  const bDate = moment(b.deletedDate)
  // console.log(1, aDate, bDate)
  const isAfter = aDate.isAfter(bDate)
  const isBefore = aDate.isBefore(bDate)
  if (isAfter) {
    return -1
  }
  if (isBefore) {
    return 1
  }
  return 0
}


const Recycle = ({ items, onBackClick }) => (
  <div>
    <Segment.Group>
      {/* list items { */}
      {[...items].sort(sort).map(item => <ListItemContainer item={item} key={item.id} />)}
      {/* list items } */}
    </Segment.Group>

    <Button content={'Back'} onClick={onBackClick} />
  </div>

)

Recycle.propTypes = {
  items: React.PropTypes.array,
  onBackClick: React.PropTypes.func
};


export default Recycle