import { getFlairs } from "../../services/flairs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../styles/showflair.css'

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
        <div className="flair-display">
            <div className="flair-header">  
                <div>
                    <span>flair preview</span>
                    <span>settings</span>
                </div>
                <div></div>
            </div>
            {flairs.map((flair)=>{
            return(
            <div key={flair.id} className="flair-item">
                <div className="flair-info">
                    <div className="flair-preview" style={{backgroundColor: flair.background_color, color: flair.text_color, padding: '0px 8px', borderRadius: '20px'}}>
                        {flair.title}
                    </div>
                    <div className="flair-settings">
                        {flair.mod_only ? 'Mod only' : 'Everyone'}
                    </div>
                </div>
                <div className="flair-actions">
                    <i className="bi bi-trash"></i>
                    <i className="bi bi-pencil"></i>
                </div>
            </div>
            )})}
        </div>
    )
}

export default ShowFlair;