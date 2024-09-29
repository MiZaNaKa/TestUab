import React,{useEffect} from 'react';
import { Button, View, NativeModules } from 'react-native';

function Menu({ navigation }) {
  return ( 
    <View style={{flex:1,marginTop:100,padding:30}}>
       <View style={{marginBottom:20}}>
            <Button
                title="Video"
                onPress={() => navigation.navigate('Video')}
                style={{
                marginLeft:10,
                marginBottom:49
                }}
            />
        </View>

        <View style={{marginBottom:20}}>
            <Button
                title="FavMovie"
                onPress={() => navigation.navigate('FavMovie')}
                style={{
                marginLeft:10,
                }}
            />

        </View>
    </View>
      
  );
}

export default Menu; 