$(function() {

    // Function to retrieve team data from localStorage
    function getDataFromStorage(key) {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        return JSON.parse(storedData);
      } else {
        return null;
      }
    }
  
    // Function to store team data in localStorage
    function saveDataToStorage(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    }

    //all teams in order of preseason ranking
    var preSznData = [
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
  
    // Sample leaderboard data
    var teamData = getDataFromStorage('teamData') || preSznData;
  
    //data for the weeks
    // Initialize weekData from localStorage or create an empty array if it doesn't exist
    let weekData = getDataFromStorage('weekData') || [];
    var weekPointer = 1;
    var activeWeek = 1;
  
    //reset all the teams data to 0 wins, losses, and PA
    function resetTeamData() {
      for (var i = 0; i < teamData.length; i++) {
        teamData[i].wins = 0;
        teamData[i].losses = 0;
        teamData[i].pointsAllowed = 0;
        teamData[i].rankChange = 0;
      }
      saveDataToStorage('teamData', teamData); // Save updated data to local storage
    }

    //----------------------NEW SECTION FOR HAVING DIFFERENT teamData for each week--------------------------------------------------
    // Initialize an array to store team data for each week
    var allTeamData = getDataFromStorage('allTeamData') || [];

    //update in the current weeks data
    function updateCurrentWeekTeamData() {
        allTeamData[activeWeek - 1] = JSON.parse(JSON.stringify(teamData)); // Create a deep copy of teamData
        //console.log(allTeamData[activeWeek-1]); //testing to stop what is interfering with calcRankChange

        saveDataToStorage('allTeamData', allTeamData);

        //console statements
        console.log("here is all the data in allTeamData:");
        let weekIdxTracker = 1;
        allTeamData.forEach(teamData=>{
            console.log("Week "+weekIdxTracker);
            console.log(teamData);
            weekIdxTracker++;
        });
    }
    //updateCurrentWeekTeamData(); //call it once right now just for testing in console

    //function to reset allTeamData
    function resetAllTeamData(){
        allTeamData = [];

        resetTeamData();
        allTeamData[0]=teamData;
        console.log("reset all the teams data for each week");
        saveDataToStorage('allTeamData', allTeamData);
        allTeamData.forEach(teamData=>{
            console.log(teamData);
        });
    }



    //------------------------------end of expiremental team data section------------------------------------------------------
  
    //updates the teamData based on what is now in the website
    function updateTeamDataFromTable() {
      var rows = $("#leaderboardTableBody").find("tr");
      for (var i = 0; i < rows.length; i++) {
        var cells = $(rows[i]).find("td");
        
        teamData[i].wins = parseInt($(cells[2]).text());
        teamData[i].losses = parseInt($(cells[3]).text());
        teamData[i].pointsAllowed = parseInt($(cells[4]).text());
      }
      saveDataToStorage('teamData', teamData); // Save updated data to local storage
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
      saveDataToStorage('teamData', teamData); // Save updated data to local storage
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

    //calc the rank change compared to the week before
    function calcRankChange() {
        const thisWeekData = teamData;
        const prevWeekData = allTeamData[activeWeek - 2] || preSznData;
        
        console.log(activeWeek);
        // Find the change in rank between this week and last week and assign it to that team in 'teamData'
        for (var i = 0; i < thisWeekData.length; i++) {
            for (var j = 0; j < prevWeekData.length; j++) {
                if (thisWeekData[i].name == prevWeekData[j].name) {
                    var rChange = -1*(i - j);
                    console.log(thisWeekData[i].name + " - " + prevWeekData[j].name + " - " + i + " " + j + " - " + rChange);
                    for (var z = 0; z < teamData.length; z++) {
                        if (thisWeekData[i].name == teamData[z].name) {
                            teamData[z].rankChange = rChange;
                        }
                    }
                }
            }
        }
    }
  
    // Function to update the leaderboard table
    function updateLeaderboard() {
        var leaderboardTableBody = $("#leaderboardTableBody");
        leaderboardTableBody.empty();

        cWeekData = allTeamData[activeWeek-1];  //current week selected by the user; it's teamData
        
        // console.log("active week: "+activeWeek +"\ncurrent week's data: "); //---------testing to make sure cWeek is the current selected week
        // console.log(cWeekData);
        // console.log("Team data: ");
        // console.log(teamData);

        for (var i = 0; i < cWeekData.length; i++) {
            var row = $("<tr>");
            var rankChangeDisplay = cWeekData[i].rankChange;
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
            var teamName = cWeekData[i].name;
            logoImg.attr("src", "images/Logos/" + teamName + ".png"); // Set src attribute of the image
            logoImg.attr("alt", cWeekData[i].name); // Set alt attribute of the image
            
            // Add CSS styling to set the size of the logo image
            logoImg.css({"width": "38px", "height": "auto"}); // Adjust width as per your requirement
            
            // Prepend the logo image to the team name <td>
            teamNameCell.append(logoImg);

            // Add team name after the logo
            teamNameCell.append(document.createTextNode(" " + cWeekData[i].name));

            // Append the modified <td> to the row
            row.append(teamNameCell);

            row.append($("<td>").text(cWeekData[i].wins));
            row.append($("<td>").text(cWeekData[i].losses));
            row.append($("<td>").text(cWeekData[i].pointsAllowed));
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
    const weekBoard = document.getElementById('week-board');
    const checkBox = document.getElementById('new-week-check');
    const aCheckBox = document.querySelector('#new-week-check input#weekCheckBox');
  
    //-----------------------------------Week Data---------------
    //saving and adding
  
    // Function to add a new week button
    function addWeekButton(){
      //get the right weekPointer, even after website refresh, and increment it
      weekPointer = weekData.length;
      weekPointer++;
      saveDataToStorage('weekPointer', weekPointer);
  
      const weekButton = document.createElement('button');
      weekButton.classList.add('blue-btn', 'not-active');
      weekButton.textContent = 'Week ' + weekPointer;
      weekBoard.appendChild(weekButton);
      
      // Add the new week button to weekData
      weekData.push('Week ' + weekPointer);
      
      // Save weekData to localStorage
      saveDataToStorage('weekData', weekData); // Save updated data to local storage
    };
  
  // Load existing week buttons from weekData
  function loadWeekButtons(){
    // Clear existing week buttons
    while (weekBoard.firstChild) {
      weekBoard.removeChild(weekBoard.firstChild);
    }
    
    // Add new week buttons from weekData
    weekData.forEach(week => {
        const weekButton = document.createElement('button');
        weekButton.classList.add('blue-btn', 'not-active');
        weekButton.textContent = week;
    
        if(week == "Week "+weekPointer){ //make sure new week is active
            weekButton.classList.remove("not-active");
            weekButton.classList.add("active");
            activeWeek = weekPointer;
        }
        weekBoard.appendChild(weekButton);
        });
    };
  
    loadWeekButtons();
  
    // Function to reset week buttons
    function resetWeekButtons(){
        // Remove all child elements from the week board except the first one - Week 1
        while (weekBoard.children.length > 1) {
            weekBoard.removeChild(weekBoard.lastChild);
        }
        weekPointer = 1;
        activeWeek = 1;

        // Make the first week button active if it is not already
        const firstButton = document.querySelector('#week-board button:first-child');
        if (firstButton) {
            firstButton.classList.remove('not-active');
            firstButton.classList.add('active');
        }

        // Update weekData to only account for the current buttons that exist (which should only be the first button with text - content "Week 1")
        weekData = ['Week 1'];

        // Save weekData to localStorage
        saveDataToStorage('weekData', weekData);
    };
  
    //-----------------------------------ACTION LISTENERS for the different buttons to do with standings--------------------------------------------
    centerConfirmationBox();
  
    //save button
    saveButton.addEventListener('click', function() {
        saveButton.style.display = 'none';
        resetButton.style.display = 'none';
        editButton.style.display = 'flex';
        checkBox.style.display='none';
    
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
    
        //add a week button for the week
        if(aCheckBox.checked){
            addWeekButton();
            loadWeekButtons();
        }

        aCheckBox.checked = false;
    
        //save the weekPointer
        saveDataToStorage('weekPointer', weekPointer);
    
        checkInputPositive();
    
        //update and sort the table
        updateTeamDataFromTable();
        insertionSort();
        //make sure rank change is compared to the prior week
        calcRankChange();
        //teamData[0].rankChange = 20;

        updateCurrentWeekTeamData();
        updateLeaderboard();
    });
  
    editButton.addEventListener('click', function() {
        //make sure that the last button is clicked in the week board to only edit the most recent week
        const buttons = weekBoard.querySelectorAll('button');
        const lastButton = buttons[buttons.length - 1];
        lastButton.click();

        //only show proper buttons to stop possible errors from occuring
        editButton.style.display = 'none';
        resetButton.style.display = 'flex';
        saveButton.style.display = 'flex';
        checkBox.style.display='flex';
        console.log("editing");
    
        //get the weekPointer from storage
        // Retrieve weekPointer from local storage
        const storedWeekPointer = localStorage.getItem('weekPointer');
    
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
  
    //validation method to check if a cells value is positive
    function checkPositive(cellVal) {
        if (cellVal < 0) {
            cellVal = 0;
        }
        return cellVal;
    }
  
    //this checks that all the PA input are positive and if not they are set to 0
    function checkInputPositive() {
        const rows = leaderboardTableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const lastCell = row.querySelector('td:last-child');
            if (lastCell.textContent < 0) {
            lastCell.textContent = 0;
            }
        });
    }
    //---------------------------------------week board action listener--------------------------
    // Event listener for buttons within the week board
    weekBoard.addEventListener('click', function(event) {
        // validate user is not changing week while editing the current data
        if (saveButton.style.display === 'flex') {
            // If the save is displayed, return without performing any action
            alert("Cannot change week while editing.");
            return;
        }
        const clickedButton = event.target;
    
        // Check if the clicked element is a button
        if (clickedButton.tagName === 'BUTTON') {
            // Extract the week number from the text content of the clicked button
            const weekText = clickedButton.textContent.trim(); // Trim to remove leading/trailing spaces
            const weekNumber = parseInt(weekText.split(' ')[1]); // Split text by space and extract the second part as the week number
    
            // Assign the week number to the activeWeek variable
            activeWeek = weekNumber;
    
            // Log the active week number
            console.log("Active Week:", activeWeek);
    
            // Add 'active' class to the clicked button
            clickedButton.classList.add("active");
    
            // Remove 'not-active' class from the clicked button
            clickedButton.classList.remove('not-active');
    
            // Remove 'active' class from all other buttons
            const buttons = weekBoard.querySelectorAll('button');
            buttons.forEach(button => {
                if (button !== clickedButton) {
                    button.classList.remove('active');
                    button.classList.add('not-active');
                }
            });

            //----------IMPORTANT: have the board display the correspond teamData in allTeamData for at activeWeek
            updateLeaderboard();
        }
    });
    
  
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
      checkBox.style.display='none';
    });
  
    //yes button on confirmation box
    yesResetButton.addEventListener('click', function() {
      //stop showing clear data and submit btn, show edit btn
      saveButton.style.display = 'none';
      resetButton.style.display = 'none';
      editButton.style.display = 'flex';
      checkBox.style.display='none';
  
      resetWeekButtons();
  
      resetAllTeamData();
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
  
  
  