import React, {useEffect, useRef} from 'react';
import mergeDeepRight from 'ramda/src/mergeDeepRight';
import noDataToDisplay from 'highcharts/modules/no-data-to-display';
import highcharts from 'highcharts';

import {getChartCommonOption, setYAxisGridLineLength} from '../utils/chartUtils';

const CHART_ID = 'highchart';

const Chart = props => {
  const {option, defaultOption = {}, loading, ...rest} = props;
  const chart = useRef(null);

  useEffect(() => {
    setYAxisGridLineLength(highcharts)(-0.05);
    noDataToDisplay(highcharts);
    chart.current = highcharts.chart(CHART_ID, mergeDeepRight(getChartCommonOption(), defaultOption));
  }, []);

  useEffect(() => {
    if (loading) {
      chart.current.hideNoData();
      chart.current.showLoading('Loading...');
    } else {
      chart.current.update(option, true, true);
    }
  }, [option]);

  return (
    <div {...rest} id={CHART_ID} />
  );
};

export default Chart;
