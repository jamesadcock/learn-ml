import { showGraph } from "../graph";

// Input data: x represents advertising spend, y represents revenue
const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Advertising Spend in $1000s
const y = [4, 8, 10, 14, 18, 17, 28, 27, 38, 45, 50]; // Revenue in $1000s

// Learning rate controls how much we adjust the weight in each step
const learningRate = 0.001;

// Function to perform linear regression
const linearRegression = () => {
  let weight = 0; // Start with an initial weight of 0
  const maxEpochs = 200; // Maximum number of iterations

  for (let epoch = 0; epoch < maxEpochs; epoch++) {
    // Predict y values using the current weight
    const predictions = x.map((value) => value * weight);

    // calculate the the gradient
    const gradient = gradientDescent(x, y, weight);
    console.log(`Epoch ${epoch} gradient: ${gradient}`);

    // Update the weight
    weight -= gradient * learningRate;
  }

  return weight;
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

const gradientDescent = (x: number[], y: number[], weight: number) => {
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i] * (weight * x[i] - y[i]);
  }
  const gradient = (sum * 2) / x.length;
  return gradient;
};

const weight = linearRegression();

// Generate the y coordinates for the trend line
const trendLineData = x.map((value) => value * weight);

// Display the graph with the scatter plot and trend line
showGraph(x, y, "Linear Regression", trendLineData);
