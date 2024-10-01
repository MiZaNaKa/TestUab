import React, {  useEffect, useState,useCallback } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView,TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Save from "../image/like.png"
import Saved from "../image/heart.png"
import counterStore from './Store';
import { observer } from "mobx-react";
import { useFocusEffect } from '@react-navigation/native';
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space between columns
        marginBottom: 10, // Space between rows
    },
    image: {
        width: '48%', // Adjust width to fit two images in a row
        height: 150, // Set height for images
    },
    searchbar: {
        height: 40,
        borderWidth: 1,
        borderRadius: 11,
        padding: 7,
        borderColor: 'gray',
        marginBottom: 30
    },
    imageCenter:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100,
    },
    marginB25:{
        marginBottom:25
    },
    marginT20:{
        marginTop:20
    },
    marginL25:{
        marginLeft:25
    },
    marginT30:{
        marginTop:30
    },
    marginL14:{
        marginLeft:14
    },
    title:{
        fontSize:18,
        fontWeight:'800'
    },
    backIcon:{
        width:25,
        height:25
    }
});

const Detail = observer((props) => {

    const [data, setData] = useState();
    const [fav, setFav] = useState(false);
    const navigation = useNavigation();
    useFocusEffect(
        useCallback(() => {
            counterStore.clear()
        }, [])
    );
    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            var value =await AsyncStorage.getItem('FavList')
        var asyValue=JSON.parse(value)
        if(asyValue){
            var value =await AsyncStorage.getItem('FavList')
            var asyValue=JSON.parse(value)
            var search= asyValue.filter((x)=>x.id===props.route.params.id)
            if(search.length>0){
                counterStore.FavAction()
            }
        }
        
        }
        fetchData()
            .catch(console.error);
    }, [])

    useEffect(() => {        
        setData(props.route.params)        
    }, []);

   
    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <Image
                    source={require('../image/backArrow.png')}
                    style={styles.backIcon}
                    
                />
            </TouchableOpacity>
            
            {data ?
                <View>
                    <View style={styles.marginB25}>
                        <View style={{position:'relative'}}>
                            <ImageBackground
                                source={{ uri: "https://media.themoviedb.org/t/p/w220_and_h330_face/"+data.backdrop_path }}
                                style={styles.imageCenter}
                                resizeMode='contain'
                            >
                            </ImageBackground>

                            <TouchableOpacity style={{position:'absolute',width:25,height:25,top:0,right:0}} onPress={()=>counterStore.SaveFav(props.route.params)}>
                                <Image
                                    source={counterStore.fav ? Saved : Save}
                                    style={styles.backIcon}
                                    
                                />
                            </TouchableOpacity>
                        </View>
                        

                    </View>
                    <Text style={styles.title}>{data.title} <Text style={{fontSize:11,marginLeft:20}}>   {data.release_date}</Text></Text>
                    <View style={[styles.marginT30,styles.marginL14]}>
                        <Text>{data.overview}</Text>
                    </View>

                </View>
                :
                null
            }
        </ScrollView>

    );
})

export default Detail; 