import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import uniqBy from "ramda/src/uniqBy";

import { moviePointExpectSelector } from "./appReducer";
import { matchDataWrap } from "./utils/dataWrap";
import { formatNumber } from "./utils/numberUtils";
import Chart from "./components/Chart";

const getOption = () => ({
  title: {
    // text: '신작 영화 흥행률 예측',
    text: '',
  },
  yAxis: [{
    title: {
      text: '(별점)',
      align: 'high',
      offset: 13,
      rotation: 0,
      y: -20,
      style: {
        'font-size': '0.9em',
      },
    },
    tickPixelInterval: 40,
    labels: {
      formatter: ({value}) => formatNumber(value),
    },
  }],
  xAxis: {
    type: 'category',
  },
  tooltip: {
    formatter () {
      return `별점 ${formatNumber(this.y)}점`;
    },
  },
});

const getSeriesOption = list => {
  const data = list.map(movie => [movie.title,parseFloat(movie.score)] )
  const series = {
    type: 'column',
    data: data
  };
  return {series};
};

const MovieChart = props => {
  const [list, setList] = useState([])
  const dataWrap = useSelector(moviePointExpectSelector);

  useEffect(()=>{
    matchDataWrap({
      fulfilled: data => setList(uniqBy(v=>v.id,[...list,data].filter(v=>v.id !== -1)))
    })(dataWrap)
  },[dataWrap])

  return (
    <Chart 
      {...props}
      option={getSeriesOption(list)}
      defaultOption={getOption()}
    />
  );
};

export default MovieChart;
