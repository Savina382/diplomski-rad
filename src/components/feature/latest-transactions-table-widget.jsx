import WidgetContainer from "../ui/widget-container";
import { useState, useEffect } from "react";
import { getTransactions } from "../../api/fakeApi";
import Table, {
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../ui/table";
import { getAccessToken } from "../../helpers/authentication";
import { getCategoryLabel } from "../../helpers/transaction";
import { getTypeLabel } from "../../helpers/transaction";

export default function LatestTransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      // Get latest 10 transactions.
      const transactions = await getTransactions({
        limit: 10,
        sort: { field: "date", order: "desc" },
      }, getAccessToken());
      setTransactions(transactions);
      setIsLoading(false);
    };

    fetchTransactions();
  }, []);

  return (
    <WidgetContainer
      size="large"
      title="Najnovije transakcije"
      loading={isLoading}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Naziv</TableCell>
            <TableCell>Kategorija</TableCell>
            <TableCell>Tip</TableCell>
            <TableCell>Datum</TableCell>
            <TableCell>Iznos (RSD)</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </TableBody>
      </Table>  
    </WidgetContainer>
  );
}

function TransactionRow({
  transaction: { id, name, category, type, date, amount },
}) {

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  return (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell>{getCategoryLabel(category)}</TableCell>
      <TableCell>{getTypeLabel(type)}</TableCell>
      <TableCell>{formatDate(date)}</TableCell>
      <TableCell>{amount}</TableCell>
    </TableRow>
  );
}
