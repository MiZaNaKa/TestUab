import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Action from "./redux/actions/movie"
import { movieStore } from "./redux/store/movie"
import { View, Text, TextInput, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Button, ActivityIndicator } from 'react-native'



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
    item: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#f9c2ff',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    pageText: {
        fontSize: 16,
    },
});




export default function VoiceCallPage({ navigation }) {

    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [all, setAll] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of items per page

    // Calculate the start and end index for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination Controls
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const functionTwo = (value) => {
        movieStore.dispatch(Action.getMovieDetail("kkt gg"))
    }

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const apiKey = '2f344d655d005607a0c59fb2294aea52';
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
            );
            if (response.status === 200) {
                setData(response.data.results)
                setAll(response.data.results)
                setLoading(false)
            }
            else {
                
                setLoading(false)
            }
        }
        fetchData()
            .catch(console.error);
    }, [])



    const onSearchMovie = (value) => {
        setCurrentPage(1)
        const itemsPerPage = 6; 
        
        const found = all.filter(item =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentData = found.slice(indexOfFirstItem, indexOfLastItem);

        // Pagination Controls
        const totalPages = Math.ceil(data.length / itemsPerPage);
        setData(found)
    }
    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.searchbar}
                placeholder="Search Movie"
                onChangeText={newText => onSearchMovie(newText)}
                defaultValue={text}
            />
            {loading ?
                <View>
                    <ActivityIndicator animating={true} size="large" color="#f57f17" />
                </View>
                :
                <View>
                    {all.length > 0 ?
                        <View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                                {currentData.map((value, index) => {
                                    return (
                                        <View key={index} style={{ width: '33.3%', marginBottom: 15 }}>
                                            <TouchableOpacity onPress={() => { navigation.navigate('Detail', value); functionTwo(value) }}>
                                                <View key={index} style={{ textAlign: 'center', alignItems: 'center', }}>
                                                    <ImageBackground
                                                        source={{ uri: "https://media.themoviedb.org/t/p/w220_and_h330_face/" + value.backdrop_path }}
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            width: '100%',
                                                            height: 100,
                                                        }}
                                                        resizeMode='contain'
                                                    >
                                                    </ImageBackground>
                                                    <Text style={{ fontSize: 12, fontWeight: '700' }}>{value.title}</Text>
                                                    <Text style={{ fontSize: 10 }}>{value.release_date}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>

                            <View style={[{ marginBottom: 30 }, styles.pagination]}>
                                <Button title="Previous" onPress={prevPage} disabled={currentPage === 1} />
                                <Text style={styles.pageText}>{`Page ${currentPage} of ${totalPages}`}</Text>
                                <Button title="Next" onPress={nextPage} disabled={currentPage === totalPages} />
                            </View>

                        </View>
                        :
                        <View style={{marginTop:40}}>
                            <Text style={{fontSize:20,textAlign:'center'}}>No Data</Text>
                        </View>
                    }
                </View>
            }
        </ScrollView>
    );
}

