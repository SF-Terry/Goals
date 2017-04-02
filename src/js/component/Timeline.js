import React from 'react'
import moment from 'moment'
import ListItemContainer from '../container/ListItemContainer'
import { Segment, Button, Accordion, Icon } from 'semantic-ui-react'


/**
 * sort list targets
 * @param {object} a 
 * @param {object} b 
 */
const sort = (a, b) => {
  // sort by end date 
  const aDate = moment(a.completeDate)
  const bDate = moment(b.completeDate)
  const isAfter = aDate.isAfter(bDate)
  const isBefore = aDate.isBefore(bDate)
  if (isAfter) {
    return 1
  }
  if (isBefore) {
    return -1
  }
  return 0
}


/**
 * get jsx to render
 * @param {object} timelineInfo 
 */
const getJsx = timelineInfo => {
  const t = timelineInfo

  const getYears = timelineInfo => Object.keys(timelineInfo)
  const getMonths = (timelineInfo, year) => Object.keys(timelineInfo[year])
  const getDates = (timelineInfo, year, month) => Object.keys(timelineInfo[year][month])
  const getTargets = (timelineInfo, year, month, date) => timelineInfo[year][month][date]

  return getYears(timelineInfo).map((year, i) => (
    <Accordion defaultActiveIndex={0} key={i}>
      <Accordion.Title>
        <Icon name='dropdown' />
        {year}
      </Accordion.Title>
      <Accordion.Content>
        <div>
          {
            getMonths(t, year).map((month, i) => (
              <Accordion defaultActiveIndex={0} key={i}>
                <Accordion.Title>
                  <Icon name='dropdown' />
                  {month}
                </Accordion.Title>
                <Accordion.Content>
                  <div>
                    {
                      getDates(t, year, month).map((date, i) => (
                        <Accordion defaultActiveIndex={0} key={i}>
                          <Accordion.Title>
                            <Icon name='dropdown' />
                            {date}
                          </Accordion.Title>
                          <Accordion.Content>
                            <div>
                              {
                                getTargets(t, year, month, date).map((target, i) => (
                                  <ListItemContainer item={target} key={i} />
                                ))
                              }
                            </div>
                          </Accordion.Content>
                        </Accordion>
                      ))
                    }
                  </div>
                </Accordion.Content>
              </Accordion>
            ))
          }
        </div>
      </Accordion.Content>
    </Accordion>
  ))
}


const Timeline = ({ timelineInfo, onBackClick }) => {
  return <div>

    {getJsx(timelineInfo)}
    {/*<Segment.Group>*/}
    {/* list targets { */}
    {/*{[...targets].sort(sort).map(item => <ListItemContainer item={item} key={item.id} />)}*/}
    {/* list targets } */}
    {/*</Segment.Group>*/}


    <Button content={'Back'} onClick={onBackClick} />
  </div>
}

Timeline.propTypes = {
  timelineInfo: React.PropTypes.object,
  onBackClick: React.PropTypes.func,
};
export default Timeline