import React from 'react'
import moment from 'moment'
import ListItemContainer from '../container/ListItemContainer'
import { Segment } from 'semantic-ui-react'


/**
 * sort list items
 * @param {object} a 
 * @param {object} b 
 */
const sort = (a, b) => {
  // sort by level first
  const isSameLevel = a.level === b.level
  if (!isSameLevel) {
    if (a.level > b.level) {
      return 1
    }
    if (a.level < b.level) {
      return -1
    }
  }
  if (isSameLevel) {
    // sort by isTopping 
    const isSameIsTopping = a.isTopping === b.isTopping
    const isBothTopping = a.isTopping && b.isTopping
    if (!isSameIsTopping) {
      if (a.isTopping && !b.isTopping) {
        return -1
      }
      if (!a.isTopping && b.isTopping) {
        return 1
      }
    }

    // if items are both topping, sort by topping date
    if (isBothTopping) {
      const aDate = moment(a.toppingDate)
      const bDate = moment(b.toppingDate)
      const isAfter = aDate.isAfter(bDate)
      const isBefore = aDate.isBefore(bDate)
      if (isAfter) {
        return -1
      }
      if (isBefore) {
        return 1
      }
    }

    if (isSameIsTopping) {
      // sort by isTiming 
      const isSameIsTiming = a.isTiming === b.isTiming
      if (!isSameIsTiming) {
        if (a.isTiming && !b.isTiming) {
          return -1
        }
        if (!a.isTiming && b.isTiming) {
          return 1
        }
      }
      if (isSameLevel) {
        // sort by start date 
        const aDate = moment(a.startDate)
        const bDate = moment(b.startDate)
        const isAfter = aDate.isAfter(bDate)
        const isBefore = aDate.isBefore(bDate)
        if (isAfter) {
          return 1
        }
        if (isBefore) {
          return -1
        }
      }
    }
  }
  return 0
}


const MainContent = ({ type, items }) => (
  <div>
    type: {type}
    <Segment.Group>
      {/* list items { */}
      {[...items].sort(sort).map(item => <ListItemContainer item={item} key={item.id} />)}
      {/* list items } */}
    </Segment.Group>
  </div>

)

MainContent.propTypes = {
  type: React.PropTypes.number,
  items: React.PropTypes.array
};


export default MainContent