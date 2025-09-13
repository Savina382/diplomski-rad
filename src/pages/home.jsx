import DefaultLayout from "../components/feature/default-layout";
import style from "./home.module.css";
import ExpensesPerCategoriesPastMonthPie from "../components/feature/expenses-per-categories-past-month-pie-widget";
import IncomesPerCategoriesPastMonthPie from "../components/feature/incomes-per-categories-past-month-pie-widget";
import LatestTransactionsTable from "../components/feature/latest-transactions-table-widget";
import SumPerMonth from "../components/feature/sum-per-month-widget";
import CurrentStatus from "../components/feature/current-status";

export default function Home() {
  return (
    <DefaultLayout heading="Početna stranica">
      <div className={style.container}>
        <CurrentStatus />
        <ExpensesPerCategoriesPastMonthPie />
        <IncomesPerCategoriesPastMonthPie />
        <LatestTransactionsTable />
        <SumPerMonth />
      </div>
    </DefaultLayout>
  )
}