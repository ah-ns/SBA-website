$(function() {
  // Sample leaderboard data
  var teamData = [
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

  //updates the teamData based on what is now in the website
  function updateTeamDataFromTable() {
    var rows = $("#leaderboardTableBody").find("tr");
    for (var i = 0; i < rows.length; i++) {
        var cells = $(rows[i]).find("td");
        teamData[i].wins = parseInt($(cells[2]).text());
        teamData[i].losses = parseInt($(cells[3]).text());
        teamData[i].pointsAllowed = parseInt($(cells[4]).text());
    }
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
        teamData[j+1] = teamData[j];
      }
      teamData[j+1] = temp;
    }

    for (let i = 0; i < teamData.length; i++) {
      teamData[i].rankChange = initialRanks[teamData[i].name] - (i+1);
    }
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
            rankChangeDisplay = " ⮟ " + (rankChangeDisplay + -2 * rankChangeDisplay) ;
          } else {
            rankChangeDisplay = " – ";
          }
          row.append($("<td>").text((i + 1) + rankChangeDisplay));
          row.append($("<td>").text(teamData[i].name));
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
const leaderboardTableBody = document.getElementById('leaderboardTableBody');

// You can add functionality to save button if needed
saveButton.addEventListener('click', function() {
  saveButton.style.display = 'none';    
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


  // // Simulate live updates in interval of ms
  // setInterval(function() {
  //     // TODO: add stats based on buttons pressed
  //     updateTeamDataFromTable();
  //     //testing the sort with random numbers every few seconds
  //     // for (var i = 0; i < teamData.length; i++) {
  //     //     teamData[i].wins += Math.floor(Math.random() * 10) + 1;
  //     // }
  //   insertionSort();
  //   updateLeaderboard();
  // }, 10000); // Change the interval time as needed
});