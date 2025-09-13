import { v4 as uuidv4 } from "uuid";

const TRANSACTIONS_KEY = "transactions";
const USERS_KEY = "users";

function getFromLocalStorage(key) {
  const localStorageData = localStorage.getItem(key);
  return localStorageData ? JSON.parse(localStorageData) : [];
}

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getUsersTransactionsFromLocalStorage(userId) {
  const transactions = getFromLocalStorage(TRANSACTIONS_KEY);
  return transactions.filter((transaction) => transaction.userId === userId);
}

function getUserFromLocalStorageWithAccessToken(accessToken) {
  const users = getFromLocalStorage(USERS_KEY);
  return users.find((user) => user.accessToken === accessToken);
}

/**
 * This function is used to create a transaction.
 * @param {Object} transaction - The transaction object.
 * @param {string} accessToken - The access token of the user.
 * @returns {Promise<Object>} - The transaction object.
 * @throws {Error} - If the user is not found.
 */
export function createTransaction(transaction, accessToken) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getUserFromLocalStorageWithAccessToken(accessToken);
      if (!user) {
        reject(new Error("User not found."));
      }
      
      const transactions = getFromLocalStorage(TRANSACTIONS_KEY);
      const newTransaction = { ...transaction, id: uuidv4(), userId: user.id };
      saveToLocalStorage(TRANSACTIONS_KEY, [...transactions, newTransaction]);
      resolve(newTransaction);
    }, 1000);
  });
}

/**
 * This function is used to delete a transaction.
 * @param {string} id - The id of the transaction.
 * @param {string} accessToken - The access token of the user.
 * @returns {Promise<boolean>} - Returns true if the transaction is deleted, error if the user is not found.
 */
export function deleteTransaction(id, accessToken) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getUserFromLocalStorageWithAccessToken(accessToken);
      if (!user) {
        reject(new Error("User not found."));
      }
      const transactions = getFromLocalStorage(TRANSACTIONS_KEY);
      const newTransactions = transactions.filter(
        (transaction) => transaction.id !== id
      );
      saveToLocalStorage(TRANSACTIONS_KEY, newTransactions);
      resolve(true);
    }, 1000);
  });
}

// Transaction example:
// {
//   name: "Some transaction",
//   category: "Food",
//   type: "Expense",
//   date: "2025-01-01T00:00:00.000Z",
//   amount: 100,
//   id: "123e4567-e89b-12d3-a456-426614174000",
//   userId: "123e4567-e89b-12d3-a456-426614174000",
// }

// Filters example:
// {
//   dateFrom: "2025-01-01T00:00:00.000Z",
//   type: "Expense",
//   category: "Food",
// }

// Sort example:
// {
//   field: "date",
//   order: "desc",
// }

/**
 * This function is used to get transactions.
 * @param {Object} filters - The filters object.
 * @param {Object} sort - The sort object.
 * @param {number} limit - The limit of the transactions.
 * @param {number} skip - The skip of the transactions.
 * @param {string} accessToken - The access token of the user.
 * @returns {Promise<Object>} - The transactions object.
 * @throws {Error} - If the user is not found.
 */
export function getTransactions({ filters, sort, limit, skip = 0 } = {}, accessToken) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = getUserFromLocalStorageWithAccessToken(accessToken);
      if (!user) {
        reject(new Error("User not found."));
      }
      let filteredTransactions = getUsersTransactionsFromLocalStorage(user.id);

      if (filters?.dateFrom) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) =>
            new Date(transaction.date) >= new Date(filters.dateFrom)
        );
      }

      if (filters?.type) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) => transaction.type === filters.type
        );
      }

      if (filters?.category) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) => transaction.category === filters.category
        );
      }

      if (filters?.search) {
        filteredTransactions = filteredTransactions.filter(
          (transaction) => transaction.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      let sortedTransactions = filteredTransactions;

      if (sort) {
        sortedTransactions.sort((a, b) => {
          if (sort.order === "desc") {
            return b[sort.field] < a[sort.field] ? 1 : -1;
          }
          return a[sort.field] > b[sort.field] ? 1 : -1;
        });
      }

      if (skip || limit) {
        sortedTransactions = sortedTransactions.slice(skip, skip + limit);
      }

      const parsedTransactions = sortedTransactions.map((transaction) => ({
        ...transaction,
        amount: parseInt(transaction.amount),
        date: new Date(transaction.date).toISOString(),
      }));

      resolve(parsedTransactions);
    }, 1000);
  });
}

// Authentication
/*
  This is a user object example:
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    email: "test@test.com",
    password: "123456",
    accessToken: "123e4567-e89b-12d3-a456-426614174000"
  }
*/

/**
 * This function is used to login a user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} - The access token of the user.
 */
export function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getFromLocalStorage(USERS_KEY);

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        const accessToken = uuidv4();
        const updatedUsers = users.map((user) =>
          user.email === email ? { ...user, accessToken } : user
        );
        saveToLocalStorage(
          USERS_KEY,
          updatedUsers
        );
        resolve(accessToken);
      } else {
        reject(new Error("Invalid email or password."));
      }
    }, 1000);
  });
}

/**
 * This function is used to logout a user.
 * @param {string} accessToken - The access token of the user.
 * @returns {Promise<boolean>} - Returns true if the user is logged out, error if the user is not found.
 */
export function logout(accessToken) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getFromLocalStorage(USERS_KEY);
      const user = users.find((user) => user.accessToken === accessToken);
      if (!user) {
        reject(new Error("User not found."));
      }
      const newUsers = users.map((user) =>
        user.accessToken === accessToken ? { ...user, accessToken: null } : user
      );
      saveToLocalStorage(USERS_KEY, newUsers);
      resolve(true);
    }, 1000);
  });
}

/**
 * This function is used to sign up a user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} - The access token of the user.
 * @throws {Error} - If the user already exists.
 */
export function signUp(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getFromLocalStorage(USERS_KEY);
      const user = users.find((user) => user.email === email);
      if (user) {
        reject(new Error("User already exists."));
      }
      const accessToken = uuidv4();
      const newUser = { email, password, id: uuidv4(), accessToken };
      saveToLocalStorage(USERS_KEY, [...users, newUser]);
      resolve(accessToken);
    }, 1000);
  });
}
