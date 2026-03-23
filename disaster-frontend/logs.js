document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("logsTableBody");

  async function fetchLogs() {
    try {
      const res = await fetch(`http://localhost:5000/api/logs`);
      let logs = await res.json();

      tableBody.innerHTML = ""; 
      logs.sort((a, b) => new Date(b.date) - new Date(a.date));

      logs.forEach(log => {
        const action = log.action ? log.action.toUpperCase() : "ACTIVITY";
        let badgeClass = "bg-secondary"; 
        if (action === "ASSIGN") badgeClass = "bg-success";   
        if (action === "RELEASE") badgeClass = "bg-warning"; 

        // FORCE CORRECT REMARKS: If remarks are missing, build them from resource + action
        const resourceName = log.resource || "Resource";
        const displayRemarks = log.remarks || 
          `${resourceName} ${action === "RELEASE" ? "released to standby" : "dispatched to site"}`;

        const row = `
          <tr>
            <td>
              ${new Date(log.date).toLocaleDateString()}<br>
              <small class="text-muted">${new Date(log.date).toLocaleTimeString()}</small>
            </td>
            <td><span class="badge ${badgeClass}">${action}</span></td>
            <td>${log.performedBy || 'Admin'}</td>
            <td>${displayRemarks}</td>
          </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  }
  fetchLogs();
});