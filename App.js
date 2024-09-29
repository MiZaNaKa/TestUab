import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Video from './component/video';
import Detail from './component/detail';
import Nat from "./component/index"
import Paganitation from './component/paganitation';
import FavMovie from './component/FavMovie';

const Stack = createNativeStackNavigator();
function  Navigation() {
    return(
    <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}
        > 
        
            <Stack.Screen name="Nat" component={Nat} />
            <Stack.Screen name="Video" component={Video} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Paganitation" component={Paganitation} />
            <Stack.Screen name="FavMovie" component={FavMovie} />
            
            
            
        </Stack.Navigator>
    </NavigationContainer>
    );
}

export default Navigation;