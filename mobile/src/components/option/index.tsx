import React from 'react';
import {  
    TouchableOpacity,
    TouchableOpacityProps,
    Image,
    ImageProps,
    Text
} from 'react-native';
import { FeedbackType } from '../widget';

import { styles } from './styles';

interface optionsProps extends TouchableOpacityProps{
    title: string;
    image: ImageProps;
    
}

export function Option({ title, image,  ...rest}: optionsProps) {
  return (
    <TouchableOpacity 
    style={styles.container}
    {...rest}
    >
        <Image 
            source={image}
            style = {styles.image}
        />

        <Text style = {styles.title}>
            {title}
        
        </Text>
    </TouchableOpacity>
  );
}