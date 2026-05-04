import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Button, Checkbox } from 'react-aria-components'
import ShowFlair from './ShowFlair'

type CreateNewFlairProps = {
    setShowNewFlair : Dispatch<SetStateAction<boolean>>
}

const PostFlair = ({setShowNewFlair}:CreateNewFlairProps)=>{
    const [enablePostFlair, setEnablePostFlair] = useState(false)
    const [usersCanAssignAndEdit, setUsersCanAssignAndEdit] = useState(false)

    const toggleEnablePostFlair = ()=>{
        setEnablePostFlair(!enablePostFlair)
    }

    const toggleUserCanAssignAndEdit = ()=>{
        setUsersCanAssignAndEdit(!usersCanAssignAndEdit)
    }

    const switchClass = "group relative inline-block h-7 w-[50px] data-[disabled]:opacity-50";
    const sliderClass = "absolute inset-0 cursor-pointer rounded-[34px] bg-[#e9e9ea] transition before:absolute before:bottom-0.5 before:left-0.5 before:h-6 before:w-6 before:rounded-full before:bg-white before:shadow-sm before:transition group-data-[selected]:bg-[#34c759] group-data-[selected]:before:translate-x-[22px]";

    return(
        <main className="mr-[50px] flex h-screen flex-1 flex-col gap-[50px] overflow-auto text-[1.6rem] [scrollbar-width:none]">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <i className="bi bi-arrow-left rounded-[50px] bg-gray-300 px-2.5 py-1 text-[2rem]"></i>
                        <span className="text-[3rem] font-bold">Post Flair</span>
                    </div>
                    <div>
                        <Button className="rounded-[20px] border-0 bg-[#0a449b] px-3 py-2 font-bold text-white" onPress={()=>setShowNewFlair(true)}>New Flair</Button>
                    </div>
                </div>

                <div className="text-[1.4rem]">
                    <p>Allows users to add and remove flair from their posts. (Must 
                        be turned on for communities that require post flair.) </p>
                    <p>Want to learn more about post flair and what settings are best for your community? 
                        Visit the Mod Help Center</p>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div>
                        <span>Enable post flair</span>
                        <p className="text-[1.2rem] text-slate-600">Allow flair in your community.</p>
                    </div>
                    <div>
                        <Checkbox className={switchClass} isSelected={enablePostFlair} onChange={toggleEnablePostFlair} aria-label="Enable post flair">
                            <span className={sliderClass}></span>
                        </Checkbox>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span>let users assign and edit</span>
                        <p className="text-[1.2rem] text-slate-600">Required for communities that require post flair.</p>
                    </div>
                    <div>
                        <Checkbox className={switchClass} isSelected={usersCanAssignAndEdit} onChange={toggleUserCanAssignAndEdit} aria-label="Let users assign and edit post flair">
                            <span className={sliderClass}></span>
                        </Checkbox>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span>Flair display</span>
                        <p className="text-[1.2rem] text-slate-600">Change order for flair assigning list.</p>
                    </div>
                    <span>&gt;</span>
                </div>
            </div>
            <ShowFlair />
        </main>
    )
}

export default PostFlair;
