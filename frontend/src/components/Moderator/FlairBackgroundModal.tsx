import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { hslToHex } from "../../utils/hslToHex";
import '../../styles/flairbackgroundmodal.css'

export type FlairBackgroundModalProps = {
    flair: string;
    backgroundColor: boolean;
    setBackgroundColor: Dispatch<SetStateAction<boolean>>;
    hexCode: string;
    setHexCode: Dispatch<SetStateAction<string>>;
    onClose: ()=>void;
}

const FlairBackgroundModal = ({flair, backgroundColor, setBackgroundColor, hexCode, setHexCode, onClose}:FlairBackgroundModalProps)=>{
    const [hue, setHue] = useState(0);
    const [saturation, setSaturation] = useState(0);

    const handleHue = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newHue = parseInt(e.target.value);
        setHue(newHue);
        // Sync the Hex code based on new Hue + existing Saturation/Lightness
        setHexCode(hslToHex(newHue, saturation, 50)); 
    };

    const handleSat = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newSat = parseInt(e.target.value);
        setSaturation(newSat);
        // Sync the Hex code based on existing Hue + new Saturation
        setHexCode(hslToHex(hue, newSat, 50));
    };

    return (
        <dialog className="flair-background-modal">
            <div className="flair-preview">
                <span className='bolder-text'>Preview</span>
                <div className="preview-card">
                    <p className='bolder-text community-title'>r/community_name</p>
                    <span className='bolder-text'>Post title</span>
                    <span>{flair}</span>
                    <span>This is the post body. I am going to fuck you...</span>
                </div>
            </div>

            <div className="enable-background-color">
                <span>Background Color</span>
                <label className="switch">
                    <input type="checkbox" checked={backgroundColor} onChange={()=>setBackgroundColor(!backgroundColor)}/>
                    <span className="slider"></span>
                </label>
            </div>

            {backgroundColor && (
            <div className="color-picker-settings">
                <div className="preview-box" style={{ backgroundColor: hexCode }}></div>

                {/* Hue Slider */}
                <div className="setting-row">
                <label>HUE</label>
                <input type="range" min="0" max="360" value={hue} onChange={handleHue} />
                </div>

                {/* Saturation Slider */}
                <div className="setting-row">
                <label>SATURATION</label>
                <input type="range" min="0" max="100" value={saturation} onChange={handleSat} />
                </div>

                {/* Hex Input */}
                <div className="hex-input-container">
                <span>Hex code (optional)</span>
                <input value={hexCode} onChange={(e) => setHexCode(e.target.value)} />
                </div>
            </div>
            )}

            <div className="action-buttons">
                <button className="close-btn" onClick={onClose}>close</button>
                <button className="save-btn" onClick={onClose}>save</button>
            </div>
        </dialog>
    )
}

export default FlairBackgroundModal