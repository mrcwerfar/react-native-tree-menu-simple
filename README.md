# react-native-tree-menu-simple
### A simple and flexible screen menu for react-native apps.

The menu structure is defined with json code. The menu is styled with a setting object. Se example below. Use unicode symbols as menu icons. Alternatively customize menu items using whatever icon or image you like. 

No dependencies required.

##TOC
* Installation
* Use
* Custom menu items
* Settings

![screen1](./images/screen1.png)

##Installation
npm install react-native-tree-menu-simple --save
##Use
Example use:
```javascript

import {TreeMenu} from 'react-native-tree-menu-simple';

class App extends Component {
    constructor(props, context) {
        super(props, context);
    }
    
    onMenuItemClick(menuItem) {
        switch (menuItem.id) {
        case 'id_new_session':
            console.log('CLICK:' + menuItem.name);
            break;
            
        case 'id_activity':
            console.log('CLICK:' + menuItem.name);
            break;
        
        case 'id_programs':
            console.log('CLICK:' + menuItem.name);
            break;
        }
    }
    
    render() {
        // Menu structure:
        const menuData = require('./exercisemenu.json');
        
        // Generic menu item settings:
        let menuItemSettings = {
            closeOthersOnOpen: true,
            defaultIcon: '\u25AA',
            itemOpenCloseIcon: 'right',
            itemTextStyle: {
                fontSize: 22,
                color: '#000000',
                textAlign: 'left',
                marginLeft: 0,
            },
            itemStyle: {
                backgroundColor: '#E0E0FF',
                marginBottom: 0,
                marginTop: 0,
                marginLeft: 4,
                marginRight: 4,
                borderRadius: 3,
            },
            itemShowIcon: true,
            itemIconSize: 46,
            itemIconColor: '#AAA',
            itemOpenCloseIconColor: '#000',
            iconStyle: {},
            itemSeparator: true,
            itemSeparatorColor: '#A0A0A0',
            itemSeparatorMarginTop: 1,
            itemSeparatorMarginBottom: 1,
            itemSeparatorMarginLeft: 4,
            itemSeparatorMarginRight: 4,
            itemIndentValue: 20,
        };
        
        return (
        <TreeMenu
            menuData={menuData}
            menuItemSettings={menuItemSettings}
            itemClickHandler={item => this.onMenuItemClick(item)}
        />
        );
    }
}
```
###The exercisemenu.json file looks like this:
```json5
{
  "openMenuItemIcon": "\u25C0",
  "closeMenuItemIcon": "\u25BC",
  "menu":
  [
    {
      "id": "id_new_session",
      "icon": "\u2795",
      "name": "New Session",
      "subItems": [
        {
          "id": "id_new_session_find_program",
          "icon": "\u25AA",
          "name": "Find program",
          "subItems": []
        },
        {
          "id": "id_new_session_select_program",
          "icon": "\u25AA",
          "name": "Select program",
          "subItems": [
            {
              "id": "id_new_session_select_program1",
              "icon": "\u25AA",
              "name": "Bicycling",
              "subItems": []
            },
            {
              "id": "id_new_session_select_program2",
              "icon": "\u25AA",
              "name": "Body workout",
              "subItems": []
            },
            {
              "id": "id_new_session_select_program3",
              "icon": "\u25AA",
              "name": "Hiking",
              "subItems": []
            }
          ]
        }
      ]
    },
    {
      "id": "id_activity",
      "icon": "\u26F9",
      "name": "My activity",
      "subItems": [
        {
          "id": "id_activity_find_program",
          "icon": "\u25AA",
          "name": "Find program to display",
          "subItems": []
        },
        {
          "id": "id_activity_select_program",
          "icon": "\u25AA",
          "name": "Select program",
          "subItems": [
            {
              "id": "id_activity_select_program1",
              "icon": "\u25AA",
              "name": "Bicycling",
              "subItems": []
            },
            {
              "id": "id_activity_select_program2",
              "icon": "\u25AA",
              "name": "Body Workout",
              "subItems": []
            },
            {
              "id": "id_activity_select_program3",
              "icon": "\u25AA",
              "name": "Hiking",
              "subItems": []
            }
          ]
        }
      ]
    },
    {
      "id": "id_programs",
      "icon": "\u2630",
      "name": "Programs",
      "subItems": [
        {
          "id": "id_programs_select_program1",
          "icon": "\u25AA",
          "name": "Bicycling",
          "subItems": []
        },
        {
          "id": "id_programs_select_program2",
          "icon": "\u25AA",
          "name": "Body workout",
          "subItems": []
        },
        {
          "id": "id_programs_select_program3",
          "icon": "\u25AA",
          "name": "Hiking",
          "subItems": []
        },
        {
          "id": "id_programs_add",
          "icon": "\u25AA",
          "name": "Add new program",
          "subItems": []
        }
      ]
    },
    {
      "id": "id_exercises",
      "icon": "\u26BD",
      "name": "Exercises",
      "subItems": [
        {
          "id": "id_exercises_add",
          "icon": "\u25AA",
          "name": "Add new exercise",
          "subItems": []
        }
      ]
    }
  ]
}

```
The result i shown above.

##Custom menu items
You can customize each item using and parameters.
![screen1](./images/screen2.png)
##Settings
###TreeView properties

Property | Values | Meaning | Example
-------- | ------ | ------- | -------
menuData | a menu data object  |  | {menuData}
menuItemSettings | a menu settings object |  | {menuItemSettings}
itemClickHandler | a function  |  | {item => this.onMenuItemClick(item)}
useCustomItemContentRenderer | true or false |  | 
renderCustomMenuItem | a function |  | renderCustomMenuItem={menuItemObject => this.renderCustomMenuItem(menuItemObject) }

###Menu data

###Menu settings
