import React from 'react';

import { 
	Button, 
	Form, 
	Input, 
	Label, 
	Modal, 
	Header
} from 'semantic-ui-react';

import Draggable from 'react-draggable'; 

import Tappable from 'react-tappable';

import FileSaver from 'file-saver';

import tool from '../js/tool.js';


/**
 * class MultiFunctionBtn
 * @receiveProps {function} multiFunctionBtnCallback
 	{bool} isClicked
 */
class MultiFunctionBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowMenu: false,
			isMovingBtn: false,
			exportingModalOpen: false,
			importingModalOpen: false,
			showMailView: false,
			showMailButton: false,
			mailValue: localStorage['mail'] || '',
			importValue: '',
			movingBtnX: 0,
			movingBtnY: 0
		}

		this.handleTapAddButton = this.handleTapAddButton.bind(this);
		this.handleAddBtnDrag = this.handleAddBtnDrag.bind(this);

		this.handleClickExportBtn = this.handleClickExportBtn.bind(this);
		this.handleClickImportBtn = this.handleClickImportBtn.bind(this);
		this.handleClickDownloadBtn = this.handleClickDownloadBtn.bind(this);
		this.handleClickCopyBtn = this.handleClickCopyBtn.bind(this);
		this.handleClickMailBtn = this.handleClickMailBtn.bind(this);
		this.handleClickMailExportBtn = this.handleClickMailExportBtn.bind(this);
		this.mailInputChange = this.mailInputChange.bind(this);
		this.importInputChange = this.importInputChange.bind(this);
		this.handleClickSubImportDataBtn = this.handleClickSubImportDataBtn.bind(this);

		this.openExportingModal = this.openExportingModal.bind(this);
		this.closeExportingModal = this.closeExportingModal.bind(this);
		this.openImportingModal = this.openImportingModal.bind(this);
		this.closeImportingModal = this.closeImportingModal.bind(this);
	}
	componentDidMount() {
		this.floatFunctionBtnDom = document.getElementById('floatFunctionBtn');
	}
	handleTapAddButton(ev) {
		const {isMovingBtn} = this.state;

		if (!isMovingBtn) {
			this.props.multiFunctionBtnCallback({
				isAddBtnTaped: true
			});
			this.setState({
				isShowMenu: false
			});
		}
	}
	handleAddBtnDrag(ev) {
	}
	handleClickExportBtn() {
		this.setState({
			isShowMenu: false
		});

		this.openExportingModal();
		this.setState({
			showMailView: false,
			showMailButton: false
		});
	}
	handleClickImportBtn() {
		this.setState({
			isShowMenu: false
		});

		this.openImportingModal();
	}
	importInputChange(ev, result) {
		const {value} = result;

		this.setState({
			importValue: value
		});
	}
	handleClickSubImportDataBtn() {
		const {importValue} = this.state;
		try {
	        let o = JSON.parse(importValue);

	        if (o && typeof o === "object") {

	            // import data
	            localStorage.todolistStorekeeper = importValue;

	            // refresh page
	            tool.observe_message.setting = {
	            	isShowMessage: true,
	            	message: '导入成功',
	            	color: 'green'
	            };
	            location.href = location.href;
	        }
	    }
	    catch (e) { 
	    	tool.observe_message.setting = {
	    		isShowMessage: true,
	    		message: '数据格式错误',
	    		color: 'red'
	    	};
	    }
	}
	handleClickDownloadBtn() {
		const data = localStorage["todolistStorekeeper"] || '';
		const dateStr = (new Date()).toLocaleString();

		var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
		FileSaver.saveAs(blob, '目标系统数据(' + dateStr + ").json");
	}
	handleClickCopyBtn() {
		const data = localStorage["todolistStorekeeper"] || '';
		const dom = document.getElementById('exportDataInput');

		this.setState({
			showMailButton: true
		});

		tool.copyToClipboard(dom, (b) => {
			if (b) {
				tool.observe_message.setting = {
					isShowMessage: true,
					message: '复制成功',
					color: 'green'
				}
			}
			if (!b) {
				tool.observe_message.setting = {
					isShowMessage: true,
					message: '本浏览器版本不支持此功能，请手动复制!',
					color: 'red'
				}
			}
		});
	}
	handleClickMailBtn() {
		this.setState({
			showMailView: true
		});
	}
	handleClickMailExportBtn() {
		const {mailValue} = this.state;
		const dateStr = (new Date()).toLocaleString();
		const subject = '目标系统数据(' + dateStr + ")";
		const content = localStorage['todolistStorekeeper'] || '';

		localStorage.mail = mailValue;	
		tool.sendMail(mailValue, subject, "在此处粘贴数据");		
		console.log('导出成功');
	}
	mailInputChange(ev, result) {
		const {value} = result;
		
		this.setState({
			mailValue: value
		});
	}
	getData() {
		return localStorage['todolistStorekeeper'] || '';
	}
	exportData() {
		
	}
	importData(data) {
		localStorage["todolistStorekeeper"] = data;
		// refresh page
		location.href = location.href;
	}
	openExportingModal() {
		this.setState({
			exportingModalOpen: true
		});
	}
	closeExportingModal() {
		this.setState({
			exportingModalOpen: false
		});
	}
	openImportingModal() {
		this.setState({
			importingModalOpen: true
		});
	}
	closeImportingModal() {
		this.setState({
			importingModalOpen: false
		});
	}
	render() {
		const {isShowMenu, isOpenSetting, movingBtnX, movingBtnY, isMovingBtn, exportingModalOpen, showMailView, mailValue, showMailButton, importingModalOpen} = this.state;
		return (
			<div>
				<Draggable 
					onDrag={this.handleAddBtnDrag} 
					disabled={!isShowMenu} >
					<div className='MultiFunctionBtnContainer'>
						<div style={tool.getShowOrHideDomStyle(isShowMenu)}>
							<p style={{
								marginTop: '8px'
							}}>
								{ <Button className='ovalButton' size='massive' icon='sign in' circular color='violet' onClick={this.handleClickImportBtn} /> }
							</p>
							<p style={{
								marginTop: '8px'
							}}>
								{<Button className='ovalButton' size='massive' icon='sign out' circular color='orange' onClick={this.handleClickExportBtn} />}
							</p>

							{/* 导出数据Modal */}
							<Modal
						  		open={exportingModalOpen}
						  		onClose={this.closeExportingModal}
						  		size='small'>
						  		  <Header content='导出数据' />
						  		  <Modal.Content>
	      	      	      		        <Form>
	      	      	      		        	<Form.Field>
	      	      	      		        	  <div style={tool.getShowOrHideDomStyle(!showMailView)} >
	      	      	      		        	  	<Input id='exportDataInput' defaultValue={this.getData()} />
	      	      	      		        	  </div>
	      	      	      		        	  <div style={tool.getShowOrHideDomStyle(showMailView)} >
	      	      	      		        	  	<Input id='mailInput' placeholder="请输入邮箱地址" defaultValue={mailValue} onChange={this.mailInputChange} action={
	      	      	      		        	  		<Label color='green' content='导出' onClick={this.handleClickMailExportBtn} />
	      	      	      		        	  	}/>
	      	      	      		        	  </div>
	      	      	      		        	</Form.Field>
	      	      	      		        </Form>
						  		  </Modal.Content>
						  		  
					  		      {
					  		      	!showMailView ? (
					  		      		<Modal.Actions>
					  		      			<Button color='blue' icon='download' onClick={this.handleClickDownloadBtn} />
					  		      			<Button color='orange' icon='copy' onClick={this.handleClickCopyBtn} />
					  		      			{showMailButton ? <Button color='green' icon='mail' onClick={this.handleClickMailBtn} /> : null}
					  		      		</Modal.Actions>
					  		      	) : null
					  		      }
							</Modal>

							{/* 导入数据Modal */}
							<Modal
						  		open={importingModalOpen}
						  		onClose={this.closeImportingModal}
						  		size='small'>
						  		<Header content='导入数据（注意：将覆盖原数据）' />
						  		<Modal.Content>
						  			<Form>
						  				<Form.Field>
						  					<Input id='importInput' placeholder="要导入的数据" onChange={this.importInputChange} action={
						  						<Label color='green' content='导入' onClick={this.handleClickSubImportDataBtn} />
						  					}/>
						  				</Form.Field>
						  			</Form>
						  		</Modal.Content>
							</Modal>

							<p style={{
								marginTop: '8px'
							}}>
							</p>
						</div>
						<Tappable 
							onTap={this.handleTapAddButton} 
							onTouchMove={() => {
								this.setState({
									isMovingBtn: true
								});
							}}
							onTouchStart={(e) => {
								this.setState({
									isMovingBtn: false
								});

								e.preventDefault();

							}}
							onMouseDown={() => {
								this.setState({
									isMovingBtn: false
								});
							}}
							onMouseMove={() => {
								this.setState({
									isMovingBtn: true
								});
							}}
							onPress={() => {
								this.setState(prevState => ({
									isShowMenu: !prevState.isShowMenu
								}));
							}}>
							<Button id='floatFunctionBtn' className='ovalButton MultiFunctionBtn' size='massive' icon='plus' circular color='twitter' />
						</Tappable>
					</div>
				</Draggable>
			</div>
		);
	}
}


export default MultiFunctionBtn;