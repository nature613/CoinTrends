<template>
  <div class="chart-container" style="margin-bottom: -15px; border: 1px solid transparent" :id="`chartContainer-${index}`"></div>
</template>

<script>
import baseChartConfig from '@/assets/js/baseChartConfig.js';
import CanvasJS from '@/assets/js/canvasjs.min.js';

export default {
  name: 'priceHistChart',
  props: {
    coin: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    chartDrawHandler: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    chartConfig() {
      return baseChartConfig;
    },
  },
  methods: {
    makeChart() {
      let dataPoints = [];
      let chartConfig = baseChartConfig;
      chartConfig.data[0].dataPoints = dataPoints;
      let chart = new CanvasJS.Chart(`chartContainer-${this.index}`, chartConfig);
      let data = this.coin.fullPriceHist;
      for (let i = data.length - 169; i < data.length; i++) {
        var color = '';
        var len = data.length;
        if (parseFloat(data[len - 1].priceUsd) > parseFloat(data[len - 169].priceUsd)) {
          color = 'green';
        } else {
          color = 'red';
        }
        dataPoints.push({
          x: data[i].time,
          y: parseFloat(data[i].priceUsd),
          lineColor: color,
          color: color,
        });
      }
      chart.render();
    },
  },
  watch: {
    chartDrawHandler(newVal) {
      if (newVal === true) {
        this.makeChart();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variables.scss";
.chart-container {
  height: 80px;
  width: 150px;
}
/deep/ {
  .canvasjs-chart-container {
  overflow: hidden;
  width: 150px;
  height: 64px;
  pointer-events: none;
  }
  .canvasjs-chart-canvas {
    pointer-events: none;
  }
}
@media (max-width: $breakpoint-med) {
  /deep/ {
    .canvasjs-chart-canvas {
      width: 110px;
    }
    td .canvasjs-chart-container {
      height: 64px;
    }
  }
  td .chart-container {
    width: 110px;
    margin: 0 auto -15px auto;
  }
}
</style>
