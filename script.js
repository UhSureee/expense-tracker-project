//Access Dom elements//
const expenseForm = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const clearAllBtn = document.getElementById("clear-all-btn");

//Access table elements//
const expenseTableBody = document.getElementById("expense-table-body");
const totalAmountDisplay = document.getElementById("total-amount");

//Initialize total amount//
let totalAmount = 0;

//Function to update total amount disoplay//
function updateTotalAmount() {
  if (totalAmount < 0) {
    totalAmountDisplay.textContent = `${totalAmount.toFixed(2)}`;
    totalAmountDisplay.style.color = "red";
    totalAmountDisplay.style.fontWeight = "bold";
    totalAmountDisplay.style.marginTop = "10px";
  } else if (totalAmount === 0) {
    totalAmountDisplay.textContent = `${totalAmount.toFixed(2)}`;
    totalAmountDisplay.style.color = "black";
    totalAmountDisplay.style.fontWeight = "normal";
  } else {
    totalAmountDisplay.textContent = `${totalAmount.toFixed(2)}`;
    totalAmountDisplay.style.color = "Green";
    totalAmountDisplay.style.fontWeight = "bold";
  }
}

//Function to add expense to the table//
function addExpense(event) {
  event.preventDefault();

  const description = descriptionInput.value.trim().toUpperCase();
  const amount = parseFloat(amountInput.value.trim());

  if (description === "" || isNaN(amount)) {
    alert("Please enter a valid description and amount.");
    return;
  }

  //Create a new row//
  const newRow = document.createElement("tr");
  const descriptionCell = document.createElement("td");
  const amountCell = document.createElement("td");
  const actionCell = document.createElement("td");

  descriptionCell.textContent = description;
  amountCell.textContent = amount.toFixed(2);

  //Create delete button//
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function () {
    expenseTableBody.removeChild(newRow);
    totalAmount -= amount;
    updateTotalAmount();
  });

  //add styling for negative amounts//
  if (amount < 0) {
    amountCell.style.color = "red";
  } else {
    amountCell.style.color = "green";
  }

  //Border styling for cells//
  descriptionCell.style.border = "1px solid #ddd";
  amountCell.style.border = "1px solid #ddd";
  actionCell.style.border = "1px solid #ddd";

  //Padding for cells//
  descriptionCell.style.padding = "8px";
  amountCell.style.padding = "8px";
  actionCell.style.padding = "8px";

  //Center align text in cells//
  descriptionCell.style.textAlign = "center";
  amountCell.style.textAlign = "center";
  actionCell.style.textAlign = "center";

  //background color for rows//
  newRow.style.backgroundColor = "#ebebebff";

  //Append cells to the row//
  actionCell.appendChild(deleteBtn);
  newRow.appendChild(descriptionCell);
  newRow.appendChild(amountCell);
  newRow.appendChild(actionCell);

  //Append the row to the table body//
  expenseTableBody.appendChild(newRow);
  totalAmount += amount;
  updateTotalAmount();
}

//Event listeners for form submission and clear values inputs//
expenseForm.addEventListener("submit", addExpense);
descriptionInput.addEventListener("focus", function () {
  descriptionInput.value = "";
  amountInput.value = "";
});

//Initial call to display total amount//
updateTotalAmount();

//Clear all expenses functionality//
clearAllBtn.addEventListener("click", function () {
  if (confirm("Are you sure you want to clear all expenses?")) {
    expenseTableBody.innerHTML = "";
    totalAmount = 0;
    updateTotalAmount();
  }
});
