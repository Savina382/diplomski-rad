import DefaultLayout from "../components/feature/default-layout";
import Table, {
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../components/ui/table";
import { useState, useEffect } from "react";
import { getTransactions, deleteTransaction } from "../api/fakeApi";
import { getAccessToken } from "../helpers/authentication";
import TextInputField from "../components/ui/text-input";
import style from "./transactions-list.module.css"; 
import SelectInputField from "../components/ui/select-input";
import { TYPES } from "../constants/types";
import { CATEGORIES } from "../constants/categories";
import { getCategoryLabel, getTypeLabel } from "../helpers/transaction";
import Button from "../components/ui/button";

const typeOptions = [
  { label: "Prihod", value: TYPES.INCOME },
  { label: "Rashod", value: TYPES.EXPENSE },
  { label: "Sve", value: "" },
];

const categoryOptions = [
  { label: "Hrana", value: CATEGORIES.FOOD },
  { label: "Prevoz", value: CATEGORIES.TRANSPORT },
  { label: "Kirija", value: CATEGORIES.RENT },
  { label: "Ostalo", value: CATEGORIES.OTHER },
  { label: "Sve", value: "" },
];

export default function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");


  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      const transactions = await getTransactions(
        {
          filters: {
            search,
            type,
            category,
          },
        },
        getAccessToken()
      );
      setTransactions(transactions);
      setIsLoading(false);
    };

    fetchTransactions();
  }, [search, type, category]);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await deleteTransaction(id, getAccessToken());
      const transactions = await getTransactions(
        {
          filters: {
            search,
            type,
            category,
          },
        },
        getAccessToken()
      );
      setTransactions(transactions);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  return (
    <DefaultLayout heading="Lista transakcija">
      <div className={style.transactionsList}>
        <form className={style.form} onSubmit={(e) => e.preventDefault()}>
          <TextInputField
            label="Pretraga"
            onChange={handleSearch}
            value={search}
            id="search"
          />
          <SelectInputField
            label="Tip"
            onChange={handleTypeChange}
            value={type}
            id="type"
            options={typeOptions}
          />
          <SelectInputField
            label="Kategorija"
            onChange={handleCategoryChange}
            value={category}
            id="category"
            options={categoryOptions}
          />
        </form>
        {isLoading ? (
          <div>Učitavanje...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Naziv</TableCell>
                <TableCell>Kategorija</TableCell>
                <TableCell>Tip</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell>Iznos (RSD)</TableCell>
                <TableCell>Akcije</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  onDelete={handleDelete}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </DefaultLayout>
  );
}


function TransactionRow({ 
  transaction: { id, name, category, type, date, amount },
  onDelete,
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
      <TableCell>
        <Button size="small" variant="danger" onClick={() => onDelete(id)}>
          Obriši
        </Button>
      </TableCell>
    </TableRow>
  );
}
