// Access DOM elements
const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const clearAllBtn = document.getElementById("clear-all-btn");

// Table + total
const expenseTableBody = document.getElementById("expense-table-body");
const totalAmountDisplay = document.getElementById("total-amount");

// Expenses array (load from localStorage if available)
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalAmount = 0;

// --- FUNCTIONS ---

// Update total amount display
function updateTotalAmount() {
  totalAmountDisplay.textContent = totalAmount.toFixed(2);

  if (totalAmount < 0) {
    totalAmountDisplay.style.color = "red";
    totalAmountDisplay.style.fontWeight = "bold";
  } else if (totalAmount === 0) {
    totalAmountDisplay.style.color = "black";
    totalAmountDisplay.style.fontWeight = "normal";
  } else {
    totalAmountDisplay.style.color = "green";
    totalAmountDisplay.style.fontWeight = "bold";
  }
}

// Render all expenses from the array
function renderExpenses() {
  expenseTableBody.innerHTML = "";
  totalAmount = 0;

  expenses.forEach((expense, index) => {
    const newRow = document.createElement("tr");

    const descriptionCell = document.createElement("td");
    const amountCell = document.createElement("td");
    const actionCell = document.createElement("td");

    descriptionCell.textContent = expense.description;
    amountCell.textContent = expense.amount.toFixed(2);

    // Style positive/negative amounts
    amountCell.style.color = expense.amount < 0 ? "red" : "green";

    // --- Restore cell styling ---
    [descriptionCell, amountCell, actionCell].forEach((cell) => {
      cell.style.border = "1px solid #ddd";
      cell.style.padding = "8px";
      cell.style.textAlign = "center";
    });

    // Row background
    newRow.style.backgroundColor = "#ebebebff";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
    });

    // Append everything
    actionCell.appendChild(deleteBtn);
    newRow.appendChild(descriptionCell);
    newRow.appendChild(amountCell);
    newRow.appendChild(actionCell);

    expenseTableBody.appendChild(newRow);

    totalAmount += expense.amount;
  });

  updateTotalAmount();
}

// Add expense
function addExpense(event) {
  event.preventDefault();

  const description = descriptionInput.value.trim().toUpperCase();
  const amount = parseFloat(amountInput.value.trim());

  if (description === "" || isNaN(amount)) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const expense = { description, amount };
  expenses.push(expense);

  // Save to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Re-render
  renderExpenses();

  // Reset form
  descriptionInput.value = "";
  amountInput.value = "";
}

// Clear all
clearAllBtn.addEventListener("click", function () {
  if (confirm("Are you sure you want to clear all expenses?")) {
    expenses = [];
    localStorage.removeItem("expenses");
    renderExpenses();
  }
});

// Event listeners
expenseForm.addEventListener("submit", addExpense);

// --- INITIALIZE ---
renderExpenses();
