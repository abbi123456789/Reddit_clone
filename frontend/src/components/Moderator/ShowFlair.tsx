import { getFlairs } from "../../services/flairs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export type Flair = {
    id: number;
    title: string;
    background_color: string;
    text_color: string;
    mod_only: boolean;
    hue: number | null;
    saturation: number | null;
}

const ShowFlair = ()=>{
    const {communityName} = useParams();
    const [flairs, setFlairs] = useState<Flair[]>([]);

    useEffect(()=>{
        const fetchFlairs = async ()=>{
            if(communityName){
                const fetchedFlairs = await getFlairs(communityName);
                setFlairs(fetchedFlairs);
            }
        }
        fetchFlairs();
    }, [communityName])
    return(
        <div className="flex min-w-0 flex-col gap-2.5">
            <div className="flex items-center justify-between">  
                <div className="flex items-center gap-5 text-[1.4rem] sm:text-[1.6rem]">
                    <span>flair preview</span>
                    <span>settings</span>
                </div>
                <div></div>
            </div>
            {flairs.map((flair)=>{
            return(
            <div key={flair.id} className="flex flex-col gap-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-[60px]">
                    <div className="max-w-full break-words rounded-[20px] px-2" style={{backgroundColor: flair.background_color, color: flair.text_color}}>
                        {flair.title}
                    </div>
                    <div>
                        {flair.mod_only ? 'Mod only' : 'Everyone'}
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <i className="bi bi-trash cursor-pointer bg-transparent text-red-600"></i>
                    <i className="bi bi-pencil cursor-pointer bg-transparent text-blue-600"></i>
                </div>
            </div>
            )})}
        </div>
    )
}

export default ShowFlair;
