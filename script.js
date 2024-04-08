$(function() {

  // Function to retrieve team data from localStorage
  function getTeamDataFromStorage() {
    const storedData = localStorage.getItem('teamData');
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return null;
    }
  }

  // Function to store team data in localStorage
  function saveTeamDataToStorage(data) {
    localStorage.setItem('teamData', JSON.stringify(data));
  }

  // Sample leaderboard data
  var teamData = getTeamDataFromStorage() || [
    { name: "Mangione Miners", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 },
    { name: "Alonso's Aces", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 },
    { name: "Seton Seyboldos", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 },
    { name: "Green Peel Guardians", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 },
    { name: "Knott Nauticals", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 },
    { name: "Reitz Crackers", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 },
    { name: "Campion Cavaliers", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 },
    { name: "Rope Walkers", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 },
    { name: "Nobles Knights", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 },
    { name: "Rofo Roughhousers", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 },
    { name: "Claver Clams", wins: 0, losses: 0, pointsAllowed: 0, rankChange: 0 }
  ];

  //reset all the teams data to 0 wins, losses, and PA
  function resetTeamData() {
    for (var i = 0; i < teamData.length; i++) {
      teamData[i].wins = 0;
      teamData[i].losses = 0;
      teamData[i].pointsAllowed = 0;
      teamData[i].rankChange = 0;
    }
    saveTeamDataToStorage(teamData); // Save updated data to local storage
  }

  //updates the teamData based on what is now in the website
  function updateTeamDataFromTable() {
    var rows = $("#leaderboardTableBody").find("tr");
    for (var i = 0; i < rows.length; i++) {
      var cells = $(rows[i]).find("td");
      teamData[i].wins = parseInt($(cells[2]).text());
      teamData[i].losses = parseInt($(cells[3]).text());
      teamData[i].pointsAllowed = parseInt($(cells[4]).text());
    }
    saveTeamDataToStorage(teamData); // Save updated data to local storage
    console.log("Sorted teamData:", teamData);
  }

  // Sorts the teams by wins and keeps track of initial rank
  function insertionSort() {
    const initialRanks = {};
    for (let i = 0; i < teamData.length; i++) {
      initialRanks[teamData[i].name] = i + 1;
    }

    for (let i = 1; i < teamData.length; i++) {
      let temp = teamData[i];
      let j = i - 1;
      for (j; j >= 0 && compareStats(temp, teamData[j]); j--) {
        teamData[j + 1] = teamData[j];
      }
      teamData[j + 1] = temp;
    }

    for (let i = 0; i < teamData.length; i++) {
      teamData[i].rankChange = initialRanks[teamData[i].name] - (i + 1);
    }
    saveTeamDataToStorage(teamData); // Save updated data to local storage
    console.log("Updated teamData:", teamData);
  }

  // Compares the stats of two teams
  function compareStats(team1, team2) {
    if (team1.wins !== 0 && team2.wins === 0) {
      return true;
    } else if (team1.wins === 0 && team2.wins !== 0) {
      return false;
    } else {
      // Continue with your existing comparison logic
      let team1WinPercent = team1.wins / (team1.wins + team1.losses);
      let team2WinPercent = team2.wins / (team2.wins + team2.losses);

      // Based off win percentage first
      if (team1WinPercent > team2WinPercent) {
        return true;
      } else if (team1WinPercent === team2WinPercent) {
        // Wins second
        if (team1.wins > team2.wins) {
          return true;
        } else if (team1.wins === team2.wins) {
          // And points allowed third
          return team1.pointsAllowed < team2.pointsAllowed;
        }
      }
    }

    return false;
  }

  // Function to update the leaderboard table
  function updateLeaderboard() {
    var leaderboardTableBody = $("#leaderboardTableBody");
    leaderboardTableBody.empty();

    for (var i = 0; i < teamData.length; i++) {
        var row = $("<tr>");
        var rankChangeDisplay = teamData[i].rankChange;
        if (rankChangeDisplay > 0) {
            rankChangeDisplay = " ⮝ " + rankChangeDisplay;
        } else if (rankChangeDisplay < 0) {
            rankChangeDisplay = " ⮟ " + (rankChangeDisplay + -2 * rankChangeDisplay);
        } else {
            rankChangeDisplay = " – ";
        }
        row.append($("<td>").text((i + 1) + rankChangeDisplay));

        // Create a <td> element for the team name
        var teamNameCell = $("<td>");

        // Create an <img> tag for the logo
        var logoImg = $("<img>");
        var teamName = teamData[i].name;
        logoImg.attr("src", "images/Logos/" + teamName + ".png"); // Set src attribute of the image
        logoImg.attr("alt", teamData[i].name); // Set alt attribute of the image
        
        // Add CSS styling to set the size of the logo image
        logoImg.css({"width": "50px", "height": "auto"}); // Adjust width as per your requirement
        
        // Prepend the logo image to the team name <td>
        teamNameCell.append(logoImg);

        // Add team name after the logo
        teamNameCell.append(document.createTextNode(" " + teamData[i].name));

        // Append the modified <td> to the row
        row.append(teamNameCell);

        row.append($("<td>").text(teamData[i].wins));
        row.append($("<td>").text(teamData[i].losses));
        row.append($("<td>").text(teamData[i].pointsAllowed));
        leaderboardTableBody.append(row);
    }
  }


  // Initial leaderboard update
  updateLeaderboard();

  const editButton = document.getElementById('editbutton');
  const saveButton = document.getElementById('savebutton');
  const resetButton = document.getElementById('resetbutton');
  const yesResetButton = document.querySelector('.yes-btn');
  const noResetButton = document.querySelector('.no-btn');
  const leaderboardTableBody = document.getElementById('leaderboardTableBody');
  const confBox = document.getElementById("confirmation-box");

  //-----------------------------------ACTION LISTENERS for the different buttons to do with standings--------------------------------------------
  centerConfirmationBox();
  //save button
  saveButton.addEventListener('click', function() {
    saveButton.style.display = 'none';
    resetButton.style.display = 'none';
    editButton.style.display = 'flex';

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

    checkInputPositive();

    //update and sort the table
    updateTeamDataFromTable();
    insertionSort();
    updateLeaderboard();
  });

  editButton.addEventListener('click', function() {
    editButton.style.display = 'none';
    resetButton.style.display = 'flex';
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

      addArrowsToCell(secondToLastCell);
      addArrowsToCell(thirdToLastCell);

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
      const cellAbove = cell.parentElement.querySelector('td:nth-child(' + (cellIdx + 1) + ')');
      addArrowsToCell(cellAbove);
    } else if (target && target.classList.contains('fa-arrow-down')) {
      if (!isNaN(currentValue)) {
        cell.textContent = checkPositive(currentValue - 1); // Decrement the value by 1
      }
      // Add arrows to the cell on top
      const cellAbove = cell.parentElement.querySelector('td:nth-child(' + (cellIdx + 1) + ')');
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
  function checkPositive(cellVal) {
    if (cellVal < 0) {
      cellVal = 0;
    }

    return cellVal;
  }

  function checkInputPositive() {
    const rows = leaderboardTableBody.querySelectorAll('tr');
    rows.forEach(row => {
      const lastCell = row.querySelector('td:last-child');
      if (lastCell.textContent < 0) {
        lastCell.textContent = 0;
      }
    })
  }

  //-------------------------------------confirmation box for reset data------------------------------
  //make sure it is centered in the users current screen at all times while displayed
  function centerConfirmationBox() {
    var box = document.querySelector('.confirmation-box');
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;

    var boxHeight = box.offsetHeight;
    var boxWidth = box.offsetWidth;

    var topPosition = (windowHeight - boxHeight) / 2 + window.pageYOffset;
    var leftPosition = (windowWidth - boxWidth) / 2 + window.pageXOffset;

    box.style.top = topPosition + 'px';
    box.style.left = leftPosition + 'px';
  }

  // Call the function when the window is resized or scrolled
  window.addEventListener('resize', centerConfirmationBox);
  window.addEventListener('scroll', centerConfirmationBox);

  resetButton.addEventListener('click', function() {
    centerConfirmationBox();
    confBox.style.display = "block";

    resetButton.style.display = "none";
    saveButton.style.display = "none";
  });

  //yes button on confirmation box
  yesResetButton.addEventListener('click', function() {
    //stop showing clear data and submit btn, show edit btn
    saveButton.style.display = 'none';
    resetButton.style.display = 'none';
    editButton.style.display = 'flex';

    resetTeamData();
    updateLeaderboard();
    confBox.style.display = "none";
  });

  //no button on confirmation box
  noResetButton.addEventListener('click', function() {
    confBox.style.display = "none";
    resetButton.style.display = "flex";
    saveButton.style.display = "flex";
  });

});//end everything


