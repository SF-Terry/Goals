import React from 'react'
import Topbar from './Topbar'
import MainContent from './MainContent'
import AddBtn from './AddBtn'
import InfoPanel from './InfoPanel/index'
import TimeSelector from './InfoPanel/TimeSelector'


/**
 * composition
 * - Topbar
 * - MainContent
 * - AddBtn
 */
const TargetsManagement = () => (
	<div id="TargetsManagement">
		{/*<Topbar />*/}
		{/*<MainContent />*/}
		{/*<AddBtn />*/}
		{/*<InfoPanel />*/}
		<TimeSelector targetType={1} timeType={1} timeSelectorCallback={ data => console.log(data) } />
	</div>
)


export default TargetsManagement