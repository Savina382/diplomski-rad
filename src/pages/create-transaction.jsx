import DefaultLayout from "../components/feature/default-layout";
import TextInputField from "../components/ui/text-input";
import SelectInputField from "../components/ui/select-input";
import DateInputField from "../components/ui/date-input";
import Button from "../components/ui/button";
import style from "./create-transaction.module.css";
import { useState } from "react";
import { createTransaction } from "../api/fakeApi";
import { CATEGORIES } from "../constants/categories";
import { TYPES } from "../constants/types";
import { getAccessToken } from "../helpers/authentication";

const categoryOptions = [
  { label: "Hrana", value: CATEGORIES.FOOD },
  { label: "Prevoz", value: CATEGORIES.TRANSPORT },
  { label: "Kirija", value: CATEGORIES.RENT },
  { label: "Ostalo", value: CATEGORIES.OTHER },
];

const typeOptions = [
  { label: "Prihod", value: TYPES.INCOME },
  { label: "Rashod", value: TYPES.EXPENSE },
];

function validateForm(formValues) {
  let res = {};
  // Validate name
  if (!formValues.name) {
    res.name = "Naziv transakcije je obavezan";
  }

  // Validate category
  if (!formValues.category) {
    res.category = "Kategorija transakcije je obavezna";
  }
  if (!Object.values(CATEGORIES).includes(formValues.category)) {
    res.category = "Kategorija transakcije je nevažeća";
  }

  // Validate type
  if (!formValues.type) {
    res.type = "Tip transakcije je obavezan";
  }
  if (!Object.values(TYPES).includes(formValues.type)) {
    res.type = "Tip transakcije je nevažeća";
  }

  // Validate date
  if (!formValues.date) {
    res.date = "Datum transakcije je obavezan";
  }
  if (formValues.date && new Date(formValues.date) > new Date()) {
    res.date = "Datum transakcije ne može biti u budućnosti";
  }

  // Validate amount
  if (!formValues.amount) {
    res.amount = "Iznos transakcije je obavezan";
  }
  if (formValues.amount && isNaN(formValues.amount)) {
    res.amount = "Iznos transakcije je nevažeći";
  }
  if (formValues.amount && formValues.amount <= 0) {
    res.amount = "Iznos transakcije mora biti veći od 0";
  }
  return res;
}

export default function CreateTransaction() {
  const [formValues, setFormValues] = useState({
    name: "",
    category: "",
    type: "",
    date: "",
    amount: "",
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value, id) => {
    setFormValues({ ...formValues, [id]: value });
    setError({ ...error, [id]: "" });
  };

  const handleSubmit = async () => {
    const newErrors = validateForm(formValues);
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setIsLoading(true);
    const accessToken = getAccessToken();
    await createTransaction({
      ...formValues,
      date: new Date(formValues.date).toISOString(),
      amount: parseInt(formValues.amount),
    }, accessToken);
    setIsLoading(false);
  };

  return (
    <DefaultLayout
      className={style.createTransactionLayout}
      mainClassName={style.createTransactionMain}
      heading="Nova transakcija"
    >
      <form onSubmit={(e) => e.preventDefault()} className={style.form}>
        <TextInputField
          id="name"
          label="Naziv transakcije"
          onChange={handleChange}
          value={formValues.name}
          hasError={error.name}
          bottomText={error.name}
        />
        <SelectInputField
          id="category"
          label="Kategorija transakcije"
          onChange={handleChange}
          options={categoryOptions}
          value={formValues.category}
          hasError={error.category}
          bottomText={error.category}
        />
        <SelectInputField
          id="type"
          label="Tip transakcije"
          onChange={handleChange}
          options={typeOptions}
          value={formValues.type}
          hasError={error.type}
          bottomText={error.type}
        />
        <DateInputField
          id="date"
          label="Datum transakcije"
          onChange={handleChange}
          value={formValues.date}
          hasError={error.date}
          bottomText={error.date}
        />
        <TextInputField
          id="amount"
          label="Iznos transakcije (RSD)"
          onChange={handleChange}
          type="number"
          value={formValues.amount}
          hasError={error.amount}
          bottomText={error.amount}
        />
        <div>
          <Button disabled={isLoading} variant="primary" onClick={handleSubmit}>
            {isLoading ? "Kreiranje..." : "Kreiraj"}
          </Button>
        </div>
      </form>
    </DefaultLayout>
  );
}
