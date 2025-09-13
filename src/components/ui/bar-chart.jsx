import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF7C7C",
];

/*
  Example of data:
  [
    { name: "January", income: 100, expense: 50 },
    { name: "February", income: 200, expense: 100 },
    { name: "March", income: 300, expense: 150 },
    { name: "April", income: 400, expense: 200 },
    { name: "May", income: 500, expense: 250 },
  ]
*/
/*
  Example of bars:
  ["income", "expense"]
*/

export function BarChart({ data = [] }) {
  // Get bars from data.
  const bars = data?.[0]
    ? Object.keys(data[0]).reduce(
        (acc, key) => (key !== "name" ? [...acc, key] : acc),
        []
      )
    : [];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        width="100%"
        height="100%"
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((barName, index) => (
          <Bar
            key={`bar-${barName}`}
            dataKey={barName}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
