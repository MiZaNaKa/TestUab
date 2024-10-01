import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import Pagination from "./Pagination"
import NoData from './noData';

import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
   
   
    textCenter:{
        textAlign:'center'
    },
    font20:{
        fontSize:20
    },
    marginB30:{
        marginBottom:30
    },
    flexRow:{
        flexDirection: 'row', 
        flexWrap: 'wrap',
    },
    imageCenter:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 100,
    },
    columnBox:{
        width: '33.3%', 
        marginBottom: 15 
    },
    marginT:{
        marginTop:40
    },
    title:{
        fontSize: 12, 
        fontWeight: '700'
    },
    date:{
        fontSize:10
    }
});

export default function List(props) {
    const navigation = useNavigation();
    return (
        <View>
            
            {props.loading ?
                <View>
                    <ActivityIndicator animating={true} size="large" color="#f57f17" />
                </View>
                :
                <View>
                    
                    {props.all.length > 0 ?
                        <View>
                            <View style={styles.flexRow}>
                                {props.currentData.map((value, index) => {
                                    return (
                                        <View key={index} style={styles.columnBox}>
                                            <TouchableOpacity onPress={() => { navigation.navigate('Detail', value)}}>
                                                <View key={index} style={{ alignItems: 'center', }}>
                                                    <ImageBackground
                                                        source={{ uri: "https://media.themoviedb.org/t/p/w220_and_h330_face/" + value.backdrop_path }}
                                                        style={styles.imageCenter}
                                                        resizeMode='contain'
                                                    >
                                                    </ImageBackground>
                                                    <Text style={styles.title}>{value.title}</Text>
                                                    <Text style={styles.date}>{value.release_date}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>

                            <Pagination 
                                prevPage={props.prevPage} 
                                currentPage={props.currentPage} 
                                nextPage={props.nextPage}
                                totalPages={props.totalPages}
                            />
                        </View>
                        :
                        <NoData/>
                    }
                </View>
            }
        </View>
    );
}

