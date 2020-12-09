import {formatNumber} from './numberUtils';

export const getChartCommonOption = () => ({
  chart: {
    zoomType: 'x',
    height: 300,
    borderColor: '#F4F4F4',
    marginTop:50,
    spacingBottom: 1.5,
    spacingLeft: 1.5,
    spacingRight: 1.5,
    marginRight: 30,
    marginLeft: 50,
    numberFormatter: formatNumber,
  },
  xAxis: [{
    type: 'datetime',
    gridLineDashStyle: 'solid',
    gridLineWidth: 1,
    tickLength: 0,
    crosshair: {
      width: 1.5,
      color: '#999999',
    },
  }],
  tooltip: {
    crosshairs: true,
    useHTML: true,
    positioner (width) {
      const yAxisLabelWidth = this.chart.yAxis.find(v => !v.opposite)?.left || 0;
      return {x: this.chart.hoverPoint.clientX - width / 2 + yAxisLabelWidth, y: 50};
    },
  },
  plotOptions: {
    column: {
      maxPointWidth: 50,
      states: {
        hover: {
          brightness: -0.1,
        },
      },
    },
    // line인 경우
    // series: {
    //   lineWidth: 1.5,
    //   opacity: 0.7,
    //   pointPadding: 0,
    //   borderWidth: 0,
    //   states: {
    //     hover: {
    //       lineWidthPlus: 0,
    //     },
    //     inactive: {
    //       enabled: false,
    //     },
    //   },
    //   marker: {
    //     symbol: 'circle',
    //     lineWidth: 1.5,
    //     lineColor: null, // inherit from series
    //     states: {
    //       hover: {
    //         fillColor: null,
    //         radiusPlus: 0,
    //       },
    //       normal: {
    //         fillColor: '#FFFFFF',
    //       },
    //     },
    //   },
    // },
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled:false,
    align: 'right',
    width: '100%',
    padding: 20,
    margin: 20,
    reversed: true,
    rtl: true,
    x: -1,
    symbolRadius: 0,
    borderWidth: 1.5,
    borderColor: '#F4F4F4',
    backgroundColor: '#FAFAFA',
  },
  time: {
    useUTC: false,
  },
  lang: {
    noData: '데이터가 없습니다.',
  },
  noData: {
    style: {
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#303030',
    },
  },
  colors: ['#3948AB', '#606FCA', '#4C4C4C'],
});

export const setYAxisGridLineLength = highcharts => ratio => {
  highcharts.wrap(highcharts.Tick.prototype, 'render', function (p, index, old, opacity) {
    const tick = this;
    let d;
    p.call(this, index, old, opacity);

    if (tick.gridLine && this.axis.isXAxis) {
      d = tick.gridLine.d.split(' ');

      d[2] = (d[5] - d[2]) * ratio + tick.axis.chart.plotTop;

      tick.gridLine.attr({
        d,
      });
    }
  });
};

export const colorBox = color => (
  `<svg width="12" height="12">
    <rect x="0" y="0" width="12" height="12" fill="${color}" class="color_box" data-z-index="3" />
  </svg>`
);
