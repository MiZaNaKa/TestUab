import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const App = (props) => {
  return (
    <View style={[styles.marginB30, styles.pagination]}>
      <Button title="Previous" onPress={props.prevPage} disabled={props.currentPage === 1} />
      <Text style={styles.pageText}>{`Page ${props.currentPage} of ${props.totalPages}`}</Text>
      <Button title="Next" onPress={props.nextPage} disabled={props.currentPage === props.totalPages} />
    </View>
  );
};

const styles = StyleSheet.create({
 
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  pageText: {
    fontSize: 16,
  },
  marginB30:{
    marginBottom:30
},
});

export default App;
