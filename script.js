function saveToLocalStorage(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  function getFromLocalStorage() {
    const storedData = localStorage.getItem("expenses");
    return storedData ? JSON.parse(storedData) : [];
  } 
