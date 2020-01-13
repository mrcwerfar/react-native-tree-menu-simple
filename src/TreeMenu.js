import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import TreeMenuItem from './TreeMenuItem';

/**
 * TreeMenu: react-native-tree-menu-simple
 */
class TreeMenu extends Component {
	constructor(props, context) {
		super(props, context);

		// Prepping;
		this.prepMenuObjects(this.props.menuData.menu);
		this.state = {
			reRender: false,
		};
	}

	// Set parent of all menuObjects:
	prepMenuObjects(menuObjects) {
		for (let i = 0; i < menuObjects.length; i++) {
			this.setSubItemParent(menuObjects[i], undefined);
		}
	}

	setSubItemParent(menuObject, parent) {
		menuObject['parent'] = parent;
		if (menuObject.subItems) {
			for (let i = 0; i < menuObject.subItems.length; i++) {
				this.setSubItemParent(menuObject.subItems[i], menuObject);
			}
		}
	}

	renderSeparator() {
		return (
			<View
				style={{
					borderBottomColor: this.props.menuItemSettings.itemSeparatorColor?this.props.menuItemSettings.itemSeparatorColor: '#909090',
					borderBottomWidth: 1,
					marginTop: this.props.menuItemSettings.itemSeparatorMarginTop?this.props.menuItemSettings.itemSeparatorMarginTop: 1,
					marginBottom: this.props.menuItemSettings.itemSeparatorMarginBottom?this.props.menuItemSettings.itemSeparatorMarginBottom:1,
					marginLeft: this.props.menuItemSettings.itemSeparatorMarginLeft?this.props.menuItemSettings.itemSeparatorMarginLeft:0,
					marginRight: this.props.menuItemSettings.itemSeparatorMarginRight?this.props.menuItemSettings.itemSeparatorMarginRight:0,
				}}
			/>
		);
	}

	// Update currentMenuSettings with item-spesific value recursively:
	updateWithCustomSettings(customObject, currentObject) {
		Object.keys(customObject).forEach((key, idx) => {
			let customProp = customObject[key];
			if (typeof customProp === 'object' && customProp !== null) {
				let currentObjSettings = currentObject[key];
				this.updateWithCustomSettings(customProp, currentObjSettings);
			} else {
				currentObject[key] = customProp;
			}
		});
	}

	renderMenu(level, key, menuObjects) {
		let returnValue = [];
		if (menuObjects !== undefined && menuObjects.length > 0) {
			for (let i = 0; i < menuObjects.length; i++) {
				let menuItemObject = menuObjects[i];
				if (menuItemObject.openSubMenu === undefined) {
					menuItemObject.openSubMenu = false;
				}

				let subItems = menuItemObject.subItems;
				let showDropDownButton = false;
				if (subItems && subItems.length > 0) {
					showDropDownButton = true;
				}

				if (!menuItemObject.onClick) {
					menuItemObject.onClick = () => {
						if (!this.props.itemClickHandler)
							console.log('TreeMenu: Error: missing itemClickHandler property');
						else {
							console.log(menuItemObject.name);
							this.props.itemClickHandler(menuItemObject);
						}
					};
				}
				//NB! Create copy of this.props.menuItemSettings:
				let currentMenuItemSettings = JSON.parse(JSON.stringify(this.props.menuItemSettings));
				let customItemSettings = menuItemObject.menuItemSettings;
				if (customItemSettings) {
					// Update currentMenuSettings with item-spesific value:
					this.updateWithCustomSettings(customItemSettings, currentMenuItemSettings);
					/*
					Object.keys(customItemSettings).forEach((key, idx) => {
						let customVal = customItemSettings[key];
						currentMenuItemSettings[key] = customVal;
					});
					 */
				}

				returnValue.push(
					<View
						key={key++}
						style = {this.props.style}>

						<TreeMenuItem
							menuItemObject={menuItemObject}
							vectorIconsFamily={this.props.menuData.vectorIconsFamily?this.props.menuData.vectorIconsFamily:'Ionicons'}
							menuItemSettings={currentMenuItemSettings}
							indents={level}
							openSubMenu={menuItemObject.openSubMenu?menuItemObject.openSubMenu: false}
							showDropDownButton={showDropDownButton}
							openMenuItemIcon={this.props.menuData.openMenuItemIcon}
							closeMenuItemIcon={this.props.menuData.closeMenuItemIcon}
							useCustomItemContentRenderer={this.props.useCustomItemContentRenderer}
							onOpenSubMenu={(menuItemObject) => {

								menuItemObject.openSubMenu = !menuItemObject.openSubMenu;
								// Raise openClose-event:
								if (this.props.itemOpenCloseHandler)
									this.props.itemOpenCloseHandler(menuItemObject, menuItemObject.openSubMenu);

								if (menuItemObject.openSubMenu) {
									// Close others:
									if (this.props.menuItemSettings.closeOthersOnOpen) {
										let itemsToCompress=this.props.menuData.menu;
										// Get menuItemObjects parents subItems. If not exist, then use this.props.menuData.menu:
										let menuItemObjectParent = menuItemObject.parent;
										if (menuItemObjectParent)
											itemsToCompress = menuItemObjectParent.subItems?menuItemObjectParent.subItems:[];
										for (let i = 0; i < itemsToCompress.length; i++) {
											let moItem = itemsToCompress[i];
											if (moItem !== menuItemObject)
												moItem.openSubMenu = false;
											else
												moItem.openSubMenu = true;
										}
									}
								}
								this.setState({
									reRender: !this.state.reRender,
								});
							}}
							renderCustomMenuItem={(menuItemObject)=>this.props.renderCustomMenuItem(menuItemObject)}
						/>
						{
							this.props.menuItemSettings.itemSeparator && this.renderSeparator()
						}
					</View>,
				);
				if (menuItemObject.openSubMenu === true) {
					if (subItems && subItems.length > 0) {
						returnValue.push(this.renderMenu(level + 1, key, subItems));
					}
				}
			}
		}
		if (returnValue.length === 0) {
			returnValue.push(<View/>);
		}
		return returnValue;
	}

	render() {
		return <View>{this.renderMenu(0, 0, this.props.menuData.menu)}</View>;
	}
}

TreeMenu.defaultProps = {
	menuItemSettings: {
		closeOthersOnOpen: false,
		itemOpenCloseIcon: 'right',
		itemTextStyle: {
			fontSize: 18,
			color:'#000000',
			textAlign: 'left'
		},
		itemStyle: {
			backgroundColor: '#E0E0E0',
			marginBottom: 0,
			marginTop: 0,
			marginLeft: 4,
			marginRight: 4,
			borderRadius: 4,
		},
		itemShowIcon: true,
		itemIconSize: 25,
		itemIconColor: '#000',
		iconStyle: {
		},
		itemBackgroundColor: '#E0E0E0',
		//itemCloseMenuIcon: 'ios-arrow-dropdown-circle',       //, 'ios-arrow-dropdown-circle', 'ios-arrow-dropleft', 'ios-arrow-dropdown', 'ios-arrow-dropup';
		itemSeparator: true,
		itemBorderRadius: 5,
		itemMarginTop: 0,
		itemMarginBottom: 0,
		itemMarginLeft: 0,
		itemMarginRight: 0,
		itemSeparatorColor: '#909090',
		itemSeparatorMarginTop: 1,
		itemSeparatorMarginBottom: 1,
		itemSeparatorMarginLeft: 0,
		itemSeparatorMarginRight: 0,
		itemIndentValue: 20
	},
	menuData:
		{
			"openMenuItemIcon": "\u25C0",
			"closeMenuItemIcon": "\u25BC",
			menu:
			[
				{
					id: 'id_file',
					name: 'File (demo)',
					subItems: [
						{
							id: 'id_file_open',
							name: 'Open',
							subItems: []
						},
						{
							id: 'id_file_open_recent',
							name: 'Open Recent',
							subItems: [
								{
									id: 'id_file_open_recent1',
									name: 'file1 ...',
									subItems: []
								},
								{
									id: 'id_file_open_recent2',
									name: 'file2 ...',
									subItems: []
								},
							]
						}
					]
				},
				{
					id: 'id_edit',
					name: 'Edit (demo)',
					subItems: [
						{
							id: 'id_edit_copy',
							name: 'Copy',
							subItems: []
						},
					]
				},
				{
					id: 'id_refresh',
					name: 'Refresh (demo)',
					subItems: [
					]
				}
			]
		}
};

TreeMenu.propTypes = {
	menuData: PropTypes.object.isRequired,
	menuItemSettings: PropTypes.object.isRequired,
	itemClickHandler: PropTypes.func.isRequired,
	itemOpenCloseHandler: PropTypes.func,
	useCustomItemContentRenderer: PropTypes.bool,
	style: PropTypes.object,
	renderCustomMenuItem: PropTypes.func
};

export default TreeMenu;
