import { useState, useEffect, useMemo } from "react";
import { getTransactions } from "../../api/fakeApi";
import { TYPES } from "../../constants/types";
import WidgetContainer from "../ui/widget-container";
import PieChart from "../ui/pie-chart";
import { getAccessToken } from "../../helpers/authentication";
import { getCategoryLabel } from "../../helpers/transaction";

export default function IncomesPerCategoriesPastMonthPie() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      // Date from 1 month ago.
      const dateFrom = new Date(
        new Date().setMonth(new Date().getMonth() - 1)
      ).toISOString();

      const transactions = await getTransactions({
        filters: {
          dateFrom,
          type: TYPES.INCOME,
        },
      }, getAccessToken());

      setTransactions(transactions);
      setIsLoading(false);
    };
    fetchTransactions();
  }, []);

  // Parse transactions to data for PieChart.
  // Transactions example:
  // const transactions = [
  // {
  //   name: "Some transaction",
  //   category: "Food",
  //   type: "Expense",
  //   date: "2025-01-01T00:00:00.000Z",
  //   amount: 100,
  //   id: "123e4567-e89b-12d3-a456-426614174000",
  // }
  // ]
  // Data example:
  // const data = [
  //   { name: 'Food', value: 100 },
  //   { name: 'Transport', value: 200 },
  //   { name: 'Rent', value: 300 },
  //   { name: 'other', value: 400 },
  // ]
  const data = useMemo(
    () =>
      Object.values(
        transactions.reduce(
          (acc, transaction) => {
            if (!acc[transaction.category]) {
              acc[transaction.category] = { name: getCategoryLabel(transaction.category), value: 0 };
            }

            acc[transaction.category].value += transaction.amount;
            return acc;
          },{}
        )
      ).filter((item) => item.value),
    [transactions]
  );

  return (
    <WidgetContainer
      loading={isLoading}
      title="Prihodi po kategorijama prethodnog meseca"
    >
      {data.length ? <PieChart data={data} /> : <div>Nema prihoda</div>}
    </WidgetContainer>
  );
}
