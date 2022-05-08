import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

import successImg from '../../assets/success.png'
import { Copyright } from '../copyright';

import { styles } from './styles';

interface props{
    feedbackTypeReset: ()=>void;
}

export function Success({feedbackTypeReset}: props) {
    return (
        <View style={styles.container}>
            <Image
                source={successImg}
                style ={styles.image}
            />

            <Text style={styles.title}>
                Agradecemos seu feedback
            </Text>

            <TouchableOpacity 
                style={styles.button}
                onPress={feedbackTypeReset}
            >
                <Text style={styles.buttonTitle}>
                    Quero enviar outro!
                </Text>
            </TouchableOpacity>

            <Copyright/>
        </View>
    );
}