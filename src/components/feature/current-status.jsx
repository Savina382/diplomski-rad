import WidgetContainer from "../ui/widget-container";
import { useState, useEffect } from "react";
import { getTransactions } from "../../api/fakeApi";
import { TYPES } from "../../constants/types";
import style from "./current-status.module.css";
import { getAccessToken } from "../../helpers/authentication";

export default function CurrentStatus() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactions = await getTransactions({}, getAccessToken());
      setTransactions(transactions);
      setIsLoading(false);
    };

    fetchTransactions();
  }, []);

  const [totalIncome, totalExpense] = transactions.reduce(
    (acc, transaction) => {
      acc[transaction.type === TYPES.INCOME ? 0 : 1] += transaction.amount;
      return acc;
    },
    [0, 0]
  );
  const balance = totalIncome - totalExpense;

  return (
    <WidgetContainer loading={isLoading} title="Trenutno stanje" size="large">
      <div>
        <div className={style.importantText}>
          Ukupni prihod: {totalIncome} RSD
        </div>
        <div className={style.importantText}>
          Ukupni rashod: {totalExpense} RSD
        </div>
        <div
          className={`${style.importantText} ${
            balance > 0 ? style.balancePositive : style.balanceNegative
          }`}
        >
          Stanje: {balance} RSD
        </div>
      </div>
    </WidgetContainer>
  );
}
