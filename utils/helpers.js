export const findLineByLeastSquares = (xVals, yVals) => {
  xVals = xVals.map((x) => parseFloat(x));
  let xSquared = xVals.map((x) => x * x.toFixed(2));
  const xY = xVals.map((currElement, index) => xVals[index] * yVals[index]);
  const sumXVals = xVals.reduce((a, b) => a + b, 0);
  const sumYVals = yVals.reduce((a, b) => a + b, 0);
  const sumxSquaredVals = xSquared.reduce((a, b) => a + b, 0);
  const sumXYVals = xY.reduce((a, b) => a + b, 0);
  const N = xVals.length;
  const slopeM =
    (N * sumXYVals - sumXVals * sumYVals) /
    (N * sumxSquaredVals - sumXVals * sumXVals);
  const yInterceptB = (sumYVals - slopeM * sumXVals) / N;
  const linearrayegressionLine = xVals.map((x) => {
    let dataPoint = {};
    dataPoint.lrValue = slopeM * x + yInterceptB;
    return dataPoint;
  });
  const squaredErrorFromLine = linearrayegressionLine.map(
    (linearrayegressionLineValue, index) =>
      (yVals[index] - linearrayegressionLine[index]) *
      (yVals[index] - linearrayegressionLine[index])
  );
  const yValsMean = yVals.reduce((a, b) => a + b, 0) / yVals.length;
  const squaredMeanFromY = yVals.map(
    (yValue, index) => (yVals[index] - yValsMean) * (yVals[index] - yValsMean)
  );
  const totalSquaredErrorFromLine = squaredErrorFromLine.reduce(
    (a, b) => a + b,
    0
  );
  const totalSquaredErrorFromMeansOfyVals = squaredMeanFromY.reduce(
    (a, b) => a + b,
    0
  );
  const rSquared =
    1 -
    (totalSquaredErrorFromLine / totalSquaredErrorFromMeansOfyVals).toFixed(5);
  return { linearrayegressionLine, rSquared };
};

export const calculateSMA = (dataarrayay, window) => {
  const SMAvalues = [];

  let roundedWindow = Math.floor(window);
  if (roundedWindow % 2 === 0) {
    roundedWindow = roundedWindow - 1;
  }
  for (let i = 0; i < dataarrayay.length; i++) {
    let dataPoint = {};
    dataPoint.timeIndex = i;
    if (i >= Math.floor(roundedWindow / 2)) {
      const dataPointsToAverage = dataarrayay.slice(
        i - Math.floor(roundedWindow / 2),
        1 + i + Math.floor(roundedWindow / 2)
      );
      const dataPointsAverage =
        dataPointsToAverage.reduce((a, b) => a + b) /
        dataPointsToAverage.length;
      dataPoint.runningAveragePrice = dataPointsAverage;
      SMAvalues.push(dataPoint);
    }
    if (i < Math.floor(roundedWindow / 2)) {
      dataPoint.runningAveragePrice = null;
      SMAvalues.push(dataPoint);
    }
  }
  return SMAvalues;
};

export const getPercentDifference = (startPrice, currPrice) => {
  const percentDifference = Math.round(
    ((currPrice - startPrice) / startPrice) * 100
  );

  return percentDifference > 0
    ? "+" + percentDifference + "%"
    : percentDifference + "%";
};

export const average = (array) =>
  array.reduce((p, c) => p + c, 0) / array.length;
