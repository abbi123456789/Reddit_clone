import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Button, Checkbox, Input, TextField } from 'react-aria-components'
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
                    <Button className='create-flair-button'>Create</Button>
                    <Button className="close-flair-button" aria-label="Close flair creator" onPress={()=>setShowNewFlair(false)}>
                        <i className="bi bi-x-lg"></i>
                    </Button>
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
                    <TextField aria-label="Flair text" value={flair} onChange={setFlair}>
                        <Input type="text" placeholder="general" />
                    </TextField>
                </div>
            </div>

            <div className="set-bg-color">
                <span>Color</span>
                <Button className='set-color' onPress={()=>setModalOpen(true)}>
                    <span className='bolder-text'>none, Dark on Light</span>
                    <span className='bolder-text'>&gt;</span>
                </Button>
            </div>

            <div className="flair-options">
                <span className='bolder-text'>options</span>
                <div>
                    <span>For mods only</span>
                    <div>
                        <Checkbox className="switch" isSelected={modOnly} onChange={setModOnly} aria-label="For mods only">
                            <span className="slider"></span>
                        </Checkbox>
                    </div>
                </div>

                <div>
                    <span>Allow users to edit</span>
                    <div>
                        <Checkbox className="switch" isDisabled={!modOnly} isSelected={usersCanEdit} onChange={setUsersCanEdit} aria-label="Allow users to edit flair">
                            <span className="slider"></span>
                        </Checkbox>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default CreateNewFlair
