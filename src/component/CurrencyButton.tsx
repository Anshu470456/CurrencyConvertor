import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import type {PropsWithChildren} from 'react';


type CurrencyButtonProps=PropsWithChildren<{
    name:string;
    flag:string
}>



const CurrencyButton = (props:CurrencyButtonProps):JSX.Element => {
  return (
    <View style={style.buttonContainer}>
      <Text style={style.flag}>{props.flag}</Text>
      <Text style={style.country}>{props.name}</Text>
    </View>
  )
}

const style=StyleSheet.create({
    buttonContainer:{
    alignItems:'center',
    },
    
    flag:{
        fontSize:28,
        color:'#FFFFFF',
        marginBottom:4
    },
    country:{
        fontSize:14,
        color:'#2d3436',
        fontWeight:'500'
    }
})
export default CurrencyButton