import { ArrowLeft, Camera } from "phosphor-react"
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from ".."
import { API } from "../../lib/api";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackTypeSelected: FeedbackType;
    onFeedbackRestartrequest: ()=>void;
    onFeedbackSent: ()=>void
}

export function FeedbackContentStep({ feedbackTypeSelected, onFeedbackRestartrequest, onFeedbackSent }: FeedbackContentStepProps){
    const [screenshot, setScreenshot] = useState<String | null>(null)
    const [feedback, setFeedback] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    const { title, image } = feedbackTypes[feedbackTypeSelected]

    async function handleSubmit(e: FormEvent){
        e.preventDefault();

        setIsSendingFeedback(true);
        try{
            await API.post('/feedbacks', {
                type: feedbackTypeSelected,
                comment: feedback,
                screenshot
            });
            onFeedbackSent();
        }catch(err){
            console.log(err)
        }
        setIsSendingFeedback(false);
        
    }


    return (
        <>
            <header>
                <button title="Voltar" type="button" className="top-5 left-5 absolute" onClick={onFeedbackRestartrequest}>
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>
                <span className="text-xl leading-6 flex flex-row items-center gap-2">
                <img src={image.source} alt={image.alt} className="w-6 h-6" />
                {title}
                </span>
                
            </header>
            <form onSubmit={handleSubmit} className="my-4 w-full">
                <textarea
                    title="Escreva seu feedback aqui"
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Descreva com detalhes o seu feedback..."
                    onChange={event => setFeedback(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton 
                        screenshot = {screenshot}
                        setImageButton = {setScreenshot}
                    />

                    <button
                        title="Enviar feedback"
                        type="submit"
                        className="p-2 bg-brand-500 rounded border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                        disabled={feedback.length == 0 || isSendingFeedback}
                    >
                        {isSendingFeedback ? <Loading/> : 'Enviar feedback'}
                    </button>
                </footer>
            </form>
        </>
    )
}