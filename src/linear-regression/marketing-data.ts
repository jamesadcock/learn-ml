import { showGraph } from "../graph";

// Input data: x represents advertising spend, y represents revenue
export const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Advertising Spend in $1000s
export const y = [9, 15, 23, 26, 30, 34, 40, 47, 48, 57, 62]; // Revenue in $1000s

showGraph(x, y, "Marketing Data");
