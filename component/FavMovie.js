import React, { useState, useEffect,useCallback } from 'react';
import { View, TextInput, StyleSheet, ScrollView, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from "./List"
import Bottom from './Bottom';
import { useFocusEffect } from '@react-navigation/native';


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1, 
        padding:12
    },
    
    searchbar: {
        height: 40,
        borderWidth: 1,
        borderRadius: 11,
        padding: 7,
        borderColor: 'gray',
        marginBottom: 30
    },
    
});

export default function FavMovie({ navigation }) {

    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [all, setAll] = useState([]);
    const [text, setText] = useState('');


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

    useFocusEffect(
        useCallback(() => {
          setCurrentPage(1)    
          setText("")
        }, [])
    );

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            var value = await AsyncStorage.getItem('FavList')
            var asyValue = JSON.parse(value)

            if (asyValue) {
                setData(asyValue)
                setAll(asyValue)
            }
            // setAll(asyValue)
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
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <TextInput
                        style={styles.searchbar}
                        placeholder="Search Movie"
                        onChangeText={newText => onSearchMovie(newText)}
                        defaultValue={text}
                    />
                    
                    <List 
                        loading={false} 
                        all={all} 
                        currentData={currentData} 
                        prevPage={prevPage} 
                        currentPage={currentPage} 
                        nextPage={nextPage}
                        totalPages={totalPages}
                    />
                </View>
            </ScrollView>
            
            <Bottom/>
        </View>
    );
}

