import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
const Bottom = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.footer}>
        <View style={styles.row}>
            <View style={styles.column}>
                <TouchableOpacity  onPress={()=> navigation.navigate('Video')}>
                    <Text style={styles.txt}>Hot Movies List </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.column}>
                
                <TouchableOpacity  onPress={()=> navigation.navigate('FavMovie')}>
                    <Text style={styles.txt}>My Favourite List </Text>
                </TouchableOpacity>
            </View>
        </View>
        
      
    </View>
  );
};

const styles = StyleSheet.create({
  
  footer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor:'#000'
  },
  row:{
    flexDirection:'row',
  },
  column:{
    width:'50%',
    flexDirection:'column',
  },
  txt:{
    textAlign:'center',
    color:'white',
    fontSize:16
  }
});

export default Bottom;
