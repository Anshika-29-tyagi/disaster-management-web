console.log("Dashboard JS Loaded");

const disasters = [
  { id: "DM101", type: "Flood", severity: "High", location: "Delhi", status: "In Progress" },
  { id: "DM102", type: "Fire", severity: "Medium", location: "Mumbai", status: "Reported" },
  { id: "DM103", type: "Earthquake", severity: "Low", location: "Chennai", status: "Resolved" }
];

// 🔢 CARDS
document.getElementById("totalDisasters").innerText = disasters.length;
document.getElementById("activeDisasters").innerText =
  disasters.filter(d => d.status !== "Resolved").length;
document.getElementById("resolvedDisasters").innerText =
  disasters.filter(d => d.status === "Resolved").length;
document.getElementById("resourcesUsed").innerText = 14;

// 📋 TABLE
const tableBody = document.getElementById("disasterTableBody");

disasters.forEach(d => {
  tableBody.innerHTML += `
    <tr>
      <td>${d.id}</td>
      <td>${d.type}</td>
      <td>
        <span class="badge ${
          d.severity === "High" ? "bg-danger" :
          d.severity === "Medium" ? "bg-warning" : "bg-success"
        }">${d.severity}</span>
      </td>
      <td>${d.location}</td>
      <td>
        <span class="badge ${
          d.status === "Resolved" ? "bg-success" :
          d.status === "In Progress" ? "bg-warning" : "bg-primary"
        }">${d.status}</span>
      </td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-2"
          onclick="viewDetails('${d.id}')">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-sm btn-outline-success"
          onclick="updateStatus('${d.id}')">
          <i class="bi bi-arrow-repeat"></i>
        </button>
      </td>
    </tr>
  `;
});

function viewDetails(id) {
  alert("Viewing details for " + id);
}
