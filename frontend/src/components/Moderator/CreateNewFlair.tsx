import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import '../../styles/createnewflair.css'

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
        <aside className="create-new-flair">
            <header className="create-actions">
                <div className="label">
                    <p>Create flair</p>
                </div>
                <div className="actions">
                    <button className='create-flair-button'>Create</button>
                    <i className="bi bi-x-lg" onClick={()=>setShowNewFlair(false)}></i>
                </div>
            </header>

            <div className="flair-preview">
                <span className='bolder-text'>Preview</span>
                <div className="preview-card">
                    <p className='bolder-text community-title'>r/community_name </p>
                    <span className='bolder-text'>Post title</span>
                    <span style={backgroundColor? {backgroundColor: 'black', color: 'white', padding: '0.2rem 0.4rem', borderRadius: '4px'} : {}}>
                        {flair}
                    </span>
                    <span>This is the post body. I am going to fuck you...</span>
                </div>
            </div>

            <div className='flair-input'>
                <span className='bolder-text'>setup</span>

                <div className="flair-input-element">
                    <input type="text" value={flair} onChange={(e)=>setFlair(e.target.value)} placeholder="general" />
                </div>
            </div>

            <div className="set-bg-color">
                <span>Color</span>
                <div className='set-color' onClick={()=>setModalOpen(true)}>
                    <span className='bolder-text'>none, Dark on Light</span>
                    <span className='bolder-text'>&gt;</span>
                </div>
            </div>

            <div className="flair-options">
                <span className='bolder-text'>options</span>
                <div>
                    <span>For mods only</span>
                    <div>
                        <label className="switch">
                            <input type="checkbox" checked={modOnly} onChange={()=>setModOnly(!modOnly)}/>
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <div>
                    <span>Allow users to edit</span>
                    <div>
                        <label className="switch">
                            <input type="checkbox" disabled={!modOnly} checked={usersCanEdit} onChange={()=>setUsersCanEdit(!usersCanEdit)}/>
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default CreateNewFlair