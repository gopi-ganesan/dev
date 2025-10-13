import React, { useContext } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Home from '../pages/Home';
import { Watchlistcontext, WatchlistProvider } from '../context/Watchlistcontext';


const Moviescard = ({ movies }) => {
    const { togglewatchlist, Watchlist } = useContext(Watchlistcontext)

    const inwatchlist = Watchlist.some(m => m.id == movies.id)
    return (
        <div className="relative w-64 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-[#0A0F2C] to-[#1B1B2F] border border-red-700">
            <img
                src={`https://media.themoviedb.org/t/p/w500/${movies.poster_path}`}
                alt={movies.title}
                className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 to-black/70 mix-blend-multiply"></div>

            <button
                className="absolute top-2 right-2 text-yellow-400 text-xl hover:text-yellow-300 transition"
                onClick={() => togglewatchlist(movies)}
            >
                {inwatchlist ? <FaHeart /> : <FaRegHeart />}
            </button>

            <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-bold text-white drop-shadow-md">{movies.title}</h3>
                <p className="text-sm text-gray-300">{movies.release_date}</p>
            </div>
        </div>


    )
}

export default Moviescard