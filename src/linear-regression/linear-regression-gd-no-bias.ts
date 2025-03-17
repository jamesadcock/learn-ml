import { showGraph } from "../graph";
import { x, y } from "./marketing-data";

// Learning rate controls how much we adjust the weight in each step
const learningRate = 0.001;

// Function to perform linear regression
const linearRegression = () => {
  let weight = 0; // Start with an initial weight of 0
  const epochs = 50000; // Number of iterations

  for (let epoch = 0; epoch < epochs; epoch++) {
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

const predictions = x.map((value) => value * weight);
const loss = calculateLoss(y, predictions);
console.log(`Final loss: ${loss}`);

// Generate the y coordinates for the trend line
const trendLineData = x.map((value) => value * weight);

// Display the graph with the scatter plot and trend line
showGraph(x, y, "Linear Regression", trendLineData);
