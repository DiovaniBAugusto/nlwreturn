import React from 'react';
import { View, Text, Alert} from 'react-native';
import {Copyright} from '../copyright';
import { Option } from '../option';
import { styles } from './styles';

import { feedbackTypes } from '../../utils/feedbackTypes';
import {FeedbackType} from '../widget'

interface props {
  setFeedback : (f : FeedbackType)=> void
}

export function Options( {setFeedback}: props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe seu feedback
      </Text>
        <View style={styles.options}>
          {
            Object.entries(feedbackTypes).map(([key,value])=>{
              return(
                <Option
                  key={key}
                  title={value.title}
                  image= {value.image}
                  onPress ={()=>setFeedback(key as FeedbackType)}

                />
              )
              
            })  
          }
        </View>
        <Copyright /> 
    </View>
  );
}