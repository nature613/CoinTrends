export default {
  data: [{
    type: 'line',
    lineColor: 'green',
    highlightEnabled: false,
    mouseover: function() {},
  }],
  zoomEnabled: false,
  animationEnabled: true,
  toolTip: {
    enabled: false,
  },
  axisX: {
    margin: 12,
    tickLength: 0,
    labelFormatter: function() {
      return ' ';
    },
  },
  axisY: {
    includeZero: false,
    tickLength: 0,
    lineThickness: 0,
    gridThickness: 0,
    prefix: '$',
  },
};
