const resources = [
  { name: "Ambulance", priority: "critical", total: 12, used: 9, assigned: "Flood Zone A" },
  { name: "Medical Kits", priority: "critical", total: 50, used: 40, assigned: "Relief Camp 2" },
  { name: "Fire Engines", priority: "high", total: 6, used: 3, assigned: "Industrial Area" },
  { name: "Rescue Boats", priority: "high", total: 10, used: 9, assigned: "River Sector 3" },
  { name: "Search & Rescue Teams", priority: "high", total: 15, used: 6, assigned: "Urban Zone B" },
  { name: "Food Supply Trucks", priority: "medium", total: 20, used: 5, assigned: "-" },
  { name: "Temporary Shelters", priority: "medium", total: 30, used: 12, assigned: "Evacuation Camp" }
];

const table = document.getElementById("resourceTable");
const logList = document.getElementById("logList");
const lastUpdated = document.getElementById("lastUpdated");

function render() {
  table.innerHTML = "";

  resources.forEach((r, i) => {
    const available = r.total - r.used;
    const util = Math.round((r.used / r.total) * 100);

    let status = "Healthy", cls = "status-green";
    if (util > 70) { status = "Critical"; cls = "status-red"; }
    else if (util > 40) { status = "Stressed"; cls = "status-yellow"; }

    table.innerHTML += `
      <tr>
        <td>${r.name}</td>
        <td><span class="badge ${r.priority}">${r.priority.toUpperCase()}</span></td>
        <td>${available}</td>
        <td>${r.used}</td>
        <td>
          ${util}%
          <div class="bar">
            <div class="fill" style="width:${util}%;background:${util>70?'#ef4444':util>40?'#facc15':'#22c55e'}"></div>
          </div>
        </td>
        <td class="${cls}">${status}</td>
        <td>${r.assigned}</td>
        <td>
          <button onclick="assign(${i})">Assign</button>
          <button class="release" onclick="releaseRes(${i})">Release</button>
        </td>
      </tr>
    `;
  });

  lastUpdated.textContent = new Date().toLocaleString();
}

function log(msg) {
  const li = document.createElement("li");
  li.textContent = `${new Date().toLocaleTimeString()} – ${msg}`;
  logList.prepend(li);
}

function assign(i) {
  if (resources[i].used < resources[i].total) {
    resources[i].used++;
    resources[i].assigned = "Emergency Zone";
    log(`${resources[i].name} assigned`);
    render();
  }
}

function releaseRes(i) {
  if (resources[i].used > 0) {
    resources[i].used--;
    resources[i].assigned = "-";
    log(`${resources[i].name} released`);
    render();
  }
}

render();
setInterval(render, 10000);
