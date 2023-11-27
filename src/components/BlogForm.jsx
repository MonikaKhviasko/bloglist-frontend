const BlogForm = ({
    addNewBlog,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    newTitle,
    newAuthor,
    newUrl }
) => {

    return (
        <form onSubmit={addNewBlog}>
            <h3>add a new blog</h3>
            <div>
                title: <input value={newTitle} onChange={handleTitleChange} />
            </div>
            <div>
                author: <input value={newAuthor} onChange={handleAuthorChange} />
            </div>
            <div>
                url: <input value={newUrl} onChange={handleUrlChange} />
            </div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>

    )
}

export default BlogForm