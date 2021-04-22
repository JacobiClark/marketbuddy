import { findLineByLeastSquares, calculateSMA } from "./Helpers";

export const formatResponseForRechart = (responseData) => {
  const timestamps = responseData.chart.result[0].timestamp.map((timestamp) =>
    new Date(timestamp * 1000).toString().substr(0, 15)
  );
  const rechartData = timestamps.map((quote, index) => {
    let dataPoint = {
      timestamp: timestamps[index],
      low: responseData.chart.result[0].indicators.quote[0].low[index],
      high: responseData.chart.result[0].indicators.quote[0].high[index],
      close: responseData.chart.result[0].indicators.quote[0].close[
        index
      ].toFixed(2),
    };
    return dataPoint;
  });
  console.log(rechartData);
  const chartHigh = Math.max.apply(
    Math,
    rechartData.map((dataPoint) => dataPoint.close)
  );
  const chartLow = Math.min.apply(
    Math,
    rechartData.map((dataPoint) => dataPoint.close)
  );

  return {
    rechartData,
    chartHigh,
    chartLow,
  };
};
