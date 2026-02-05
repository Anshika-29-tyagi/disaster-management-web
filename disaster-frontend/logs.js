
document.addEventListener("DOMContentLoaded", () => {

  const logs = [
    {
      date: "31 Jan 2026",
      action: "Disaster Reported",
      by: "Admin",
      remarks: "Flood reported in Delhi",
      type: "report"
    },
    {
      date: "30 Jan 2026",
      action: "Status Updated",
      by: "Officer",
      remarks: "Fire controlled in Mumbai",
      type: "update"
    },
    {
      date: "29 Jan 2026",
      action: "Resources Allocated",
      by: "Control Room",
      remarks: "Medical teams deployed to Chennai",
      type: "resource"
    }
  ];

  const actionBadge = (type) => {
    if (type === "report") return "danger";
    if (type === "update") return "warning";
    if (type === "resource") return "success";
    return "secondary";
  };

  const tableBody = document.getElementById("logsTableBody");

  logs.forEach(log => {
    const row = `
      <tr class="log-row">
        <td>${log.date}</td>
        <td>
          <span class="badge bg-${actionBadge(log.type)} badge-action">
            ${log.action}
          </span>
        </td>
        <td class="log-user">
          <i class="bi bi-person-circle me-1"></i>${log.by}
        </td>
        <td>${log.remarks}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
});
