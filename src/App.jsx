import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    style: null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, style) => {
    setNotification({ message, style });
    setTimeout(() => {
      setNotification({ message: null, style: null });
    }, 5000);
  }

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(response)
      )
      blogService.setToken(response.token)
      setUser(response)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Wrong credentials', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken('')
    setUser(null)
  }

  const addNewBlog = async (event) => {
    event.preventDefault()
    if (newTitle !== null && newUrl !== null && newAuthor !== null) {
      const newBlog = {
        title: newTitle,
        url: newUrl,
        author: newAuthor
      }
      try {
        const response = await blogService.create(newBlog)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        showNotification(`${newTitle} blog added successfully!`, 'success');
        blogService.getAll().then(blogs =>
          setBlogs(blogs)
        )
      } catch (exception) {
        showNotification(`${exception.message}`, 'error')
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )


  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification.message} style={notification.style} />
      {user === null && loginForm()}
      {user !== null && 
      <div>
        <p>{user.name} logged in</p>
        {logoutForm()}
        <BlogForm addNewBlog={addNewBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl}
          handleTitleChange={(event) => handleInputChange(event, setNewTitle)}
          handleAuthorChange={(event) => handleInputChange(event, setNewAuthor)}
          handleUrlChange={(event) => handleInputChange(event, setNewUrl)} />
      </div>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App