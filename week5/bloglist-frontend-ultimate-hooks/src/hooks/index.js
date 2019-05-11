import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = (baseUrl) => {
  const [resource, setResource] = useState([])
  const [token, setToken] = useState('')

  const addToken = newToken => {
    setToken(`bearer ${newToken}`)
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResource(response.data)
    return response.data
  }

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }

  return {
    resource,
    getAll,
    baseUrl,
    addToken,
    create
  }
}
