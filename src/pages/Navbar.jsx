import React, { createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { Watchlistcontext, WatchlistProvider } from "../context/Watchlistcontext";

function Navbar() {
    const { Watchlist } = useContext(Watchlistcontext)
    return (
        <>


            <nav className="bg-[#0e0e0e] text-white flex justify-between items-center px-6 py-4 fixed w-full top-1 z-20 shadow-md">
                <Link to="/" className="text-xl font-bold hover:text-gray-200 transition-colors duration-200">Movies App</Link>
                <Link to="/Watchlist" className="text-xl hover:text-gray-200 transition-colors duration-200">Watchlist({Watchlist.length})  </Link>
            </nav>
            
            
        </>
    )
}
export default Navbar