// Dark Theme
import "./style.css";
const icon = document.getElementById("icon");
const imgdark = document.querySelector(".image");
const logodark = document.querySelector(".logo");
const logo2dark = document.querySelector(".logo2");
const logo3dark = document.querySelector(".logo3");

icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  imgdark.classList.toggle("image-dark");
  logodark.classList.toggle("logo-dark");
  logo2dark.classList.toggle("logo-dark");
  logo3dark.classList.toggle("logo-dark");

  if (document.body.classList.contains("dark-theme")) icon.src = "sun.png";
  else icon.src = "moon.png";
};

function loadTeams() {
  const promise = fetch("http://localhost:3000/teams-json")
    .then(r => r.json())
    .then(teams => {
      showTeams(teams);
    });
}
function getTeams(teams) {
  return teams.map(
    team => `<tr>  
  <td>${team.promotion}</td> 
  <td>${team.members}</td> 
  <td>${team.name}</td> 
  <td><a href="${team.url}" target="_blank" >  ${team.url} </a></td>
  <td>X</td> </tr>`
  );
}
function showTeams(teams) {
  const table = document.querySelector("#teamsTable tbody");
  table.innerHTML = getTeams(teams).join("");
}

loadTeams();
