import { feedbackTypes, FeedbackType } from "..";

interface FeedbackTypeStepProps {
    onFeedbackTypeChange : (type: FeedbackType) => void
}

export function FeedbackTypeStep({onFeedbackTypeChange}: FeedbackTypeStepProps){
    
    return (
        <>
            <header>
                <span className="text-xl leading-6">Deixe seu feedback</span>
                
            </header>
            <div className="flex py-8 gap-2 w-full ">
                {Object.entries(feedbackTypes).map(([key, value])=>{
                    return (
                        <button
                            key={key}
                            className="bg-zinc-800 py-5 w-24 rounded-lg flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                            title={value.title}
                            onClick={()=>{
                                onFeedbackTypeChange(key as FeedbackType);
                            }}
                            type = "button"
                        >
                            <img src={value.image.source} alt={value.image.alt} />
                            <span>{value.title}</span>
                        </button>
                    )
                })}
            </div>
        </>
        
    )
}