import { useSelector } from "react-redux";
import { moviePointExpectSelector } from "./appReducer";
import Chart from "./components/Chart";
import { FulfilledCase, MatchDataWrap } from "./utils/dataWrap";
import { formatNumber } from "./utils/numberUtils";

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

const getSeriesOption = data => {
  const series = {
    type:'column',
    data:[['AAA',1],['BBB',5],['CCC',3]]
  };
  return {series};
};

const MovieChart = props => {
  const dataWrap = useSelector(moviePointExpectSelector);
  console.log(dataWrap)
  return (
    <MatchDataWrap on={dataWrap} cached>
      <FulfilledCase>
        {data => (
          <Chart 
            {...props}
            option={getSeriesOption(data)}
            defaultOption={getOption()}
          />
        )}
      </FulfilledCase>
    </MatchDataWrap>
  );
};

export default MovieChart;
