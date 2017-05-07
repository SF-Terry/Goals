import React from 'react'
import moment from 'moment'
import ListItemContainer from '../container/ListItemContainer'
import { Segment, Button, Accordion, Icon, Grid } from 'semantic-ui-react'
const { Row, Column } = Grid

import Lang from '../util/lang/index'


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

  const getYears = timelineInfo => Object.keys(timelineInfo).reverse()
  const getMonths = (timelineInfo, year) => Object.keys(timelineInfo[year]).reverse()
  const getDates = (timelineInfo, year, month) => Object.keys(timelineInfo[year][month]).reverse()
  const getTargets = (timelineInfo, year, month, date) => timelineInfo[year][month][date]

  return getYears(timelineInfo).map((year, i) => (
    <Accordion defaultActiveIndex={0} key={i} fluid>
      <Accordion.Title>
        <h4>
          <Icon name='dropdown' />
          {year}
        </h4>
      </Accordion.Title>
      <Accordion.Content>
        <div>
          {
            getMonths(t, year).map((month, i) => (
              <Accordion defaultActiveIndex={0} key={i}>
                <Accordion.Title>
                  <h5>
                    &nbsp;&nbsp;
                    <Icon name='dropdown' />
                    {month}
                  </h5>
                </Accordion.Title>
                <Accordion.Content>
                  <div>
                    {
                      getDates(t, year, month).map((date, i) => (
                        <Accordion defaultActiveIndex={0} key={i}>
                          <Accordion.Title>
                            &nbsp;&nbsp;&nbsp;&nbsp;
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
  return <Grid>
    <p></p>

    <Row centered>
      <Column width={12} >
        <Button content={Lang.CANCEL} fluid color='teal' onClick={onBackClick} />
      </Column>
    </Row>

    <p></p>

    <Row centered>
      <Column width={15} >
        {getJsx(timelineInfo)}
      </Column>
    </Row>
    

  </Grid>
}

Timeline.propTypes = {
  timelineInfo: React.PropTypes.object,
  onBackClick: React.PropTypes.func,
};
export default Timeline