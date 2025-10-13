import React, { use, useEffect, useState } from "react";
import Moviescard from "../components/Moviescard";



function Home() {

    const [movies, setmovies] = useState([])
    const [page, setpage] = useState(1)
    const [search, setsearch] = useState("")


    useEffect(() => {
        let url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=ef63f1a2ff54943d4e93f03908305eb5`
        if (search) {
            url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=ef63f1a2ff54943d4e93f03908305eb5`
        }

        fetch(url)
            .then((response) => response.json())
            .then((data) => setmovies(data.results));
    }, [page,search])
    return (
        <div className="p-4 pt-1 bg-[#0e0e0e] min-h-screen text-white">
            <input type="text" placeholder="search movies....." className="p-2 fixed top-16 left-1/2 transform -translate-x-1/2 w-3/4 md:w-1/2 rounded bg-[#1a1a1a]/80 text-white border border-gray-700 backdrop-blur-md z-10" onChange={(e) => setsearch(e.target.value)} />
            <div className="movies-card grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-32 justify-items-center ">
                {movies.map(movies => {
                    return (<Moviescard key={movies.id} movies={movies} />)
                })}

            </div>
            <div className="pagination-container flex justify-between mt-10">
                <button disabled={page == 1}  className="px-6 py-2 rounded bg-[#1a1a1a] text-white border border-[#2c2c2c] hover:bg-[#ff0057]/10 hover:text-[#ff0057] transition-all duration-300"  onClick={() => { setpage(PRIVIOUS => PRIVIOUS - 1); }}>PRIVIOUS</button>
                <button className="px-6 py-2 rounded bg-[#1a1a1a] text-white border border-[#2c2c2c] hover:bg-[#ff0057]/10 hover:text-[#ff0057] transition-all duration-300" onClick={() => { setpage(NEXT => NEXT + 1); }}>NEXT</button>
            </div>

        </div>

    )
}
export default Home