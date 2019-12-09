import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
/**
 * TreeMenuCustomItemContent
 */
class TreeMenuCustomItemContent extends Component {
	constructor(props, context) {
		super(props, context);
	}

	renderDemoItem(menuItemObject, color, img, drawImage) {
		let style = {alignItems: 'center', justifyContent: 'center'};
		return (
			<View style={[style, {backgroundColor: color}]}>
				<Text
					style={{fontSize: 25, fontWeight: 'bold', marginTop: 10}}
					allowFontScaling={true}>
					{menuItemObject.name}
				</Text>
				{drawImage && (
					<Image
						style={{
							marginLeft: 0,
							marginRight: 0,
							marginTop: 20,
							marginBottom: 20,
							borderRadius: 0,
							padding: 0,
							height: 70,
							width: 70
						}}
						resizeMode='cover'
						source={img}/>)}
			</View>
		);
	}

	render() {
		let menuItemObject = this.props.menuItemObject;

		if (menuItemObject) {
			switch (menuItemObject.id) {
			case 'id_new_session':
				return this.renderDemoItem(menuItemObject, '#09A509', require('../images/bike.png'), true);
			case 'id_activity':
				return this.renderDemoItem(menuItemObject, '#DA07FE', require('../images/bike.png'), true);
			case 'id_programs':
				return this.renderDemoItem(menuItemObject, '#09FEFE', require('../images/bike.png'), true);
			case 'id_exercises':
				return this.renderDemoItem(menuItemObject, '#dee204', require('../images/bike.png'), true);
			default:
				return this.renderDemoItem(menuItemObject, '#E0E0E0', require('../images/bike.png'), true);
			}
		} else
			return (<View><Text>Custom item content</Text></View>);
	}
}

TreeMenuCustomItemContent.defaultProps = {

};

TreeMenuCustomItemContent.propTypes = {
	menuItemObject: PropTypes.object
};

export default TreeMenuCustomItemContent;
