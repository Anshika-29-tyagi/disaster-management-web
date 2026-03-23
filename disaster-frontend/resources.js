const API = "http://localhost:5000/api/resources";

const table = document.getElementById("resourceTable");
const logList = document.getElementById("logList");
const lastUpdated = document.getElementById("lastUpdated");

let resources = [];


// LOAD RESOURCES
async function loadResources() {
    try {
        const res = await fetch(API);
        // Remove 'const' here so it updates the global 'let resources' variable
        resources = await res.json(); 
        renderTable(resources);
        if (lastUpdated) lastUpdated.innerText = new Date().toLocaleString();
    } catch (err) {
        console.error("Failed to load resources:", err);
    }
}


// LOAD LOGS
async function loadLogs(){

  if(!logList) return;

  // const res = await fetch(`${API}/logs`);
  const res = await fetch(`http://localhost:5000/api/logs`);
  const logs = await res.json();

  logList.innerHTML="";

  logs.forEach(l=>{
    const li = document.createElement("li");
    // li.innerText = `${new Date(l.time).toLocaleTimeString()} - ${l.message}`;
    li.innerText = `${new Date(l.date).toLocaleTimeString()} - ${l.action} - ${l.resource}`;
    logList.appendChild(li);
  });

}


// RENDER TABLE
// RENDER TABLE
function renderTable(data) {
    if (!table) return;
    table.innerHTML = "";
    data.forEach(r => {
        const name = r.name || "Unknown Resource";
        const available = r.total - r.used;
        const utilization = Math.round((r.used / r.total) * 100) || 0;

        // --- THE DASH FIX ---
        // If 'used' is 0, ALWAYS show a dash. 
        // If backend sends an empty string or null, show a dash.
       const displayLocation = r.assignedTo && r.assignedTo !== "" 
    ? r.assignedTo 
    : (r.landmark || "-")

        let status = "Healthy";
        let statusClass = "text-success";
        if (utilization >= 90) { status = "Critical"; statusClass = "text-danger"; }
        else if (utilization >= 70) { status = "Stressed"; statusClass = "text-warning"; }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${name}</strong></td>
            <td><span class="badge-priority ${r.priority}">${r.priority}</span></td>
            <td>${available}</td>
            <td>${r.used}</td>
            <td>
                <div class="d-flex align-items-center">
                    <span class="me-2">${utilization}%</span>
                    <div class="progress w-100" style="height: 6px;">
                        <div class="progress-bar ${utilization >= 90 ? 'bg-danger' : utilization >= 70 ? 'bg-warning' : 'bg-primary'}" 
                             style="width:${utilization}%"></div>
                    </div>
                </div>
            </td>
            <td class="${statusClass}"><strong>${status}</strong></td>
            <td>${displayLocation}</td> <td>
                <button class="assignBtn btn btn-sm btn-success" data-id="${r._id}">Assign</button>
                <button class="releaseBtn btn btn-sm btn-warning" data-id="${r._id}">Release</button>
            </td>
        `;
        table.appendChild(row);
    });
}
// function renderTable(data) {
//     if (!table) return;
//     table.innerHTML = "";
//     data.forEach(r => {
//         const name = r.name || "Unknown Resource";
//         const available = r.total - r.used;
        
//         // FIX: Calculate utilization if the backend doesn't send it
//         const utilization = Math.round((r.used / r.total) * 100) || 0;

//         // Professional Status Logic
//         let status = "Healthy";
//         let statusClass = "text-success";
//         if (utilization >= 90) { status = "Critical"; statusClass = "text-danger"; }
//         else if (utilization >= 70) { status = "Stressed"; statusClass = "text-warning"; }

//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td><strong>${name}</strong></td>
//             <td><span class="badge-priority ${r.priority}">${r.priority}</span></td>
//             <td>${available}</td>
//             <td>${r.used}</td>
//             <td>
//                 <div class="d-flex align-items-center">
//                     <span class="me-2">${utilization}%</span>
//                     <div class="progress w-100" style="height: 6px;">
//                         <div class="progress-bar ${utilization >= 90 ? 'bg-danger' : utilization >= 70 ? 'bg-warning' : 'bg-primary'}" 
//                              style="width:${utilization}%"></div>
//                     </div>
//                 </div>
//             </td>
//             <td class="${statusClass}"><strong>${status}</strong></td>
//             <td>${r.assignedTo || "-"}</td>
//             <td>
//                 <button class="assignBtn btn btn-sm btn-success" data-id="${r._id}">Assign</button>
//                 <button class="releaseBtn btn btn-sm btn-warning" data-id="${r._id}">Release</button>
//             </td>
//         `;
//         table.appendChild(row);
//     });
// }


// BUTTON EVENTS
// --- UPDATED BUTTON EVENTS ---
if (table) {
    table.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        const isAssign = e.target.classList.contains("assignBtn");
        const isRelease = e.target.classList.contains("releaseBtn");

        if (isAssign || isRelease) {
            try {
                // 1. Find the resource to get its default landmark
                const resource = resources.find(r => r._id === id);
                const action = isAssign ? "assign" : "release";
                
                // 2. Logic: 
                // Assign -> Show "Disaster Site"
                // Release -> Show the specific landmark (e.g., "AIIMS" or "Taj Mahal")
                const newLocation = isAssign ? "Disaster Site" : (resource.landmark || "Base Station");

                // 3. PUT request to update the database
                await fetch(`${API}/${id}/${action}`, { 
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ assignedTo: newLocation }) 
                });

                await loadResources(); 
            } catch (err) {
                console.error(`Error during ${action}:`, err);
            }
        }
    });
}
loadResources();
setInterval(loadResources, 5000);