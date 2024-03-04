// Dark Theme
import "./style.css";
const icon = document.getElementById("icon");
const imgdark = $(".image");
const logodark = $(".logo");
const logo2dark = $(".logo2");
const logo3dark = $(".logo3");

icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  imgdark.classList.toggle("image-dark");
  logodark.classList.toggle("logo-dark");
  logo2dark.classList.toggle("logo-dark");
  logo3dark.classList.toggle("logo-dark");

  if (document.body.classList.contains("dark-theme")) icon.src = "sun.png";
  else icon.src = "moon.png";
};
function $(selector) {
  return document.querySelector(selector);
}
function createTeamRequest(team) {
  fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  });
}

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
  const table = $("#teamsTable tbody");
  table.innerHTML = getTeams(teams).join("");
}

function getFormValues() {
  return {
    promotion: $("input[name=promotion]").value,
    members: $("input[name=members]").value,
    name: $("input[name=name]").value,
    url: $("input[name=url]").value
  };
}
function onSubmit(e) {
  e.preventDefault();
  let team = getFormValues();
  createTeamRequest(team);
  window.location.reload();
}
function initEvents() {
  $("#teamsForm").addEventListener("submit", onSubmit);
}
initEvents();
loadTeams();
