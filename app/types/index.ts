export type Expense = {
  id: number,
  amount: number,
  expenseName: string,
  category: string,
  date: Date
}

export type State = {
  budget: number,
  expenses: Expense[]
}

export type Context = {
  state: State,
  totalExpenses: number,
  remainingBudget: number
}

export type RootStackParamList = {
  Home: {id: 1} | undefined,
  AddExpense: {id: 2} | undefined,
  EditExpense: { id: 3, expense: Expense } | undefined
}