//work on this
function makeChart(price, ind) {
  //console.log("chart is run");
  //console.log("chart price: "+price+"chartind: "+ind);
  var dataPoints = [];
  var chart = new CanvasJS.Chart("chartContainer"+ind,{ /*global CanvasJS*/
    data: [{
      type: "line",
      lineColor: "green",
      dataPoints : dataPoints,
      highlightEnabled: false,
      mouseover: function() {
        return;
      }
    }],
    zoomEnabled: true,
    animationEnabled: true,
    toolTip:{
      enabled: false
    },
    axisX: {
      margin: 12,
      tickLength: 0,
      labelFormatter: function(){
        return " ";
      }
    },
    axisY: {
      includeZero: false,
      tickLength: 0,
      lineThickness: 0,
      gridThickness: 0,
      prefix: "$",
    },
  });
  //var color = "";
  /*if (price[len-1][1] > price[0][1]) {
    color = "green";
  } else {
    color = "red";
  }*/
  /*$.getJSON("https://coincap.io/history/7day/BTC", function(data) { //old method relied on extra API calls
    $.each(data.price, function(key, value){
      if(key % 1 === 0) {
        dataPoints.push({x: value[0], y: value[1]});
        }
      });        
    chart.render();
  });*/
  for (var i = 0; i < price.length; i++) {
    var skipper = 1; //can change this value to skip data points in the array. 
      //Higher number means show less data points on chart, but it's a bit rough. Only use for testing.
    if(i % skipper === 0) { 
      //price is coming in as a 2-d array - first entry is a unix timestamp in ms, 2nd entry is coin price in USD
      var color = "";
      var len = price.length;
      /*if (i === price.length - 1) { //was a function to color individual data points based on upward or downward swing..
        color = "green";
      } else if (price[i][1] <= price[i+1][1]) {
        color = "green";
      } else {
        color = "red";
      }*/
      if (price[len-1][1] > price[0][1]) {
        color = "green";
      } else {
        color = "red";
      }
      dataPoints.push({
        x: price[i][0], 
        y: price[i][1],
        lineColor: color,
        color: color
      });
    }
  }
  chart.render();
}