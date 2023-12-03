import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (blogId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${blogId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error removing blog: ${error}`);
  }
}

const update = async (updatedBlog) => {
  try {
    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating blog: ${error}`);
  }
}

export default { getAll, create, setToken, remove, update }