import React from 'react'
import Feed from './Feed';
import { useContext } from 'react';
import DataContext from './context/DataContext';

export default function Home() {

  const {searchResults, fetchError, isLoading} = useContext(DataContext);

  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading Posts...</p>}
      {fetchError && <p className="statusMsg" style={{color: "red"}}>Error Fetching Posts</p>}
      {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">No posts to display</p>)}
    </main>
  )
}
