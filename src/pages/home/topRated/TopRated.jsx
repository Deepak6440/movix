import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import "../trending/Trending.scss"
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {
    const[endpoint, setEndpoint] = useState("movie");

    const {data, loading} = useFetch(`/${endpoint}/top_rated`);
    const onTabChnage = (tab)=>{
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Top Rated</span>
            <SwitchTabs data={["Movies", "TV Shows"]} onTabChnage={onTabChnage} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endpoint = {endpoint}/>
    </div>
  )
}

export default TopRated