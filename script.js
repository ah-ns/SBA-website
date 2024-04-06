$(function() {
  // Sample leaderboard data
  var teamData = [
      { name: "a", wins: 100, losses: 1, pointsAllowed: 10, rankChange: 0 },
      { name: "b", wins: 100, losses: 1, pointsAllowed: 9, rankChange: 0 },
      { name: "c", wins: 50, losses: 1, pointsAllowed: 9, rankChange: 0 },
      { name: "d", wins: 100, losses: 2, pointsAllowed: 9, rankChange: 0 },
      { name: "e", wins: 60, losses: 1, pointsAllowed: 9, rankChange: 0 },
      { name: "f", wins: 50, losses: 1, pointsAllowed: 9, rankChange: 0 },
      { name: "g", wins: 28, losses: 1, pointsAllowed: 9, rankChange: 0 },
      { name: "h", wins: 57, losses: 1, pointsAllowed: 9, rankChange: 0 },
      { name: "i", wins: 90, losses: 1, pointsAllowed: 9, rankChange: 0 },
      { name: "j", wins: 35, losses: 1, pointsAllowed: 9, rankChange: 0 }
  ];

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
  }

  // Compares the stats of two teams
  function compareStats(team1, team2) {
    let result = false;

    let team1WinPercent = team1.wins / (team1.wins + team1.losses);
    let team2WinPercent = team2.wins / (team2.wins + team2.losses);

    if (team1WinPercent > team2WinPercent) {
        result = true;
    } else if (team1WinPercent == team2WinPercent) {
        if (team1.wins > team2.wins) {
            result = true;
        } else if (team1.wins == team2.wins) {
            result = team1.pointsAllowed < team2.pointsAllowed;
        }
    }

    return result;
  } 

  // Function to update the leaderboard table
  function updateLeaderboard() {
      var leaderboardTableBody = $("#leaderboardTableBody");
      leaderboardTableBody.empty();

      for (var i = 0; i < teamData.length; i++) {
          var row = $("<tr>");
          row.append($("<td>").text((i + 1) + " (" + teamData[i].rankChange + ")"));
          row.append($("<td>").text(teamData[i].name));
          row.append($("<td>").text(teamData[i].wins));
          row.append($("<td>").text(teamData[i].losses));
          row.append($("<td>").text(teamData[i].pointsAllowed));
          leaderboardTableBody.append(row);
      }
  }

  // Initial leaderboard update
  updateLeaderboard();

  // Simulate live updates every 5 seconds
  setInterval(function() {
      // Randomly update wins
    //   for (var i = 0; i < teamData.length; i++) {
    //       teamData[i].wins += Math.floor(Math.random() * 10) + 1;
    //   }

      // Sort leaderboard data by wins in descending order
      insertionSort();

      // Update the leaderboard table
      updateLeaderboard();
  }, 5000); // Change the interval time as needed
});
