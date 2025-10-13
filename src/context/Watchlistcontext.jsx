import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

 export const Watchlistcontext = createContext()


export const WatchlistProvider = ({children}) => {
    const [Watchlist,setwatchlist] = useState([])
    const [genreList,setgenrelist] = useState([])

    useEffect(() => {
            let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=ef63f1a2ff54943d4e93f03908305eb5`
            
            fetch(url)
                .then((response) => response.json())
                .then((data) => setgenrelist(data.genres || []));
        }, [])

    const togglewatchlist = (movies) =>{
        const index = Watchlist.findIndex((m)=> m.id === movies.id)
        if(index === -1)
        {
            setwatchlist([...Watchlist,movies])
        }
        else
        {
            setwatchlist([...Watchlist.slice(0,index),...
                Watchlist.slice(index+1)
            ])
        }
    }

  return (
    <Watchlistcontext.Provider value={{Watchlist,togglewatchlist,genreList}}>{children}</Watchlistcontext.Provider>
  )

}