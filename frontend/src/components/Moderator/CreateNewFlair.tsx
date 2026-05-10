import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Button, Checkbox, Input, TextField } from 'react-aria-components'
import { iconButtonClass, inputClass, primaryButtonClass, switchClass, switchSliderClass } from '../../styles/theme'

type CreateNewFlairProps = {
    setShowNewFlair : Dispatch<SetStateAction<boolean>>;
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    backgroundColor: boolean;
    setBackgroundColor: Dispatch<SetStateAction<boolean>>;
    flair:string;
    setFlair: Dispatch<SetStateAction<string>>;
}

const CreateNewFlair = ({setShowNewFlair, setModalOpen, backgroundColor, flair, setFlair}:CreateNewFlairProps)=>{
    const [modOnly, setModOnly] = useState<boolean>(false)
    const [usersCanEdit, setUsersCanEdit] = useState<boolean>(false)
    return(
        <aside className="flex w-full shrink-0 flex-col gap-5 text-[1.6rem] xl:w-[300px]">
            <header className="flex items-center justify-between">
                <div className="font-bold">
                    <p>Create flair</p>
                </div>
                <div className="flex gap-5">
                    <Button className={`${primaryButtonClass} px-3 py-1`}>Create</Button>
                    <Button className="border-0 bg-transparent p-0" aria-label="Close flair creator" onPress={()=>setShowNewFlair(false)}>
                        <i className={`${iconButtonClass} bi bi-x-lg h-8 w-8`}></i>
                    </Button>
                </div>
            </header>

            <div className="flex flex-col gap-2.5">
                <span className="font-bold">Preview</span>
                <div className="flex flex-col rounded-[10px] border border-slate-200 bg-white px-5 py-2.5 text-[1.4rem]">
                    <p className="text-[1.2rem] font-bold">r/community_name </p>
                    <span className="font-bold">Post title</span>
                    <span style={backgroundColor? {backgroundColor: 'black', color: 'white', padding: '0.2rem 0.4rem', borderRadius: '4px'} : {}}>
                        {flair}
                    </span>
                    <span>This is the post body preview for your flair.</span>
                </div>
            </div>

            <div className="flex flex-col gap-2.5">
                <span className="font-bold">setup</span>

                <div>
                    <TextField aria-label="Flair text" value={flair} onChange={setFlair}>
                        <Input className={`${inputClass} h-10`} type="text" placeholder="general" />
                    </TextField>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span>Color</span>
                <Button className="flex items-center gap-2.5 rounded-full border-0 bg-transparent px-3 py-2 transition-colors hover:bg-orange-50 hover:text-orange-700" onPress={()=>setModalOpen(true)}>
                    <span className="font-bold">none, Dark on Light</span>
                    <span className="font-bold">&gt;</span>
                </Button>
            </div>

            <div className="flex flex-col gap-2.5">
                <span className="font-bold">options</span>
                <div className="flex items-center justify-between">
                    <span>For mods only</span>
                    <div>
                        <Checkbox className={switchClass} isSelected={modOnly} onChange={setModOnly} aria-label="For mods only">
                            <span className={switchSliderClass}></span>
                        </Checkbox>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span>Allow users to edit</span>
                    <div>
                        <Checkbox className={switchClass} isDisabled={!modOnly} isSelected={usersCanEdit} onChange={setUsersCanEdit} aria-label="Allow users to edit flair">
                            <span className={switchSliderClass}></span>
                        </Checkbox>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default CreateNewFlair
