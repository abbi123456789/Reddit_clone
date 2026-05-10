import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Button, Checkbox, Input, TextField } from 'react-aria-components'

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
    const switchClass = "group relative inline-block h-7 w-[50px] data-[disabled]:opacity-50";
    const sliderClass = "absolute inset-0 cursor-pointer rounded-[34px] bg-[#e9e9ea] transition before:absolute before:bottom-0.5 before:left-0.5 before:h-6 before:w-6 before:rounded-full before:bg-white before:shadow-sm before:transition group-data-[selected]:bg-[#34c759] group-data-[selected]:before:translate-x-[22px]";

    return(
        <aside className="flex w-full shrink-0 flex-col gap-5 text-[1.6rem] xl:w-[300px]">
            <header className="flex items-center justify-between">
                <div className="font-bold">
                    <p>Create flair</p>
                </div>
                <div className="flex gap-5">
                    <Button className="rounded-[20px] border-0 bg-[#0a449b] px-2.5 py-1 font-bold text-white">Create</Button>
                    <Button className="border-0 bg-transparent p-0" aria-label="Close flair creator" onPress={()=>setShowNewFlair(false)}>
                        <i className="bi bi-x-lg rounded-[20px] bg-slate-400 px-2 py-1"></i>
                    </Button>
                </div>
            </header>

            <div className="flex flex-col gap-2.5">
                <span className="font-bold">Preview</span>
                <div className="flex flex-col rounded-[10px] border border-slate-600 px-5 py-2.5 text-[1.4rem]">
                    <p className="text-[1.2rem] font-bold">r/community_name </p>
                    <span className="font-bold">Post title</span>
                    <span style={backgroundColor? {backgroundColor: 'black', color: 'white', padding: '0.2rem 0.4rem', borderRadius: '4px'} : {}}>
                        {flair}
                    </span>
                    <span>This is the post body. I am going to fuck you...</span>
                </div>
            </div>

            <div className="flex flex-col gap-2.5">
                <span className="font-bold">setup</span>

                <div>
                    <TextField aria-label="Flair text" value={flair} onChange={setFlair}>
                        <Input className="h-10 w-full rounded-[20px] border-0 px-5 focus:outline focus:outline-1 focus:outline-slate-600" type="text" placeholder="general" />
                    </TextField>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span>Color</span>
                <Button className="flex items-center gap-2.5 border-0 bg-transparent px-3 py-2 hover:rounded-[20px] hover:bg-slate-300" onPress={()=>setModalOpen(true)}>
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
                            <span className={sliderClass}></span>
                        </Checkbox>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span>Allow users to edit</span>
                    <div>
                        <Checkbox className={switchClass} isDisabled={!modOnly} isSelected={usersCanEdit} onChange={setUsersCanEdit} aria-label="Allow users to edit flair">
                            <span className={sliderClass}></span>
                        </Checkbox>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default CreateNewFlair
