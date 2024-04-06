$(function() {
  // Sample leaderboard data
  var leaderboardData = [
      { name: "a", score: 100, rankChange: 0 },
      { name: "b", score: 99, rankChange: 0 },
      { name: "c", score: 95, rankChange: 0 },
      { name: "d", score: 70, rankChange: 0 },
      { name: "e", score: 60, rankChange: 0 },
      { name: "f", score: 50, rankChange: 0 },
      { name: "g", score: 28, rankChange: 0 },
      { name: "h", score: 57, rankChange: 0 },
      { name: "i", score: 90, rankChange: 0 },
      { name: "j", score: 35, rankChange: 0 }
  ];

  // Function to update the leaderboard table
  function updateLeaderboard() {
      var leaderboardTableBody = $("#leaderboardTableBody");
      leaderboardTableBody.empty();

      for (var i = 0; i < leaderboardData.length; i++) {
          var row = $("<tr>");
          row.append($("<td>").text(i + 1 + " (" + leaderboardData[i].rankChange + ")"));
          row.append($("<td>").text(leaderboardData[i].name));
          row.append($("<td>").text(leaderboardData[i].score));
          leaderboardTableBody.append(row);
      }
  }

  // Initial leaderboard update
  updateLeaderboard();

  // Simulate live updates every 5 seconds
  setInterval(function() {
      // Randomly update scores
      for (var i = 0; i < leaderboardData.length; i++) {
          leaderboardData[i].score += Math.floor(Math.random() * 10) + 1;
      }

      // Sort leaderboard data by score in descending order
      leaderboardData.sort((a, b) => b.score - a.score);

      // Update the leaderboard table
      updateLeaderboard();
  }, 5000); // Change the interval time as needed
});
