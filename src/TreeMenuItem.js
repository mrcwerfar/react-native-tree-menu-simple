import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, View, Text} from 'react-native';

/**
 * TreeMenuItem: react-native-tree-menu-simple
 */
class TreeMenuItem extends Component {
	constructor(props, context) {
		super(props, context);
		if (this.props.indents) {
			this.indents = this.props.indents;
		} else {
			this.indents = 0;
		}

		this.dropDownIconNames = [];
		this.dropDownIconNames.push(this.props.openMenuItemIcon);
		this.dropDownIconNames.push(this.props.closeMenuItemIcon);

		if (this.props.openSubMenu !== undefined) {
			if (!this.props.openSubMenu) {
				this.state = {
					dropDownIconNameIndex: 0,
					openSubMenu: false,
				};
			} else {
				this.state = {
					dropDownIconNameIndex: 1,
					openSubMenu: true,
				};
			}
		} else {
			this.state = {
				dropDownIconNameIndex: 0,
				openSubMenu: false,
			};
		}
	}

	renderItemContent(menuItemObject) {
		if (this.props.useCustomItemContentRenderer && this.props.useCustomItemContentRenderer===true) {
			if (this.props.renderCustomMenuItem) {
				let customView = this.props.renderCustomMenuItem(menuItemObject);
				return customView;
			} else {
				return (<View><Text>Missing renderCustomMenuItem() method ...</Text></View>);
			}
		} else {
			return (
				<View>
					<Text
						style={this.props.menuItemSettings.itemTextStyle}
						allowFontScaling={true}>
						{menuItemObject.name}
					</Text>
				</View>
			);
		}
	}

	renderIcon(unicodeChar, fontSize, color, itemShowIcon, iconSize) {
		console.log(fontSize);
		console.log(iconSize);
		if (itemShowIcon)
			return (
				<View style={{width: iconSize+iconSize*0.3, marginLeft: 0, marginRight: 0}}>
					<Text style={{color:color, fontSize: fontSize, alignSelf:'center'}}>{unicodeChar}</Text>
				</View>
			);
		else
			return (<View/>);
	}

	renderDropDown(menuItemObject, iconIndex, itemTextFontSize, itemOpenCloseIconColor, itemShowIcon, iconSize) {
		return (
			<View style={{width: iconSize + iconSize*0.3}}>
				<TouchableHighlight
					onPress={() => { this.props.onOpenSubMenu(menuItemObject); }}
					activeOpacity={0.5}
					underlayColor="#00000000">
					{this.renderIcon(this.dropDownIconNames[iconIndex], itemTextFontSize, itemOpenCloseIconColor, itemShowIcon, iconSize)}
				</TouchableHighlight>
			</View>
		);
	}

	renderItem(menuItemObject) {
		let defaultIcon = this.props.menuItemSettings.defaultIcon?this.props.menuItemSettings.defaultIcon:'\u2022';
		let iconIndex = menuItemObject.openSubMenu === true ? 1 : 0;
		let indentValue = this.props.menuItemSettings.itemIndentValue||this.props.menuItemSettings.itemIndentValue===0?this.props.menuItemSettings.itemIndentValue:35;

		let initLeftMargin = this.props.menuItemSettings.itemStyle.marginLeft?this.props.menuItemSettings.itemStyle.marginLeft:0;
		let itemOpenCloseIconColor = this.props.menuItemSettings.itemOpenCloseIconColor?this.props.menuItemSettings.itemOpenCloseIconColor:'#000';
		let itemIconColor = this.props.menuItemSettings.itemIconColor ? this.props.menuItemSettings.itemIconColor : '#AAA';
		let itemTextFontSize = 22;
		if (this.props.menuItemSettings.itemTextStyle)
			itemTextFontSize = this.props.menuItemSettings.itemTextStyle.fontSize ? this.props.menuItemSettings.itemTextStyle.fontSize : 22;
		let iconSize = this.props.menuItemSettings.itemIconSize ? this.props.menuItemSettings.itemIconSize : itemTextFontSize;

		let dropDownIconSize = iconSize;
		let menuItemIconSize = iconSize * 1; //% av fonstr.
		let itemShowIcon = this.props.menuItemSettings.itemShowIcon || this.props.menuItemSettings.itemShowIcon === false ? this.props.menuItemSettings.itemShowIcon:true;

		return (
			<View style={{flex:1}}>
				<TouchableHighlight
					style={
						[this.props.menuItemSettings.itemStyle,
							{flex: 1, marginLeft: initLeftMargin + indentValue * Number(this.indents)}
						]}
					value={menuItemObject.id}
					underlayColor="#00000000"
					onPress={() => {
						if (menuItemObject.onClick !== undefined && menuItemObject.subItems && menuItemObject.subItems.length>0 ) {
							menuItemObject.onClick(menuItemObject);
							this.props.onOpenSubMenu(menuItemObject);
						} else {
							menuItemObject.onClick(menuItemObject);
						}
					}}>

					<View
						style={{
							padding: 0,
							flexDirection: 'row',
							flex: 1,
							alignItems: 'center'
						}}>

						{/* Show DROPDOWN BUTTON or not on LEFT side? */}
						{this.props.showDropDownButton && this.dropDownIconNames && this.dropDownIconNames.length === 2 && this.props.menuItemSettings.itemOpenCloseIcon === 'left' && (
							this.renderDropDown(menuItemObject, iconIndex, itemTextFontSize, itemOpenCloseIconColor, true, iconSize)
						)}

						{/* Show menu item Icon or not? */}
						{menuItemObject.icon && (
							this.renderIcon(menuItemObject.icon, menuItemIconSize, itemIconColor, itemShowIcon, iconSize)
						)}

						{/* Show DEFAULT menu item Icon or not? */}
						{!menuItemObject.icon && (
							this.renderIcon(defaultIcon, menuItemIconSize, itemIconColor, itemShowIcon, iconSize)
						)}

						{/* Show CUSTOM menu item CONTENT or not? */}
						<View style={{flex: 1}}>
							{
								this.renderItemContent(menuItemObject)
							}
						</View>

						{/* Show DROPDOWN BUTTON or not on RIGHT side? */}
						{this.props.showDropDownButton && this.dropDownIconNames && this.dropDownIconNames.length === 2 && this.props.menuItemSettings.itemOpenCloseIcon === 'right' && (
							this.renderDropDown(menuItemObject, iconIndex, dropDownIconSize, itemOpenCloseIconColor, true, iconSize)
						)}

					</View>
				</TouchableHighlight>
			</View>
		);
	}

	render() {
		let menuItemObject = this.props.menuItemObject;
		if (menuItemObject) {
			return this.renderItem(menuItemObject);
		} else {
			return <View/>;
		}
	}
}

TreeMenuItem.defaultProps = {
	showDropDownButton: true,
	useCustomItemContentRenderer: false,
	openMenuItemIcon: '\u2500',
	closeMenuItemIcon:'\u25BC',
	showSumMenu: true,
	openSubMenu: true,
	indents: 0
};

TreeMenuItem.propTypes = {
	showDropDownButton: PropTypes.bool,
	openMenuItemIcon:PropTypes.string,
	closeMenuItemIcon:PropTypes.string,
	showSumMenu: PropTypes.bool,
	openSubMenu: PropTypes.bool,
	indents: PropTypes.number,
	menuItemObject: PropTypes.object.isRequired,
	menuItemSettings: PropTypes.object.isRequired,
	onOpenSubMenu: PropTypes.func,
	useCustomItemContentRenderer: PropTypes.bool,
	renderCustomMenuItem: PropTypes.func
};

export default TreeMenuItem;
