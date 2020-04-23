import React from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from 'react-query'

const getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  await new Promise(r => setTimeout(r, 1000)) // wait a second
  return response.json()
};

function Home() {
  const { status, data, isFetching, error } = useQuery('posts', getPosts)

  if (status === 'loading') {
    return <div>loading...</div> // loading state
  }

  if (status === 'error') {
    return <div>{error.message}</div> // error state
  }

  return (
    <div>
      { data && <ul>{
        data
          .slice(0,10) // only take frist 10 for now
          .map(d => <li key={`post-${d.id}`}>
            <NavLink to={`/post/${d.id}`}>{d.title}</NavLink>
          </li>) // render list of titles
      }</ul> }
      { isFetching && <p>updating...</p> }
    </div>
  );
}

export default Home
