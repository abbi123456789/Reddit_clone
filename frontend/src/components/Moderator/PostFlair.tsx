import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import '../../styles/postflair.css'
import '../../styles/slider.css'
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

    return(
        <main className="post-flair-content">
            <div className='post-flair-title'>
                <div className="heading">
                    <div>
                        <i className="bi bi-arrow-left"></i>
                        <span>Post Flair</span>
                    </div>
                    <div>
                        <button onClick={()=>setShowNewFlair(true)}>New Flair</button>
                    </div>
                </div>

                <div className="post-flair-info">
                    <p>Allows users to add and remove flair from their posts. (Must 
                        be turned on for communities that require post flair.) </p>
                    <p>Want to learn more about post flair and what settings are best for your community? 
                        Visit the Mod Help Center</p>
                </div>
            </div>

            <div className="selection-actions">
                <div className='action'>
                    <div>
                        <span>Enable post flair</span>
                        <p className='action-desc'>Allow flair in your community.</p>
                    </div>
                    <div>
                        <label className="switch">
                            <input type="checkbox" checked={enablePostFlair} onChange={toggleEnablePostFlair}/>
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className='action'>
                    <div>
                        <span>let users assign and edit</span>
                        <p className='action-desc'>Required for communities that require post flair.</p>
                    </div>
                    <div>
                        <label className="switch">
                            <input type="checkbox" checked={usersCanAssignAndEdit} onChange={toggleUserCanAssignAndEdit}/>
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div className='action'>
                    <div>
                        <span>Flair display</span>
                        <p className='action-desc'>Change order for flair assigning list.</p>
                    </div>
                    <span>&gt;</span>
                </div>
            </div>
            <ShowFlair />
        </main>
    )
}

export default PostFlair;