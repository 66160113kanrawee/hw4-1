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
  function generateMonthlyReport(year, month) {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getFullYear() === year &&
        expenseDate.getMonth() + 1 === month
      );
    });
  }
  function addExpense(expense) {
    const table = document.getElementById("expense-list");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${expense.title}</td>
        <td>${expense.amount.toFixed(2)} บาท</td>
        <td>${expense.category}</td>
        <td>${expense.date}</td>
    `;
    
    table.appendChild(row);
}
function updateTotal() {
    let total = 0;
    document.querySelectorAll("#expense-list tr td:nth-child(2)").forEach(td => {
        total += parseFloat(td.textContent);
    });
    document.getElementById("total-amount").textContent = total.toFixed(2);
}
let expenses = [];

document.getElementById("expense-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const expenseData = {
        id: Date.now().toString(),
        title: document.getElementById("title").value,
        amount: parseFloat(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        date: document.getElementById("date").value
    };

    expenses.push(expenseData);
    renderExpenses(expenses);
    updateTotal();
    alert("บันทึกค่าใช้จ่ายสำเร็จ!");
    this.reset();
});