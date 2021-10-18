const formatPriceQuote = (value) => {
  if (value == null) {
    return 0;
  }
  if (value > 0) {
    return value.toFixed(2);
  }
};

export const formatResponseForRechart = (responseData) => {
  const timestamps = responseData.chart.result[0].timestamp.map((timestamp) => {
    if (responseData.chart.result[0].meta.range == "1d") {
      return new Date(timestamp * 1000)
        .toLocaleString("en-US", { timeZone: "America/New_York" })
        .toString()
        .substr(11, 12);
    }
    return new Date(timestamp * 1000)
      .toLocaleString("en-US", { timeZone: "America/New_York" })
      .toString();
  });
  const rechartData = timestamps
    .map((quote, index) => {
      let dataPoint = {
        timestamp: timestamps[index],
        low: formatPriceQuote(
          responseData.chart.result[0].indicators.quote[0].low[index]
        ),
        high: formatPriceQuote(
          responseData.chart.result[0].indicators.quote[0].high[index]
        ),
        close: formatPriceQuote(
          responseData.chart.result[0].indicators.quote[0].close[index]
        ),
      };
      return dataPoint;
    })
    .filter((dataPoint) => dataPoint.close > 0);
  const chartHigh = Math.max.apply(
    Math,
    rechartData.map((dataPoint) => Math.ceil(parseFloat(dataPoint.close)))
  );
  const chartLow = Math.min.apply(
    Math,
    rechartData.map((dataPoint) => Math.floor(parseFloat(dataPoint.close)))
  );

  return {
    rechartData,
    chartHigh,
    chartLow,
  };
};
