import { CloseButton } from "../CloseButton";
import { useState } from "react";

import bugImageUrl from '../../assets/Bug.svg'
import ideaImageUrl from '../../assets/Idea.svg'
import ThoughtImageUrl from '../../assets/Thought.svg'
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";

import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./steps/FeedbackSuccessStep";


export const feedbackTypes = {
    BUG:{
        title: "Problema",
        image:{
            source: bugImageUrl,
            alt: "Imagem de um inseto"
        }
    },
    IDEA:{
        title: "Ideia",
        image:{
            source: ideaImageUrl,
            alt: "imagem de uma lâmpada"
        }
    },
    OTHER:{
        title: "Outro",
        image:{
            source: ThoughtImageUrl,
            alt: "Imagem de um balão de pensamento"
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback(){
        setFeedbackType(null);
    }
    return(
        <div className=" bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            <CloseButton/>
            {feedbackSent ? (
                <FeedbackSuccessStep
                    onRestartRequest = {() => {
                        setFeedbackType(null);
                        setFeedbackSent(false);
                    }}
                />
            ): (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChange = {setFeedbackType}/>
                    ) :(
                        <FeedbackContentStep 
                            onFeedbackRestartrequest = {handleRestartFeedback} 
                            feedbackTypeSelected = {feedbackType}
                            onFeedbackSent = {()=>{setFeedbackSent(true)}}
                        />
                            
                    )}
                </>
            )}
            <footer className="text-xs text-neutral-400">
                Desenvolvido pela <a title="Ir ao site da rocketseat" className="underline underline-offset-2" href="https://rocketseat.com.br" >Rocketseat</a>
            </footer>
        </div>
    )
}