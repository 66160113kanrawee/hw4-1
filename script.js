function saveToLocalStorage(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }