let currentDisasters = [];

console.log("Dashboard JS Loaded");

async function loadDashboard() {

  try {

    const response = await fetch(
      "http://localhost:5000/api/dashboard"
    );

    const data = await response.json();

    currentDisasters = data.disasters;

    document.getElementById("totalDisasters").innerText =
      data.total;

    document.getElementById("activeDisasters").innerText =
      data.active;

    document.getElementById("resolvedDisasters").innerText =
      data.resolved;

    document.getElementById("resourcesUsed").innerText =
      data.resourcesUsed;

    const tableBody =
      document.getElementById("disasterTableBody");

    tableBody.innerHTML = "";

    data.disasters.forEach(d => {

      tableBody.innerHTML += `
        <tr>
          <td>${d.disasterId}</td>
          <td>${d.type}</td>
          <td>${d.severity}</td>
          <td>${d.location}</td>
          <td>${d.status}</td>
          <td>

            <button
              class="btn btn-sm btn-outline-primary me-2"
              onclick="viewDetails('${d.disasterId}')">
              View
            </button>

            <button
              class="btn btn-sm btn-outline-success"
              onclick="updateStatus('${d._id}')">
              Update Status
            </button>

          </td>
        </tr>
      `;

    });

  } catch (error) {

    console.error(error);

  }

}

loadDashboard();

async function updateStatus(id) {

  try {

    const response = await fetch(
      `http://localhost:5000/api/disasters/${id}`,
      {
        method: "PUT"
      }
    );

    const data = await response.json();

    if (response.ok) {

      alert("Status Updated Successfully");

      loadDashboard();

    } else {

      alert(data.message || "Failed to update status");

    }

  } catch (err) {

    console.error(err);

    alert("Server Error");

  }

}

function viewDetails(id) {

  const disaster = currentDisasters.find(
    d => d.disasterId === id
  );

  if (!disaster) {

    alert("Disaster not found");

    return;

  }

  alert(
`Disaster ID: ${disaster.disasterId}

Type: ${disaster.type}

Severity: ${disaster.severity}

Location: ${disaster.location}

Status: ${disaster.status}

Date: ${disaster.date || "N/A"}

Authority: ${disaster.authority || "N/A"}

Description: ${disaster.description || "N/A"}`
  );

}