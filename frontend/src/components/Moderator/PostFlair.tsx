import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Button, Checkbox } from 'react-aria-components'
import ShowFlair from './ShowFlair'
import { iconButtonClass, primaryButtonClass, switchClass, switchSliderClass } from '../../styles/theme'

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

    return(
        <main className="flex min-w-0 flex-1 flex-col gap-8 text-[1.6rem] md:gap-[50px] xl:mr-[50px]">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-2">
                        <i className={`${iconButtonClass} bi bi-arrow-left text-[2rem]`}></i>
                        <span className="text-[2.6rem] font-bold md:text-[3rem]">Post Flair</span>
                    </div>
                    <div>
                        <Button className={primaryButtonClass} onPress={()=>setShowNewFlair(true)}>New Flair</Button>
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
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <span>Enable post flair</span>
                        <p className="text-[1.2rem] text-slate-600">Allow flair in your community.</p>
                    </div>
                    <div className="shrink-0">
                        <Checkbox className={switchClass} isSelected={enablePostFlair} onChange={toggleEnablePostFlair} aria-label="Enable post flair">
                            <span className={switchSliderClass}></span>
                        </Checkbox>
                    </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <span>let users assign and edit</span>
                        <p className="text-[1.2rem] text-slate-600">Required for communities that require post flair.</p>
                    </div>
                    <div className="shrink-0">
                        <Checkbox className={switchClass} isSelected={usersCanAssignAndEdit} onChange={toggleUserCanAssignAndEdit} aria-label="Let users assign and edit post flair">
                            <span className={switchSliderClass}></span>
                        </Checkbox>
                    </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
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
