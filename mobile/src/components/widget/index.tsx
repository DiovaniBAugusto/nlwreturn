import React, {useRef, useState} from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC} from 'react-native-gesture-handler'

import { styles } from './styles';
import { theme } from '../../theme';
import { Options } from '../options';
import { Form } from '../form';
import { Success } from '../success';
import { feedbackTypes } from '../../utils/feedbackTypes';


export type FeedbackType = keyof typeof feedbackTypes;
function Widget() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false);


    const bottomSheetRef = useRef<BottomSheet>(null);
    
    function handleOpen(){
        bottomSheetRef.current?.expand()
    }

    function handleFeedbackReset(){
        setFeedbackType(null);
        setFeedbackSent(false);
    }
    
    function handleFeedbackSent(){
        setFeedbackSent(true);
        setFeedbackType(null);
    }

    return (
        <>
            <TouchableOpacity 
                style = {styles.button}
                onPress={handleOpen}
            >
                <ChatTeardropDots
                    size={24}
                    weight="bold"
                    color={theme.colors.text_on_brand_color}
                />
            </TouchableOpacity>    
        
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[1,280]}
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}
            >
                {
                    feedbackSent 
                    ?
                        <Success
                            feedbackTypeReset = {handleFeedbackReset}
                        />
                    :
                        <>
                            {
                                feedbackType
                                ?
                                    <Form
                                        feedbackType={feedbackType}
                                        feedbackTypeReset = {handleFeedbackReset}
                                        feedbackSent = {handleFeedbackSent}
                                    />
                                :
                                    <Options
                                        setFeedback = {setFeedbackType}
                                    />
                            }
                        </>
                }
            </BottomSheet>
        </>

    );
}

export default gestureHandlerRootHOC(Widget);