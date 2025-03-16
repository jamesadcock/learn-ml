// Import the function to display the graph
import { showGraph } from "../graph";

// Input data: x represents advertising spend, y represents revenue
const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Advertising Spend in $1000s
const y = [4, 8, 10, 14, 18, 17, 28, 27, 38, 45, 50]; // Revenue in $1000s

// Learning rate controls how much we adjust the weight in each step
const learningRate = 0.1;

// Function to perform linear regression
const linearRegression = () => {
  let weight = 0; // Start with an initial weight of 0
  const maxEpochs = 100; // Maximum number of iterations
  const targetLoss = 15; // Stop if the loss is below this value

  for (let epoch = 0; epoch < maxEpochs; epoch++) {
    // Predict y values using the current weight
    const predictions = x.map((value) => value * weight);

    // Calculate the loss (error) between actual and predicted values
    const error = calculateLoss(y, predictions);

    console.log(
      `Epoch: ${epoch}, Loss: ${error.toFixed(2)}, Weight: ${weight.toFixed(2)}`
    );

    // Stop if the error is small enough
    if (error < targetLoss) {
      break;
    }

    // Update the weight to reduce the error
    weight += learningRate;
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

const weight = linearRegression();

// Generate the y coordinates for the trend line
const trendLineData = x.map((value) => value * weight);

// Display the graph with the scatter plot and trend line
showGraph(x, y, "Linear Regression", trendLineData);
