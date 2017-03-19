import React from 'react'

import { Message } from 'semantic-ui-react'

import Topbar from './Topbar'
import MainContent from './MainContent'
import AddBtnContainer from '../container/AddBtnContainer'
import AddPageInfoPanelContainer from '../container/InfoPanelContainer/AddPageInfoPanelContainer'
import EditPageInfoPanelContainer from '../container/InfoPanelContainer/EditPageInfoPanelContainer'
import TimeSelectorContainer from '../container/TimeSelectorContainer'



const MessageExampleNegative = () => (
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
	route
}) => (
		<div id="TargetsManagement">
			{
				// caveat message
				shouldShowCaveat && <MessageExampleNegative />
			}


			{
				// route to home page
				route === 0 && (
					<div>
						<Topbar />
						<MainContent />
						<AddBtnContainer />
					</div>
				)
			}

			{
				// route to add page
				route === 1 && <AddPageInfoPanelContainer />
			}

			{
				// route to edit page
				route === 2 && <EditPageInfoPanelContainer />
			}

			{
				// route to set time page
				route === 3 && <TimeSelectorContainer />
			}
		</div>
	)


export default TargetsManagement