import { useState } from "react"
import {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  TextArea,
  TextField,
} from 'react-aria-components'
import { communityCategories } from "../services/communityCategories"
import { createCommunity } from "../services/community"


type AboutCommunityProps = {
  setCommunityAbout: React.Dispatch<React.SetStateAction<string>>
  handleNext: () => void
  handleCancel: () => void
}

type CommunityVisibilityProps = {
  nsfw: boolean
  visibility: 'public' | 'private' | 'restricted'
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

type CommunityModalFormProps = {
  handleModalToggle: () => void
}

const modalStepClass = "absolute left-1/2 top-1/2 flex w-[768px] -translate-x-1/2 -translate-y-1/2 flex-col gap-[50px] rounded-[25px] border-0 bg-[#ecd2d2] p-5 text-[2rem]";
const headingClass = "[&_span]:text-[2.2rem] [&_span]:font-bold [&_p]:text-black/20";
const actionRowClass = "mr-10 flex justify-end gap-5";
const cancelButtonClass = "h-[30px] border-0 bg-red-600 px-2 text-white";
const nextButtonClass = "h-[30px] border-0 bg-orange-600 px-2 text-white";
const visibilityRowClass = "flex justify-between px-5 [&>div]:flex [&>div]:items-center [&>div]:gap-5";
const radioClass = "h-6 w-6 rounded-full border-2 border-slate-600 data-[selected]:border-[6px] data-[selected]:border-orange-600";
const checkboxClass = "h-6 w-6 rounded border-2 border-slate-600 data-[selected]:bg-orange-600";


const AboutCommunity = ({setCommunityAbout, handleNext,  handleCancel,}: AboutCommunityProps) => {
  const handleSelect = (category: string) => {
    setCommunityAbout(category)
  }

  return (
    <section className={modalStepClass}>
      <div className={headingClass}>
        <span>What will be your community about</span>
        <p>Choose a topic to help redditors discover your community</p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {communityCategories.map((category: string) => (
          <Button className="rounded-2xl border-0 bg-gray-300 p-2.5 text-[1.6rem] [font:inherit]" key={category} onPress={() => handleSelect(category)}>
            {category}
          </Button>
        ))}
      </div>

      <div className={actionRowClass}>
        <Button className={cancelButtonClass} onPress={handleCancel}>
          Cancel
        </Button>
        <Button className={nextButtonClass} onPress={handleNext}>
          Next
        </Button>
      </div>
    </section>
  )
}

const CommunityVisibility = ({nsfw, visibility, setVisibility, setNsfw, handlePrevious, handleNext}: CommunityVisibilityProps)=>{
  return (
    <section className={modalStepClass}>
      <div className={headingClass}>
        <span>What kind of a community is this ?</span>
        <p>Decide who can you view and contribute in your community. Only public communities show up in search.
          <b>Important:</b> Once set you need to submit a request to change the community type.
        </p>
      </div>

      <RadioGroup
        aria-label="Community visibility"
        className="flex flex-col gap-5 border-b border-gray-500"
        value={visibility}
        onChange={(value) => setVisibility(value as 'public' | 'private' | 'restricted')}
      >
        <div className={visibilityRowClass}>
          <div>
            <i className="bi bi-globe"></i>
            <div>
              <span>Public</span>
              <p>Anyone can view, post and comment to this community.</p>
            </div>
          </div>
          <Radio className={radioClass} value="public" aria-label="Public" />
        </div>
        <div className={visibilityRowClass}>
          <div>
            <i className="bi bi-eye"></i>
            <div>
              <span>Restricted</span>
              <p>Anyone can view, but only approved users can contribute.</p>
            </div>
          </div>
          <Radio className={radioClass} value="restricted" aria-label="Restricted" />
        </div>
        <div className={visibilityRowClass}>
          <div>
            <i className="bi bi-lock"></i>
            <div>
              <span>Private</span>
              <p>Only approved users can view and contribute.</p>
            </div>
          </div>
          <Radio className={radioClass} value="private" aria-label="Private" />
        </div>
      </RadioGroup>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between px-5 [&>div]:flex [&>div]:items-center [&>div]:gap-5">
          <div>
            <i className="bi bi-emoji-kiss"></i>
            <div>
              <span>Mature(18+)</span>
              <p>Users must be over 18 to view and contribute.</p>
            </div>
          </div>
          <Checkbox className={checkboxClass} aria-label="Mature community" isSelected={nsfw} onChange={setNsfw} />
        </div>
      </div>

      <div className={actionRowClass}>
        <Button className={cancelButtonClass} onPress={handlePrevious}>
          Previous
        </Button>
        <Button className={nextButtonClass} onPress={handleNext}>
          Next
        </Button>
      </div>
    </section>
  )
}

const CommunityDetails = ({name, description, setName, setDescription, handlePrevious, handleSubmit}: CommunityDetailsProps)=>{
  return (
    <section className={modalStepClass}>
      <div className={headingClass}>
        <span>Tell us about your community</span>
        <p>A name and description helps people understand what your community is all about.</p>
      </div>

      <div className="flex justify-between">
        <div className="flex w-3/5 flex-col gap-8">
            <TextField aria-label="Community name" value={name} onChange={setName} isRequired>
              <Input className="h-[50px] rounded-[20px] border-0 bg-[#ede8e8] px-5" type="text" placeholder="Community name" />
            </TextField>
            <TextField aria-label="Community description" value={description} onChange={setDescription} isRequired>
              <TextArea className="h-[100px] rounded-[30px] border-0 bg-[#ede8e8] pl-5" placeholder="Description" />
            </TextField>
        </div>

        <div className="flex flex-col">
          <div className="h-[50px] rounded-t-[20px] bg-gray-500"></div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-2.5 pt-5 text-[2.5rem]">
              <i className="bi bi-reddit"></i>
              <p>r/{name.length > 0 ? name : 'communityname'}</p>
            </div>
            <div>
              <p>{description.length > 0 ? description : 'Your community description'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={actionRowClass}>
        <Button className={cancelButtonClass} onPress={handlePrevious}>
          Previous
        </Button>
        <Button className={nextButtonClass} onPress={handleSubmit}>
          Submit
        </Button>
      </div>
    </section>
  )
}

const CommunityModalForm = ({handleModalToggle}:CommunityModalFormProps) => {
  const [currentTab, setCurrentTab] = useState<"about" | "visibility" | "details">("about")

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
    if (currentTab === "visibility") {
      setCurrentTab("about")
    } else if (currentTab === "details") {
      setCurrentTab("visibility")
    }
  }

  const handleCancel = () => {
    handleModalToggle()
  }

  const handleSubmit = async () => {
    const requestPayload = {category:communityAbout, visibility, nsfw, name, description}
    console.log(requestPayload)
    const data = await createCommunity(requestPayload)
    if(data){
      handleModalToggle()
    }
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
          visibility={visibility}
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
