import { showGraph } from "../graph";

// Input data: x represents advertising spend, y represents revenue
const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Advertising Spend in $1000s
const y = [4, 8, 10, 14, 18, 17, 28, 27, 38, 45, 50]; // Revenue in $1000s

// Learning rate controls how much we adjust the weight in each step
const learningRate = 0.001;

// Function to perform linear regression
const linearRegression = () => {
  let weight = 0; // Start with an initial weight of 0
  let bias = 0; // Start with an initial bias of 0
  const epochs = 200; // Number of iterations

  for (let epoch = 0; epoch < epochs; epoch++) {
    // Predict y values using the current weight
    const predictions = x.map((value) => value * weight + bias);

    // calculate the the gradient
    const { weightGradient, biasGradient } = gradientDescent(
      x,
      y,
      weight,
      bias
    );
    console.log(
      `Epoch ${epoch} weight gradient: ${weightGradient}, bias gradient: ${biasGradient}`
    );

    // Update the weight and bias
    weight -= weightGradient * learningRate;
    bias -= biasGradient * learningRate;
  }

  return { weight, bias };
};

// Function to calculate the loss (mean squared error)
const calculateLoss = (actual: number[], predicted: number[]) => {
  let totalError = 0;

  // Sum up the squared differences between actual and predicted values
  for (let i = 0; i < actual.length; i++) {
    const difference = actual[i] - predicted[i];
    totalError += difference ** 2;
  }
  return totalError / actual.length;
};

// Calculate the gradient of the loss function with respect to the weight and bias
const gradientDescent = (
  x: number[],
  y: number[],
  weight: number,
  bias: number
) => {
  let weightSum = 0;
  let biasSum = 0;

  for (let i = 0; i < x.length; i++) {
    weightSum += x[i] * (weight * x[i] + bias - y[i]);
    biasSum += weight * x[i] + bias - y[i];
  }
  const weightGradient = (weightSum * 2) / x.length;
  const biasGradient = (biasSum * 2) / x.length;
  return { weightGradient, biasGradient };
};

const { weight, bias } = linearRegression();

// final loss
const predictions = x.map((value) => value * weight + bias);
const loss = calculateLoss(y, predictions);
console.log(`Final loss: ${loss}`);

// Generate the y coordinates for the trend line
const trendLineData = x.map((value) => value * weight + bias);

// Display the graph with the scatter plot and trend line
showGraph(x, y, "Linear Regression", trendLineData);
