import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';

export default function App() {
  const [age, setAge] = useState('');
  const [lowerLimit, setLowerLimit] = useState(null);
  const [upperLimit, setUpperLimit] = useState(null);
  const [error, setError] = useState(null);

  const calculateHeartRateLimits = () => {
    const ageNum = parseInt(age); // Convert age to a number

    if (isNaN(ageNum) || ageNum < 0) {
      setError('Please enter a valid age'); // Validate age input
      setLowerLimit(null); // Reset limits
      setUpperLimit(null);
      return;
    }

    setError(null); 


    const lower = (220 - ageNum) * 0.65;
    const upper = (220 - ageNum) * 0.85;

    setLowerLimit(lower.toFixed(0));
    setUpperLimit(upper.toFixed(0));
  };

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.header}>Heart Rate Limit Calculator</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge} // Update age state on input change
      />
      
      <Button title="Calculate" onPress={calculateHeartRateLimits} /> 

      {error && <Text style={styles.error}>{error}</Text>} 
      
      {lowerLimit !== null && upperLimit !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTextTitle}>Limits (bpm): </Text>
          <Text style={styles.resultText}>{lowerLimit}-{upperLimit}</Text>
        </View>
      )}
    </View>
  </SafeAreaView>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
      backgroundColor: '#f5f5f5',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      borderRadius: 5,
    },
    resultContainer: {
      marginTop: 20,
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#e7f3fe',
      borderColor: '#bcdffd',
      borderWidth: 1,
    },
    resultText: {
      fontSize: 18,
      textAlign: 'left',
    },
    resultTextTitle: {
      fontSize: 20,
      textAlign: 'left',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginTop: 10,
    },
  });
