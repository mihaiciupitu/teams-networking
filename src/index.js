// Dark Theme
import "./style.css";
const icon = document.getElementById("icon");
const imgdark = $(".image");
const logodark = $(".logo");
const logo2dark = $(".logo2");
const logo3dark = $(".logo3");
let allTeams = [];
let editId;
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

function deleteTeamRequest(id) {
  fetch("http://localhost:3000/teams-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id })
  });
}

function updateTeamRequest(team) {
  fetch("http://localhost:3000/teams-json/update", {
    method: "PUT",
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
      allTeams = teams;
      showTeams(teams);
      return teams;
    });
}
function getTeams(teams) {
  return teams.map(
    team => `<tr>  
  <td>${team.promotion}</td> 
  <td>${team.members}</td> 
  <td>${team.name}</td> 
  <td><a href="${team.url}" target="_blank" >  ${team.url} </a></td>
  <td>
      <a href="#" data-id='${team.id}'class = "delete-btn"> X </a>  
      <a href="#" data-id='${team.id}'class="edit-btn" > &#9998 </a>
  </td> 
  </tr>`
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
function setFormValues(team) {
  $("input[name=promotion]").value = team.promotion;
  $("input[name=members]").value = team.members;
  $("input[name=name]").value = team.name;
  $("input[name=url]").value = team.url;
}
function onSubmit(e) {
  e.preventDefault();
  let team = getFormValues();
  if (editId) {
    team.id = editId;
    updateTeamRequest(team);
  } else {
    createTeamRequest(team);
  }

  window.location.reload();
}
function startEdit(teams, id) {
  editId = id;
  const team = teams.find(team => {
    return id === team.id;
  });

  setFormValues(team);
}
function initEvents() {
  $("#teamsForm").addEventListener("submit", onSubmit);
  $("#teamsTable tbody").addEventListener("click", e => {
    if (e.target.matches("a.delete-btn")) {
      const id = e.target.dataset.id;
      deleteTeamRequest(id);
      window.location.reload();
    } else if (e.target.matches("a.edit-btn")) {
      e.preventDefault();
      const id = e.target.dataset.id;
      startEdit(allTeams, id);
    }
  });
}

initEvents();
loadTeams();
