import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps{
    screenshot : String | null;
    setImageButton: (img:String | null)=>void;
}

export function ScreenshotButton( {screenshot, setImageButton}: ScreenshotButtonProps ){
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)


    async function handleTakeScreenshot(){
        setIsTakingScreenshot(true);
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png')
        setImageButton(base64image);
        setIsTakingScreenshot(false);
    }
    

    if(screenshot){
        return (
            <button
                title="Excluir screenshot"
                type="button"
                className="p-1 w-10 h-10 rounded border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={{
                    backgroundImage: `url(${screenshot})`
                }}
                onClick={()=>{
                    setImageButton(null);
                }}
            >
                <Trash weight="fill"/>
            </button>
        )
    }

    return (
        <button 
            title="Fazer uma screenshot da tela"
            type="button"
            className="p-2 bg-zinc-800 rounded border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
            onClick={handleTakeScreenshot}
        >
            {isTakingScreenshot ? (
                <Loading/>
            ) : (
                <Camera className="w-6 h-6 text-zinc-100"/>
            )}
            
        </button>
    )
}