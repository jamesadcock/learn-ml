import * as http from "http";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import * as fs from "fs";
import { ChartConfiguration, ChartData } from "chart.js";

const port = 3000;

export interface GraphData {
  x: number;
  y: number;
}

export const showGraph = async (
  x: number[],
  y: number[],
  graphName: string,
  trendLine?: number[]
) => {
  const graphData = convertToGraphData(x, y);
  const trendLineData = trendLine
    ? convertToGraphData(x, trendLine)
    : undefined;

  await createGraph(graphData, trendLineData);

  const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === "/src/chart.png") {
      // Serve the chart image
      fs.readFile("./src/chart.png", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Chart not found");
        } else {
          res.writeHead(200, { "Content-Type": "image/png" });
          res.end(data);
        }
      });
    } else {
      // Serve the HTML page
      const htmlContent = generateHTML(graphName);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlContent);
    }
  });

  // Start the server
  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

// Function to generate HTML content
const generateHTML = (title: string): string => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            <h1>${title}</h1>
            <img src="src/chart.png" alt="Chart" />
        </body>
        </html>
    `;
};

const createGraph = async (
  graphData: GraphData[],
  trendLineData?: GraphData[]
) => {
  const width = 800; // Width of the chart
  const height = 600; // Height of the chart
  const backgroundColour = "white";
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColour,
  });

  const data: ChartData<"scatter" | "line"> = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: graphData,
        backgroundColor: "rgb(255, 99, 132)",
        type: "scatter",
      },
    ],
  };

  if (trendLineData) {
    data.datasets.push({
      label: "Trend Line",
      data: trendLineData,
      borderColor: "green",
      borderDash: [5, 5],
      type: "line",
      pointRadius: 0,
    });
  }

  const configuration: ChartConfiguration = {
    type: "scatter",
    data,
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
      },
    },
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  fs.writeFileSync("./src/chart.png", image);
  console.log("Chart saved as chart.png");
};

export const convertToGraphData = (x: number[], y: number[]): GraphData[] => {
  return x.map((value, index) => ({
    x: value,
    y: y[index],
  }));
};
