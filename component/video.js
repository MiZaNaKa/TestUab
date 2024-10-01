import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { TextInput, StyleSheet, ScrollView,View} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import List from "./List"
import Bottom from './Bottom';
import counterStore from './Store';

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

export default function VoiceCallPage() {
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

   

    useFocusEffect(
        useCallback(() => {
          setCurrentPage(1)    
          setText("")
        }, [])
    );

    useEffect(() => {
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
                        loading={loading} 
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

