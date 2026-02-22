import { useState } from "react"
import { communityCategories } from "../services/communityCategories"


type AboutCommunityProps = {
  setCommunityAbout: React.Dispatch<React.SetStateAction<string>>
  handleNext: () => void
  handleCancel: () => void
}

type CommunityVisibilityProps = {
  nsfw: boolean
  setVisibility: React.Dispatch<React.SetStateAction<'public' | 'private' | 'restricted'>>
  setNsfw: React.Dispatch<React.SetStateAction<boolean>>
  handlePrevious: () => void
  handleNext: () => void
}

type CommunityDetailsProps = {
  name: string
  description: string
  setName: React.Dispatch<React.SetStateAction<string>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  handlePrevious: () => void
  handleSubmit: () => void
}


const AboutCommunity = ({setCommunityAbout, handleNext,  handleCancel,}: AboutCommunityProps) => {
  const handleSelect = (category: string) => {
    setCommunityAbout(category)
  }

  return (
    <div className="about-community-step">
      <div className="heading">
        <p>What will be your community about</p>
      </div>

      <div className="description">
        <p>Choose a topic to help redditors discover your community</p>
      </div>

      <div className="community-category">
        {communityCategories.map((category: string) => (
          <div className="category" key={category}>
            <p onClick={() => handleSelect(category)}>
              {category}
            </p>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  )
}

const CommunityVisibility = ({nsfw, setVisibility, setNsfw, handlePrevious, handleNext}: CommunityVisibilityProps)=>{
  return (
    <section>
      <div className="heading">
        <span>What kind of a community is this ?</span>
        <p>Decide who can you view and contribute in your community. Only public communities show up in search.
          <b>Important:</b> Once set you need to submit a request to change the community type.
        </p>
      </div>

      <div className="visibility-selection">
        <div className="public-visibility">
          <div>
            <i className="bi bi-globe"></i>
            <div>
              <span>Public</span>
              <p>Anyone can view, post and comment to this community.</p>
            </div>
          </div>
          <input type="radio" id="public" name="visibility" onClick={(setVisibility('public'))}></input>
        </div>
        <div className="restricted-visibility">
          <div>
            <i className="bi bi-eye"></i>
            <div>
              <span>Restricted</span>
              <p>Anyone can view, but only approved users can contribute.</p>
            </div>
          </div>
          <input type="radio" id="restricted" name="visibility" onClick={setVisibility('restricted')}></input>
        </div>
        <div className="private-visibility">
          <div>
            <i className="bi bi-lock"></i>
            <div>
              <span>Private</span>
              <p>Only approved users can view and contribute.</p>
            </div>
          </div>
          <input type="radio" id="private" name="visibility" onClick={setVisibility('private')}></input>
        </div>
      </div>

      <div className="nsfw-selection">
        <div className="nsfw-type">
          <div>
            <i className="bi bi-emoji-kiss"></i>
            <div>
              <span>Mature(18+)</span>
              <p>Users must be over 18 to view and contribute.</p>
            </div>
          </div>
          <input type="checkbox" value={nsfw} onChange={setNsfw(prev)=>!prev} />
        </div>
      </div>

      <div className="action-buttons">
        <button className="previous-button" onClick={handlePrevious}>
          Previous
        </button>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </section>
  )
}

const CommunityDetails = ({name, description, setName, setDescription, handlePrevious, handleSubmit}: CommunityDetailsProps)=>{
  return (
    <section>
      <div className="heading">
        <span>Tell us about your community</span>
        <p>A name and description helps people understand what your community is all about.</p>
      </div>

      <div className="community-details">
        <div className="name-description">
          <div>
            <input type="text" placeholder="Community name" value={name} onChange={(e)=>setName(e.target.value)} required/>
          </div>
          <div>
            <input type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} required />
          </div>
        </div>

        <div className="display-card">
          <div className="empty-space"></div>
          <div className="display-details">
            <div className="display-name">
              <i className="bi bi-reddit"></i>
              <p className="name">r/{name ? name.length > 0 : 'communityname'}</p>
            </div>
            <div className="display-description">
              <p className="description">{description ? description.length > 0 : 'Your community description'}</p>
            </div>
          </div>
        </div>

        <div className="action-buttons">
        <button className="previous-button" onClick={handlePrevious}>
          Previous
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Next
        </button>
        </div>
      </div>
    </section>
  )
}

const CommunityModalForm = () => {
  const [currentTab, setCurrentTab] = useState<"about" | "visibility" | "details">("about")
  const [showModal, setShowModal] = useState<boolean>(false)

  const [communityAbout, setCommunityAbout] = useState<string>('')
  const [visibility, setVisibility] = useState<"public" | "private" | "restricted">("public")
  const [nsfw, setNsfw] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const handleNext = () => {
    if (currentTab === "about") {
      setCurrentTab("visibility")
    } else if (currentTab === "visibility") {
      setCurrentTab("details")
    }
  }

  const handlePrevious = () => {
    if (currentTab === "about") {
      setShowModal(false)
    } else if (currentTab === "visibility") {
      setCurrentTab("about")
    } else if (currentTab === "details") {
      setCurrentTab("visibility")
    }
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  const handleSubmit = () => {
    console.log('submitted')
    setShowModal(false)
  }

  return (
    <>
      {currentTab === "about" && (
        <AboutCommunity
          setCommunityAbout={setCommunityAbout}
          handleNext={handleNext}
          handleCancel={handleCancel}
        />
      )}

      {currentTab === "visibility" && (
        <CommunityVisibility
          nsfw = {nsfw}
          setVisibility={setVisibility}
          setNsfw={setNsfw}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
        />
      )}

      {currentTab === "details" && (
        <CommunityDetails 
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          handlePrevious={handlePrevious}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  )
}

export default CommunityModalForm
