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
import { createNewFlair } from "../../services/flairs";
import { AriaSelect } from "../ui/Select";
import { inputClass, primaryButtonClass, secondaryButtonClass, selectTriggerClass, switchClass, switchSliderClass } from "../../styles/theme";

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
    const rangeTrackClass = "relative h-1.5 w-3/5 rounded-full bg-slate-200";
    const rangeThumbClass = "top-1/2 h-[18px] w-[18px] rounded-full border border-orange-500 bg-white";

    return (
        <Dialog className="fixed top-1/2 left-1/2 z-[1000] m-0 flex w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2.5 rounded-[18px] border-0 bg-white p-5 text-[1.6rem] shadow-[0_20px_60px_rgba(15,23,42,0.25)]" aria-label="Flair background settings">
            <div className="flex flex-col gap-2.5">
                <span className="font-bold">Preview</span>
                <div className="flex flex-col gap-2.5 rounded-[15px] border border-slate-200 bg-slate-50 px-2.5 py-1">
                    <p className="font-bold">r/community_name</p>
                    <span className="font-bold">Post title</span>
                    <span style={{ backgroundColor: hexCode, color: textColor , padding: '0px 8px', borderRadius: '20px' , width: 'fit-content'}}>{flair}</span>
                    <span>This is the post body preview for your flair.</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span>Background Color</span>
                <Checkbox className={switchClass} isSelected={backgroundColor} onChange={setBackgroundColor} aria-label="Enable background color">
                    <span className={switchSliderClass}></span>
                </Checkbox>
            </div>

            {backgroundColor && (
            <div className="flex flex-col gap-2.5">
                <div className="h-10 w-4/5 justify-self-center" style={{ backgroundColor: hexCode }}></div>

                {/* Hue Slider */}
                <Slider className="flex items-center justify-between" minValue={0} maxValue={360} value={hue} onChange={handleHue}>
                    <Label>HUE</Label>
                    <SliderTrack className={rangeTrackClass}>
                        <SliderThumb className={rangeThumbClass} />
                    </SliderTrack>
                </Slider>

                {/* Saturation Slider */}
                <Slider className="flex items-center justify-between" minValue={0} maxValue={100} value={saturation} onChange={handleSat}>
                    <Label>SATURATION</Label>
                    <SliderTrack className={rangeTrackClass}>
                        <SliderThumb className={rangeThumbClass} />
                    </SliderTrack>
                </Slider>

                {/* Hex Input */}
                <TextField className="flex items-center justify-between" value={hexCode} onChange={setHexCode}>
                    <Label>Hex code (optional)</Label>
                    <Input className={`${inputClass} max-w-[160px] rounded`} />
                </TextField>

                <div className="flex flex-col gap-2.5">
                    <span className="font-bold">Text</span>
                    <AriaSelect
                        className={`${selectTriggerClass} [&_button]:w-1/2 [&_button]:text-center`}
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

            <div className="flex justify-end gap-5">
                <Button className={`${secondaryButtonClass} px-3 py-1`} onPress={onClose}>close</Button>
                <Button className={`${primaryButtonClass} px-3 py-1`} onPress={onSave}>save</Button>
            </div>
        </Dialog>
    )
}

export default FlairBackgroundModal
