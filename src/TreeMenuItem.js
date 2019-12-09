import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight, View, Text} from 'react-native';
import TreeMenuCustomItemContent from './TreeMenuCustomItemContent';

/**
 * react-tree-screen-menu item
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
			return (<TreeMenuCustomItemContent menuItemObject={menuItemObject}></TreeMenuCustomItemContent>);
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
		if (itemShowIcon)
			return (
				<Text style={{width: iconSize, color:color, fontSize: fontSize, marginLeft: 2, marginRight: 2}}>{unicodeChar}</Text>
			);
		else
			return (<View/>);
	}

	renderItem(menuItemObject) {
		let defaultIcon = this.props.menuItemSettings.defaultIcon?this.props.menuItemSettings.defaultIcon:'\u25A3';
		let iconIndex = menuItemObject.openSubMenu === true ? 1 : 0;
		let indentValue = this.props.menuItemSettings.itemIndentValue||this.props.menuItemSettings.itemIndentValue===0?this.props.menuItemSettings.itemIndentValue:35;

		let initLeftMargin = this.props.menuItemSettings.itemStyle.marginLeft?this.props.menuItemSettings.itemStyle.marginLeft:0;
		let itemOpenCloseIconColor = this.props.menuItemSettings.itemOpenCloseIconColor?this.props.menuItemSettings.itemOpenCloseIconColor:'#000';
		let itemIconColor = this.props.menuItemSettings.itemIconColor ? this.props.menuItemSettings.itemIconColor : '#AAA';
		let itemTextFontSize = 22;
		if (this.props.menuItemSettings.itemTextStyle)
			itemTextFontSize = this.props.menuItemSettings.itemTextStyle.fontSize ? this.props.menuItemSettings.itemTextStyle.fontSize : 22;
		let iconSize = this.props.menuItemSettings.itemIconSize ? this.props.menuItemSettings.itemIconSize : itemTextFontSize;

		let dropDownIconSize = itemTextFontSize;
		let menuItemIconSize = itemTextFontSize * 0.6; //70% av fonstr.
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
							<TouchableHighlight
								style={{alignItems: 'center'}}
								onPress={() => { this.props.onOpenSubMenu(menuItemObject); }}
								activeOpacity={0.5}
								underlayColor="#00000000">
								{this.renderIcon(this.dropDownIconNames[iconIndex], itemTextFontSize, itemOpenCloseIconColor, true, iconSize)}
							</TouchableHighlight>
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
							<TouchableHighlight
								style={{alignItems: 'center'}}
								onPress={() => { this.props.onOpenSubMenu(menuItemObject); }}
								activeOpacity={0.5}
								underlayColor="#00000000">
								{this.renderIcon(this.dropDownIconNames[iconIndex], dropDownIconSize, itemOpenCloseIconColor, true, iconSize)}
								{/* this.selectIconFamily(this.dropDownIconNames[iconIndex], itemOpenCloseIconColor)*/}
							</TouchableHighlight>
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
};

export default TreeMenuItem;
