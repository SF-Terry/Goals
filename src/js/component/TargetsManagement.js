import React from 'react'

import { Message } from 'semantic-ui-react'

import TopbarContainer from '../container/TopbarContainer'
import MainContentContainer from '../container/MainContentContainer'
import AddBtnContainer from '../container/AddBtnContainer'
import AddPageInfoPanelContainer from '../container/InfoPanelContainer/AddPageInfoPanelContainer'
import EditPageInfoPanelContainer from '../container/InfoPanelContainer/EditPageInfoPanelContainer'
import TimeSelectorContainer from '../container/TimeSelectorContainer'
import ListItemModalContainer from '../container/ListItemModalContainer'
import TimelineContainer from '../container/TimelineContainer'
import RecycleContainer from '../container/RecycleContainer'



const MessageBox = () => (
	<div id='caveat'>
		<Message negative>
			<Message.Header>{GV.caveat}</Message.Header>
		</Message>
	</div>
)


/**
 * composition
 * - Topbar
 * - MainContent
 * - AddBtn
 */
const TargetsManagement = ({
	shouldShowCaveat,
	shouldShowListItemModal,
	route
}) => (
		<div id="TargetsManagement">
			{
				// caveat message
				shouldShowCaveat && <MessageBox />
			}


			{
				// route to home page
				route === 0 && (
					<div>
						<TopbarContainer />
						<MainContentContainer />
						<AddBtnContainer />
					</div>
				)
			}

			{
				// route to adding page
				route === 1 && <AddPageInfoPanelContainer />
			}

			{
				// route to editing page
				route === 2 && <EditPageInfoPanelContainer />
			}

			{
				// route to time setting page
				route === 3 && <TimeSelectorContainer />
			}

			{
				// route to timeline page
				route === 4 && <TimelineContainer />
			}


			{
				// route to recycle page
				route === 5 && <RecycleContainer />
			}

			{/* show modal { */}
			{shouldShowListItemModal && <ListItemModalContainer />}
			{/* show modal } */}
		</div>
	)


TargetsManagement.propTypes = {
	shouldShowCaveat: React.PropTypes.bool,
	shouldShowListItemModal: React.PropTypes.bool,
	route: React.PropTypes.number
};

export default TargetsManagement