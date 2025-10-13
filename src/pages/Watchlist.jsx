import React, { useContext, useState } from "react";
import Genrefilter from "../components/Genrefilter";
import { Watchlistcontext } from "../context/Watchlistcontext";
import Moviescard from "../components/Moviescard";

function Watchlist() {
    const {Watchlist,genreList}=useContext(Watchlistcontext)
    const[search,setsearch]= useState("")
    const [selectgenre,setselectgenre]= useState("")

    const filteredmovies = Watchlist.filter((movies)=>

    movies.title.toLowerCase().includes(search.toLowerCase()))
    .filter((movies)=>{
        return !selectgenre || movies.genre_ids.includes
        (Number(selectgenre))
    })
    return (
        <div className="bg-[#0e0e0e] min-h-screen text-white pt-32 px-4">
            <input type="text" placeholder="search movies....." className="p-2 fixed top-20 left-1/2 transform -translate-x-1/2 w-3/4 md:w-1/2 rounded bg-[#1a1a1a]/80 text-white border border-gray-700 backdrop-blur-md z-10  " onChange={(e)=>{setsearch(e.target.value)}} />
           

<div className="flex justify-center mb-10">

                <Genrefilter  genreList={genreList} setselectgenre = {setselectgenre}/>
            </div>
              <div className="movies-card grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16 justify-items-center">
                {filteredmovies.map(movies => {
                    return (<Moviescard key={movies.id} movies={movies} />)
                })}

            </div>
            </div>)
}
export default Watchlist