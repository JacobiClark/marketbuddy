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
  const linearRegressionLine = xVals.map((x) => {
    let dataPoint = {};
    dataPoint.lrValue = slopeM * x + yInterceptB;
    return dataPoint;
  });
  const squaredErrorFromLine = linearRegressionLine.map(
    (linearRegressionLineValue, index) =>
      (yVals[index] - linearRegressionLine[index]) *
      (yVals[index] - linearRegressionLine[index])
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
  console.log({ linearRegressionLine, rSquared });
  return { linearRegressionLine, rSquared };
};

export const calculateSMA = (dataArray, window) => {
  const SMAvalues = [];
  console.log(dataArray);
  console.log(window);
  let roundedWindow = Math.floor(window);
  if (roundedWindow % 2 === 0) {
    roundedWindow = roundedWindow - 1;
  }
  for (let i = 0; i < dataArray.length; i++) {
    let dataPoint = {};
    dataPoint.timeIndex = i;
    if (i >= Math.floor(roundedWindow / 2)) {
      const dataPointsToAverage = dataArray.slice(
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
