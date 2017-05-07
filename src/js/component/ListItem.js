import React from 'react'
import { Label, Segment } from 'semantic-ui-react'
import Tappable from 'react-tappable'
import moment from 'moment'

import getTimingInfo from '../util/lang/getTimingInfo'
import allTargetLevels from '../store/initialState/allTargetLevels'



const ListItem = ({ item, currentDate, onTap, onPress }) => {
  // !!!!!! Attention !!!!!!
  // import parameter: `currentDate` to update list item in realtime

  const {
    name,
    level,
    isTiming,
    startDate: theStartDate,
    endDate: theEndDate
  } = item
  const startDate = theStartDate ? moment(theStartDate) : null
  const endDate = theEndDate ? moment(theEndDate) : null

  const { color } = allTargetLevels.get(level)

  const shouldShowTiming = isTiming

  const _onTap = e => {
    e.preventDefault()
    onTap(item)
  }

  const _onPress = () => {
    onPress(item)
  }
  let timingInfo = shouldShowTiming ? getTimingInfo(startDate, endDate) : null

  const shouldShowPoint = !shouldShowTiming

 
  return (
    <Tappable onPress={_onPress} onTap={_onTap}>
      <Segment className="ListItem" basic >
        { shouldShowPoint && 
          <span>
            <Label circular color={color} empty key={color} size='mini' />
            &nbsp;&nbsp;&nbsp;
          </span>
        }

        {
          shouldShowTiming && 
          <span>
            <Label className="Label" color={color} style={{
              marginBottom: '3px'
            }}>{timingInfo}</Label>
            &nbsp;&nbsp;&nbsp;
          </span>
          
        }

        <span>{name}</span>
      </Segment>
      <p></p>
      <p></p>
    </Tappable>
  )
}

ListItem.propTypes = {
  item: React.PropTypes.object,
  onTap: React.PropTypes.func,
  onPress: React.PropTypes.func
};

export default ListItem