import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

// Data example
// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF7C7C"];
export default function PieChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart width="100%" height="100%">
        <Pie
          data={data} 
          cx="50%"
          cy="50%"
          outerRadius={120}
          dataKey="value"
          label
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Tooltip />
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
