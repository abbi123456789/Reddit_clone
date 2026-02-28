const PostCreationForm = ()=>{
    return(
        <section className="create-post-section">
            <div className="create-post-desc">
                <h1>Create Post</h1>
                <p>Drafts</p>
            </div>

            <div className="community-selection">
                <select name="choose-community">
                    <option value=''>Select a community</option>
                    <option value='AskDocs'>r/AskDocs</option>
                    <option value='aws'>r/aws</option>
                    <option value='webdev'>r/webdev</option>
                    <option value='devops'>r/devops</option>
                </select>
            </div>

            <div className="post-title">
                <input type="text" placeholder="Title" required />
            </div>

            <div className="add-flair-and-tag">
                <select name="flair-tag">
                    <option value=''>Select a flair</option>
                    <option value='flair1'>Flair1</option>
                    <option value='flair2'>Flair2</option>
                    <option value='flair3'>Flair3</option>
                </select>
            </div>

            <div className="post-body">
                <textarea placeholder="Body Text" />
            </div>

            <div className="action-buttons">
                <button>Save Draft</button>
                <button>Post</button>
            </div>
        </section>
    )
}

export default PostCreationForm