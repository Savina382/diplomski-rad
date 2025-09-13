import WidgetContainer from "../ui/widget-container";
import { useState, useEffect, useMemo } from "react";
import { getTransactions } from "../../api/fakeApi";
import { BarChart } from "../ui/bar-chart";
import { TYPES } from "../../constants/types";
import { getAccessToken } from "../../helpers/authentication";

const months = [
  "Januar",
  "Februar",
  "Mart",
  "April",
  "Maj",
  "Jun",
  "Jul",
  "Avgust",
  "Septembar",
  "Oktobar",
  "Novembar",
  "Decembar",
];

function SumPerMonth() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      // Date from the beginning of the current year.
      const dateFrom = new Date(new Date().getFullYear(), 0, 1).toISOString();

      const transactions = await getTransactions({
        filters: {
          dateFrom,
        },
      }, getAccessToken());

      setTransactions(transactions);
      setIsLoading(false);
    };
    fetchTransactions();
  }, []);

  /*
  Example of data:
    [
      { name: "January", priliv: 100, rashod: 50 },
      { name: "February", priliv: 200, rashod: 100 },
      { name: "March", priliv: 300, rashod: 150 },
      { name: "April", priliv: 400, rashod: 200 },
      { name: "May", priliv: 500, rashod: 250 },
      { name: "June", priliv: 600, rashod: 300 },
      { name: "July", priliv: 700, rashod: 350 },
    ]
  */
  const data = useMemo(() => {
    const dataObj = transactions.reduce((acc, curr) => {
      const month = new Date(curr.date).getMonth();
      if (!acc[month]) {
        acc[month] = { name: months[month], priliv: 0, rashod: 0 };
      }

      if (curr.type === TYPES.INCOME) {
        acc[month].priliv += curr.amount;
      } else {
        acc[month].rashod += curr.amount;
      }

      return acc;
    }, {});

    return Object.values(dataObj);
  }, [transactions]);

  return (
    <WidgetContainer
      loading={isLoading}
      title="Suma transakcija po mesecu"
      size="large"
    >
      {data.length ? (
        <BarChart data={data} />
      ) : (
        <div>Nema transakcija</div>
      )}
    </WidgetContainer>
  );
}

export default SumPerMonth;
