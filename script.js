function saveToLocalStorage(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  function getFromLocalStorage() {
    const storedData = localStorage.getItem("expenses");
    return storedData ? JSON.parse(storedData) : [];
  } 
  function filterExpenses() {
    const categoryFilter = document.getElementById("filter-category").value;
    const startDate = document.getElementById("filter-start-date").value;
    const endDate = document.getElementById("filter-end-date").value;

    const filtered = expenses.filter(exp => {
        let categoryMatch = categoryFilter === "all" || exp.category === categoryFilter;
        let dateMatch = true;

        if (startDate && endDate) {
            dateMatch = exp.date >= startDate && exp.date <= endDate;
        } else if (startDate) {
            dateMatch = exp.date >= startDate;
        } else if (endDate) {
            dateMatch = exp.date <= endDate;
        }

        return categoryMatch && dateMatch;
    });

    renderExpenses(filtered);
}
function resetFilter() {
    document.getElementById("filter-category").value = "all";
    document.getElementById("filter-start-date").value = "";
    document.getElementById("filter-end-date").value = "";
    renderExpenses(expenses);
}
function addExpense(expenseData) {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expenseData);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function getExpensesByDate(date) {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    return expenses.filter(expense => expense.date === date);
}
function calculateTotalByCategory(category) {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    return expenses
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  }