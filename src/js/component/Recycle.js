import React from 'react'
import moment from 'moment'
import ListItemContainer from '../container/ListItemContainer'
import { Grid, Segment, Button } from 'semantic-ui-react'

const { Row, Column } = Grid


/**
 * sort list items
 * @param {object} a 
 * @param {object} b 
 */
const sort = (a, b) => {
  // sort by deleted date 
  const aDate = moment(a.deletedDate)
  const bDate = moment(b.deletedDate)
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
  <Grid>
    <p></p>

    <Row centered>
      <Column width={12} >
        <Button content='Back' fluid color='teal' onClick={onBackClick} />
      </Column>
    </Row>

    <Row centered>
      <Column width={16} >
        {/* list items { */}
        {[...items].sort(sort).map(item => <ListItemContainer item={item} key={item.id} />)}
        {/* list items } */}
      </Column>
    </Row>
  </Grid>

)

Recycle.propTypes = {
  items: React.PropTypes.array,
  onBackClick: React.PropTypes.func
};


export default Recycle