import React from 'react'
import "../../components/genres/Genres.scss"
import { useSelector } from 'react-redux'

const Genres = ({data}) => {
    const {genres} = useSelector((state) => state.homeReducer);
  return (
    <div className='genres'>
        {data?.map((category) =>{
            if(!genres[category]?.name) return;
            return(
                <div key={category} className="genre">
                    {genres[category]?.name}
                </div>
            )
        })}
    </div>
  )
}

export default Genres