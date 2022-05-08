import { ArrowLeft } from 'phosphor-react-native';
import React, {useState} from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity 
} from 'react-native';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Copyright } from '../copyright';
import { ScreenshotButton } from '../screenshotButton';
import { Button } from '../button';
import { FeedbackType } from '../widget';
import { styles } from './styles';
import { captureScreen } from 'react-native-view-shot'
import { api } from '../../libs/api';
import * as FileSystem from 'expo-file-system';


interface props{
    feedbackType: FeedbackType;
    feedbackTypeReset: ()=>void;
    feedbackSent: ()=> void
}

export function Form({feedbackType, feedbackTypeReset, feedbackSent}:props) {
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<string| null>(null);
    const [feedbackComment, setFeedbackComment] = useState('')
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then(uri => setScreenshot(uri))
        .catch(err=>console.log(err))
    }

    function handleScreenshotRemove(){
        setScreenshot(null);
    }

    async function handleSendFeedback(){
        if(isSendingFeedback){
            return;
        }

        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

        try{    
            await api.post('/feedbacks', {
                type: feedbackType,
                comment: feedbackComment,
                screenshot: `data:image/png;base64,${screenshotBase64}`
            });
            feedbackSent();
        }catch(err){
            console.log(err)
            setIsSendingFeedback(false);
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={feedbackTypeReset}
                >
                    <ArrowLeft
                        size={24}
                        weight='bold'
                        color={theme.colors.text_secondary}
                        
                    />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
                multiline
                style={styles.input}
                placeholder ="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
                onChangeText={setFeedbackComment}
            />
            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot = {screenshot}
                />
                <Button
                    isLoading = {isSendingFeedback}
                    onPress={handleSendFeedback}
                />
            </View>
            <Copyright/>
        </View>
    );
}
