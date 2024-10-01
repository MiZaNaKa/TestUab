import React from 'react';
import {View,Image } from 'react-native';

function NoData() {
  return ( 
    <View style={{marginTop:40,alignItems:'center'}}>
       <Image
            source={require('../image/noData.png')}
            style={{ width: 200, height: 200,}}
        />
    </View>
      
  );
}

export default NoData; 