import React, { useRef } from 'react'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';
import PosterFallback from "../../assets/no-poster.png";
import "../carousel/Carousel.scss"
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';

const Carousel = ({data, loading, endpoint, title}) => {
    const caraouselContainer = useRef();
    // console.log(caraouselContainer.current)
    const {url} = useSelector((state) => state.homeReducer);
    const navigate = useNavigate();

    const navigation = (direction) =>{
      const container = caraouselContainer.current;
      const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

      container.scrollTo({
        left : scrollAmount,
        behavior : "smooth",
      })
    }

    const skItem = () =>{
      return(
        <div className="skeletionItems">
          <div className="posterBlock"></div>
          <div className="textBlock">
            <div className="titleskeletion"></div>
            <div className="dateskeletion"></div>
          </div>
        </div>
      )
    }

  return (
    <div className='carousel'>
        <ContentWrapper>
          {title && <div className='carouselTitle'>{title}</div>}
            <BsFillArrowLeftCircleFill className='carouselLeftNav arrow' onClick={() => navigation("left")}> </BsFillArrowLeftCircleFill>
            <BsFillArrowRightCircleFill className='carouselRighttNav arrow' onClick={() => navigation("right")} />
            {!loading ? (
              <div className="carouselItems" ref={caraouselContainer}>
                {data?.map((item) => {
                  const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback
                  return(
                    <div key={item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                        <div className="posterBlock">
                          <Img src={posterUrl} />
                          <CircleRating rating={item.vote_average.toFixed(1)}/>
                          <Genres data={item.genre_ids.slice(0,2)}/>
                        </div>
                        <div className="textBlock">
                          <span className="title">
                            {item.title || item.name}
                          </span>
                          <span className="date">
                            {dayjs(item.release_Date).format("MMMM D, YYYY ")}
                          </span>
                        </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="loadingSkeletion">
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
                {skItem()}
              </div>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel