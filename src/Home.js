import React from 'react'
import Feed from './Feed';

export default function Home({posts, fetchError, isLoading}) {
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading Posts...</p>}
      {fetchError && <p className="statusMsg" style={{color: "red"}}>Error Fetching Posts</p>}
      {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> : <p className="statusMsg">No posts to display</p>)}
    </main>
  )
}
