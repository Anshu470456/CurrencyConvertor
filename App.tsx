
import React, { useState } from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  YellowBox,
} from 'react-native';
//constant
import { currencyByRupee } from './src/constant';
import CurrencyButton from './src/component/CurrencyButton';

import Snackbar from 'react-native-snackbar';


function App(): React.JSX.Element {

  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {

    if (!inputValue) {
      return Snackbar.show({
        text: "Enter a value to convert",
        backgroundColor: "lightblue",
        textColor: "#000000",
        duration: Snackbar.LENGTH_SHORT,
      })
    }

    const inputAmount = parseFloat(inputValue);
    
    if (!isNaN(inputAmount)) {

      const convertedValue = inputAmount * targetValue.value
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`
      setResultValue(result)
      setTargetCurrency(targetValue.name)
    } 
    else {

      return Snackbar.show({
        text: "Not a valid number to convert",
        backgroundColor: "#F4BE2C",
        textColor: "#000000",
        
      })
    }
  }

  return (
    <SafeAreaView  style={{height:'100%'}}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType='number-pad'
              placeholder='Enter the amount in Rupees'
              keyboardAppearance="dark"
              cursorColor='#fff8dc'
            />
          </View>
          {resultValue && (
            <Text style={[styles.rupeesContainer,{fontSize:20,fontWeight:'600'}]}>{resultValue}</Text>
          )}
        </View >

        <View style={styles.bottomContainer}>
           
           <FlatList 
           numColumns={2}
           data={currencyByRupee}
           keyExtractor={item=>item.name}
           renderItem={({item})=>(
            <Pressable
            style={[
              styles.button, 
              targetCurrency === item.name && styles.selected
            ]}
            onPress={() => buttonPressed(item)}
            >
              <CurrencyButton {...item} />
            </Pressable>
           )}
           />
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 25,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius:8,
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 12,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
