import React, {  useEffect, useState } from 'react';
import Action from "./redux/actions/movie"
import { movieStore } from "./redux/store/movie"
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView,Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    }
});


function Detail(props) {
    const [data, setData] = useState();
    const [fav, setFav] = useState(false);

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
                setFav(true)
            }
        }
        
        }
        fetchData()
            .catch(console.error);
    }, [])

    useEffect(() => {
        
        setData(props.route.params)
        


        // const ddd = movieStore.subscribe(() => {
        //     console.log('State has changed:', movieStore.getState());
        // });
        // console.log("kkt")
        // const unsubscribe = movieStore.subscribe(() => {
        //     var value = movieStore.getState().value
        //     console.log("kkt" + value)

        //     setData(value)
        // });
        // return ddd;
    }, []);
    const SaveFav=async()=>{
        var value =await AsyncStorage.getItem('FavList')
        var asyValue=JSON.parse(value)
        if(!asyValue){
            var storeData=[props.route.params]
            AsyncStorage.setItem("FavList", JSON.stringify(storeData))
            setFav(true)
        }
        else{
            var value =await AsyncStorage.getItem('FavList')
            var asyValue=JSON.parse(value)
            var search= asyValue.filter((x)=>x.id===props.route.params.id)
            if(search.length===0){
                var value =await AsyncStorage.getItem('FavList')
                var asyValue=JSON.parse(value)
                console.log(asyValue)
                asyValue.push(props.route.params)
                AsyncStorage.setItem("FavList", JSON.stringify(asyValue))
                setFav(true)
            }
        }
    }
    return (
        <ScrollView style={styles.container}>
            {data ?
                <View>
                    <View style={{ marginBottom: 20 }}>
                        <ImageBackground
                            source={{ uri: "https://media.themoviedb.org/t/p/w220_and_h330_face/"+data.backdrop_path }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: 300,
                            }}
                            resizeMode='contain'
                        >
                            
                        </ImageBackground>

                    </View>
                    <Text style={{fontSize:18,fontWeight:'800'}}>{data.title}</Text>
                        <View style={{marginTop:30,marginLeft:12,fontSize:14}}>
                            <Text>{data.overview}</Text>
                        </View>

                        <View style={{marginTop:20,marginLeft:23,fontSize:14,marginBottom:30}}><Text>{data.release_date}</Text></View>

                        <View style={{marginBottom:25}}>
                            <Button title={fav ? "Saved" : "Save"} onPress={SaveFav}/>
                        </View>
                        
                </View>
                :
                null
            }
        </ScrollView>

    );
}

export default Detail; 