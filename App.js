import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Video from './component/video';
import Detail from './component/detail';
import Pagination from './component/Pagination';
import FavMovie from './component/FavMovie';
import Bottom from './component/Bottom';

const Stack = createNativeStackNavigator();
function  Navigation() {
    return(
    <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}
        > 
        
            
            <Stack.Screen name="Video" component={Video} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Pagination" component={Pagination} />
            <Stack.Screen name="FavMovie" component={FavMovie} />
            <Stack.Screen name="Bottom" component={Bottom} />
            
            
            
        </Stack.Navigator>
    </NavigationContainer>
    );
}

export default Navigation;