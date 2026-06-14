// DOM Elements
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addBtn = document.getElementById('add-btn');
const expenseList = document.getElementById('expense-list');
const totalVal = document.getElementById('total-val');

let emptyMsg = document.getElementById('empty-msg');

let expenses = [];


function updateUI() {
    expenseList.innerHTML = '';

    if (expenses.length === 0) {
        if (!emptyMsg) {
            emptyMsg = document.createElement('li');
            emptyMsg.className = 'empty-state';
            emptyMsg.id = 'empty-msg';
            emptyMsg.textContent = 'No expenses added yet.';
        }
        expenseList.appendChild(emptyMsg);
        totalVal.textContent = '0.00';
        return;
    }

    let total = 0;

    expenses.forEach((expense) => {
        total += expense.amount;

        const li = document.createElement('li');
        li.className = 'expense-item';

        li.innerHTML = `
            <div class="expense-info">
                <span class="expense-name">${expense.name}</span>
            </div>
            <div style="display: flex; align-items: center;">
                <span class="expense-cost">$${expense.amount.toFixed(2)}</span>
                <button class="btn-delete" data-id="${expense.id}">Delete</button>
            </div>
        `;

        expenseList.appendChild(li);
    });

    totalVal.textContent = total.toFixed(2);

    attachDeleteListeners();
}

function addExpense() {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (name === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and positive numeric amount.');
        return;
    }

    const expense = {
        id: Date.now(), // Unique ID using timestamp
        name: name,
        amount: amount
    };

    expenses.push(expense);
    
    expenseNameInput.value = '';
    expenseAmountInput.value = '';

    updateUI();
}

function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const idToIdenitfy = parseInt(this.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== idToIdenitfy);
            updateUI();
        });
    });
}

addBtn.addEventListener('click', addExpense);

expenseAmountInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addExpense();
});