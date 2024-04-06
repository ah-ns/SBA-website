const editButton = document.getElementById('editbutton');
const saveButton = document.getElementById('savebutton');
const leaderboardTableBody = document.getElementById('leaderboardTableBody');

editButton.addEventListener('click', function() {
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

// You can add functionality to save button if needed
saveButton.addEventListener('click', function() {
    console.log("saving");

    // Example: Retrieve data from input fields and perform save operation
    const rows = leaderboardTableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const lastCell = row.querySelector('td:last-child');
        const inputField = lastCell.querySelector('input');
        lastCell.textContent = inputField.value; // Set last cell content to input value

        // Clear second to last and third to last cell content
        const secondToLastCell = row.querySelectorAll('td')[row.cells.length - 2];
        const thirdToLastCell = row.querySelectorAll('td')[row.cells.length - 3];
        secondToLastCell.textContent = secondToLastCell.textContent; // Maintain existing content
        thirdToLastCell.textContent = thirdToLastCell.textContent; // Maintain existing content

        // Remove the arrows
        const arrows = row.querySelectorAll('.fas');
        arrows.forEach(arrow => {
            arrow.remove();
        });
    });
});