import React, { useEffect, useState } from 'react'
import "../heroBanner/HeroBanner.scss"
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const {data,loading} = useFetch("/movie/upcoming");
    //fetch the background image using selector means image url
    const {url} = useSelector(state=>state.homeReducer);

    useEffect(() =>{
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        //? - Is is used for optional changing//
        setBackground(bg);
    },[data])

    const searchQueryHandler = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const handleKeyDown = (event) => {
        // console.log("Search query handler");
        // console.log(event.key);
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

  return (
    <div className='heroBanner'>
        {!loading && <div className="backdrop-img">
            <Img src={background}/>
        </div>}
        <div className="opacity-layer"></div>
        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title">
                    Welcome
                </span>
                <span className="subtitle">
                    Millions of movies, TV shows and people to discover, Explore now.
                </span>
                <div className="searchInput">
                    <input type="text" onKeyDown={handleKeyDown} onChange={(e) =>setQuery(e.target.value)} placeholder='Search for a mvoie or tv show...'/>
                    <button onClick={searchQueryHandler}>Search</button>
                </div>
            </div>
        </ContentWrapper>
       
    </div>
  )
}

export default HeroBanner