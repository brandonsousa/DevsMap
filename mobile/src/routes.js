import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import DevsMap from './pages/DevsMap'
import DevProfile from './pages/DevProfile'

const Routes = createAppContainer(
    createStackNavigator({
        DevsMap:{
            screen: DevsMap,
            navigationOptions:{
                title: 'Develeopers Map'
            }
        },
        DevProfile:{
            screen: DevProfile,
            title: 'Github Profile'
        }
    },{
        defaultNavigationOptions:{
            headerTintColor: '#FFF',
            headerStyle:{
                backgroundColor: '#7d40e7'
            }
        }
    })
)

export default Routes