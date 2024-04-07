const editButton = document.getElementById('editbutton');
const saveButton = document.getElementById('savebutton');
const leaderboardTableBody = document.getElementById('leaderboardTableBody');

editButton.addEventListener('click', function() {
    editButton.style.display = 'none';
    saveButton.style.display = 'flex';
    console.log("editing");

    // Loop through each row in the table body
    const rows = leaderboardTableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');

        const lastCell = cells[cells.length - 1]; // Get the last cell in the row
        const inputField = document.createElement('input');
        inputField.value = lastCell.textContent.trim(); // Set input value to existing text
        lastCell.textContent = ''; // Clear last cell content
        lastCell.appendChild(inputField); // Append input field to last cell

        // Add up arrow icon to the second to last cell
        const secondToLastCell = cells[cells.length - 3];
        const thirdToLastCell = cells[cells.length - 2];


        const upArrowSecond = document.createElement('i');
        upArrowSecond.classList.add('fas', 'fa-arrow-up');
        const downArrowSecond = document.createElement('i');
        downArrowSecond.classList.add('fas', 'fa-arrow-down');
        
        const upArrowThird = document.createElement('i');
        upArrowThird.classList.add('fas', 'fa-arrow-up');
        const downArrowThird = document.createElement('i');
        downArrowThird.classList.add('fas', 'fa-arrow-down');
        
        secondToLastCell.append(upArrowSecond);
        secondToLastCell.append(downArrowSecond);
        thirdToLastCell.append(upArrowThird);
        thirdToLastCell.append(downArrowThird);

    });
});

leaderboardTableBody.addEventListener('click', function(event) {
    const target = event.target;

    // Handle up arrow click
    const cell = target.parentElement; // Get parent cell
    const cellIdx = cell.cellIndex;
    const currentValue = parseInt(cell.textContent);

    if (target && target.classList.contains('fa-arrow-up')) {
        if (!isNaN(currentValue)) {
            cell.textContent = checkPositive(currentValue + 1); // Increment the value by 1
        }
        // Add arrows to the cell on top
        const cellAbove = cell.parentElement.querySelector('td:nth-child('+(cellIdx+1)+')');
        addArrowsToCell(cellAbove);
    } else if (target && target.classList.contains('fa-arrow-down')) {
        if (!isNaN(currentValue)) {
            cell.textContent = checkPositive(currentValue - 1); // Decrement the value by 1
        }
        // Add arrows to the cell on top
        const cellAbove = cell.parentElement.querySelector('td:nth-child('+(cellIdx+1)+')');
        addArrowsToCell(cellAbove);
    }
});

// Function to add arrows to a cell
function addArrowsToCell(cell) {
    const upArrow = document.createElement('i');
    upArrow.classList.add('fas', 'fa-arrow-up');
    const downArrow = document.createElement('i');
    downArrow.classList.add('fas', 'fa-arrow-down');
    cell.append(upArrow);
    cell.append(downArrow);
}

//validation method
function checkPositive(cellVal){
    if(cellVal <0){
        cellVal = 0;
    }

    return cellVal;
}

function checkInputPositive(){
    const rows = leaderboardTableBody.querySelectorAll('tr');
    rows.forEach(row=>{
        const lastCell = row.querySelector('td:last-child');
        if(lastCell.textContent<0){
            lastCell.textContent = 0;
        }
    })
}
