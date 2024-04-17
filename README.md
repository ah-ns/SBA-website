# SBA-Automated-Weekly-Standings

**General Description:**
I built this website using HTML, CSS, and JavaScript (including the library JQuery) to make a standings automator for a basketball league that I am in.<br />

**Loyola Swimmer's Basketball Association (SBA)**: is a league comprised of male swimmers on the Loyola University Maryland NCAA Swimming and Diving team. This year the league consisted of 11 teams. Each week the teams play each other, concreting their rankings going into the playoff tournament at the end of the season.<br />

**Website Features:**<br />
The website features a simple UI for our leagues commissioner to easily keep track of games and access an accurate ranking of our leagues teams.<br />
a)Edit the current weeks statistics with up and down arrows for the wins/losses, and an input field for the points against (validated)<br />
b)Finalize a weeks statistics once all games have been played, subsequently creating a new week button for the following week.<br />
c)Access weekly rankings/statistics for each team in an organized and easy to navigate fasion<br />
d)See the individual team's rank change from the week prior (For week 1, it compares it to the pre-season rankings, which are in var preSzn and set by me in the        JS code)<br />
e)All data is saved and drawn from localStorage, allowing users to refresh and comeback to page at later dates with the correct data from their computer<br />
f)The option to reset all the data, this features implements a pop-up to confirm the users actions<br/>
g)Display the teams, and their projected rankings from pre-season below the standings<br />


**Ranking System:**<br />
a) Win Percentage<br />
b) Tie-breakers:<br />
  i)Team with more wins<br />
  ii)Team with LESS points against<br />