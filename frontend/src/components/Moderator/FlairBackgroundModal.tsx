import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import {
    Button,
    Checkbox,
    Dialog,
    Input,
    Label,
    Slider,
    SliderThumb,
    SliderTrack,
    TextField,
} from 'react-aria-components';
import { hslToHex } from "../../utils/hslToHex";
import '../../styles/flairbackgroundmodal.css'
import { createNewFlair } from "../../services/flairs";
import { AriaSelect } from "../ui/Select";

export type FlairBackgroundModalProps = {
    flair: string;
    backgroundColor: boolean;
    setBackgroundColor: Dispatch<SetStateAction<boolean>>;
    hexCode: string;
    setHexCode: Dispatch<SetStateAction<string>>;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    communityName: string;
    textColor: string;
    setTextColor: Dispatch<SetStateAction<string>>;
}

const FlairBackgroundModal = ({flair, backgroundColor, setBackgroundColor, hexCode, setHexCode, setModalOpen, communityName, textColor, setTextColor}:FlairBackgroundModalProps)=>{
    const [hue, setHue] = useState(0);
    const [saturation, setSaturation] = useState(0);

    const onClose = () => {
        setHexCode("#DADADA"); // Reset to default when closing
        setHue(0);
        setSaturation(0);
        setModalOpen(false);
    }

    const onSave = async () => {
        console.log("Saving flair with color:", { flair, hexCode, hue, saturation, textColor });
        // Here you would typically send the selected color to your backend or update the parent state
        const newFlair = await createNewFlair(communityName, flair, hexCode, hue, saturation, textColor);
        console.log(newFlair)
        setModalOpen(false);
    }

    const handleHue = (newHue: number) => {
        setHue(newHue);
        setHexCode(hslToHex(newHue, saturation, 50)); 
    };

    const handleSat = (newSat: number) => {
        setSaturation(newSat);
        setHexCode(hslToHex(hue, newSat, 50));
    };

    return (
        <Dialog className="flair-background-modal" aria-label="Flair background settings">
            <div className="flair-preview">
                <span className='bolder-text'>Preview</span>
                <div className="preview-card">
                    <p className='bolder-text community-title'>r/community_name</p>
                    <span className='bolder-text'>Post title</span>
                    <span style={{ backgroundColor: hexCode, color: textColor , padding: '0px 8px', borderRadius: '20px' , width: 'fit-content'}}>{flair}</span>
                    <span>This is the post body. I am going to fuck you...</span>
                </div>
            </div>

            <div className="enable-background-color">
                <span>Background Color</span>
                <Checkbox className="switch" isSelected={backgroundColor} onChange={setBackgroundColor} aria-label="Enable background color">
                    <span className="slider"></span>
                </Checkbox>
            </div>

            {backgroundColor && (
            <div className="color-picker-settings">
                <div className="preview-box" style={{ backgroundColor: hexCode }}></div>

                {/* Hue Slider */}
                <Slider className="setting-row" minValue={0} maxValue={360} value={hue} onChange={handleHue}>
                    <Label>HUE</Label>
                    <SliderTrack className="range-track">
                        <SliderThumb className="range-thumb" />
                    </SliderTrack>
                </Slider>

                {/* Saturation Slider */}
                <Slider className="setting-row" minValue={0} maxValue={100} value={saturation} onChange={handleSat}>
                    <Label>SATURATION</Label>
                    <SliderTrack className="range-track">
                        <SliderThumb className="range-thumb" />
                    </SliderTrack>
                </Slider>

                {/* Hex Input */}
                <TextField className="hex-input-container" value={hexCode} onChange={setHexCode}>
                    <Label>Hex code (optional)</Label>
                    <Input />
                </TextField>

                <div className="select-text-color">
                    <span className="bolder-text">Text</span>
                    <AriaSelect
                        ariaLabel="Select flair text color"
                        selectedKey={textColor}
                        onSelectionChange={setTextColor}
                        placeholder="Select text color"
                        options={[
                            { id: 'black', label: 'Dark on Light' },
                            { id: 'white', label: 'Light on Dark' },
                        ]}
                    />
                </div>
            </div>
            )}

            <div className="action-buttons">
                <Button className="close-btn" onPress={onClose}>close</Button>
                <Button className="save-btn" onPress={onSave}>save</Button>
            </div>
        </Dialog>
    )
}

export default FlairBackgroundModal
