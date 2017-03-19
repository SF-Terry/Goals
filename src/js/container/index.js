import React from 'react'
import { connect } from 'react-redux'

import TargetsManagement from '../component/TargetsManagement'
import { allPages } from '../store/initialState'


const mapStateToProps = (state) => {
	const home = allPages.get("home")
	return {
		route: state.innerState.route || home
	}
}

const TargetsManagementContainer = connect(
	mapStateToProps
)(TargetsManagement)


export default TargetsManagementContainer