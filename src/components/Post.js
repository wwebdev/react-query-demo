import React from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from 'react-query'

const Post = ({ id }) => {
  const getPost = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const jsonResponse = await response.json()
    jsonResponse.title = `${jsonResponse.title} - ${Math.random().toString(36)}`

    await new Promise(r => setTimeout(r, 1000)) // wait a second
    return jsonResponse
  }

  const { status, data, isFetching } = useQuery(`post-${id}`, getPost)

  if (status === 'loading') {
    return <div>loading...</div> // loading state
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      { isFetching && <p>updating...</p> }
      <br />
      <NavLink to="/">Home</NavLink>
    </div>
  )
}

export default Post
