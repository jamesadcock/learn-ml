import { showGraph } from "./graph";

function identity(x: number): number {
  return x;
}

const x = [0, 1, 2, 3, 4, 5];
const y = x.map(identity);
const title = "Identity Function";

const graphData = x.map((value, index) => ({
  x: value,
  y: y[index],
}));

showGraph(x, y, title);
