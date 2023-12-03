import { useState } from 'react'

const Blog = ({ blog, deleteBlog, updateBlog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleRemoveBlog = () => {
    deleteBlog(blog.id)
  }

  const handleUpdateBlog = () => {
    updateBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div id='likes'>
          {blog.likes}
          <button onClick={handleUpdateBlog}>like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={handleRemoveBlog}>delete</button>
      </div>
    </div>
  )
}

export default Blog