import React from 'react'

const Genrefilter = ({genreList,setselectgenre}) => {
  return (
    
        <select name="" id="" className='p-2 bg-gray-900 bg-opacity-60 backdrop-blur-md text-white border rounded' onChange={(e)=>setselectgenre(e.target.value)}>
         <option value="">All Genres</option>
           {genreList.map(genre => {
            return(
              <option key={genre} value={genre.id}>
                {genre.name}
              </option>
            )
            })}
        </select>
  
  )
}

export default Genrefilter