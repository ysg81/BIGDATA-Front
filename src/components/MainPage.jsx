import React, { useEffect } from 'react';

import "./MainPage.css"
import MovieChart from '../MovieChart';
import { useDispatch } from 'react-redux';
import { getMoviePointExpect } from '../appAction';

const MainPage = props => {
  const dispatch = useDispatch()

  // 차트 테스트용 데이터 더미 데이터 호출
  useEffect(()=>{
    dispatch(getMoviePointExpect({data:'some-movie-info'}))
  },[])

  return (<>
    <div className="container">
      <div className="title" />
      <MovieChart className="chart" />
    </div>
    <style jsx>{`
      .container{
        height: 100%;  
        width: auto;  
        max-width: 60rem;
        margin: 0 auto;
        padding: 5rem;
        overflow:hidden;
      }
      .title{
        width:auto;
        height: 20rem;

        border-radius: 20px;
        opacity:0.7;
        background-image: url(/img/movie.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      .chart{
        margin-top: 2rem;
      }
    `}</style>
  </>)
}

export default MainPage;