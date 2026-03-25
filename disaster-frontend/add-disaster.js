// JS Array to store disaster records
const disasters = [];

// Elements
const disasterForm = document.getElementById('disasterForm');
const disasterType = document.getElementById('disasterType');
const otherType = document.getElementById('otherType');
const severity = document.getElementById('severity');
const severityIndicator = document.getElementById('severityIndicator');
const disasterIdInput = document.getElementById('disasterId');
const reportTimeInput = document.getElementById('reportTime');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('successMsg');

// Auto-generate Disaster ID & Timestamp
function generateDisasterId() {
  const randomNum = String(Math.floor(Math.random() * 100000)).padStart(5,'0');
  const year = new Date().getFullYear();
  return `DR-${year}-${randomNum}`;
}

function updateTimestamp() {
  const now = new Date();
  reportTimeInput.value = now.toLocaleString();
}

disasterIdInput.value = generateDisasterId();
updateTimestamp();

// Show/hide "Other" field
disasterType.addEventListener('change', () => {
  if(disasterType.value === 'Other') {
    otherType.style.display = 'block';
    otherType.required = true;
  } else {
    otherType.style.display = 'none';
    otherType.required = false;
    otherType.value = '';
  }
});

// Severity color indicator
severity.addEventListener('change', () => {
  const value = severity.value;
  if(value === 'Low') severityIndicator.style.backgroundColor = 'green';
  else if(value === 'Medium') severityIndicator.style.backgroundColor = 'orange';
  else if(value === 'High') severityIndicator.style.backgroundColor = 'red';
  else severityIndicator.style.backgroundColor = 'transparent';
});

// Form submission
disasterForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple validation
  let valid = true;
  const fields = [
    {el: disasterType, err: 'disasterTypeError'},
    {el: severity, err: 'severityError'},
    {el: document.getElementById('location'), err: 'locationError'},
    {el: document.getElementById('date'), err: 'dateError'},
    {el: document.getElementById('description'), err: 'descriptionError'}
  ];

  fields.forEach(f => {
    const errorEl = document.getElementById(f.err);
    if(!f.el.value) {
      errorEl.textContent = 'This field is required';
      valid = false;
    } else {
      errorEl.textContent = '';
    }
  });

  if(disasterType.value === 'Other' && !otherType.value) {
    document.getElementById('disasterTypeError').textContent = 'Please specify disaster type';
    valid = false;
  }

  if(!valid) return;

  // Disable button & show submitting
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  // Store data
  const disasterRecord = {
    id: disasterIdInput.value,
    type: disasterType.value === 'Other' ? otherType.value : disasterType.value,
    severity: severity.value,
    location: document.getElementById('location').value,
    date: document.getElementById('date').value,
    description: document.getElementById('description').value,
    authority: document.getElementById('authority').value,
    timestamp: reportTimeInput.value
  };

  disasters.push(disasterRecord);

  // Show success
  successMsg.style.display = 'block';
  setTimeout(() => successMsg.style.display = 'none', 4000);

  // Reset form
  disasterForm.reset();
  disasterIdInput.value = generateDisasterId();
  updateTimestamp();
  severityIndicator.style.backgroundColor = 'transparent';
  submitBtn.disabled = false;
  submitBtn.textContent = 'Submit';
});
