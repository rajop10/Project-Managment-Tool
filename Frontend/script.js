// Check authentication
if (!localStorage.getItem('isLoggedIn')) {
  window.location.href = 'login.html';
}

let selectedProjectId = null;

// Fetch and render all projects
async function loadProjects() {
  const res = await fetch('/api/projects');
  const projects = await res.json();

  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';

  projects.forEach(project => {
    const li = document.createElement('li');
    li.textContent = project.name;
    li.onclick = () => selectProject(project);
    projectList.appendChild(li);
  });
}

// Select a project and load its tasks
function selectProject(project) {
  selectedProjectId = project.id;
  document.getElementById('current-project-title').innerText = `📌 ${project.name}`;
  loadTasks();
}

// Fetch and render tasks for selected project
async function loadTasks() {
  if (!selectedProjectId) return;

  const res = await fetch('/api/tasks');
  const allTasks = await res.json();

  const taskList = document.getElementById('task-list');
  const filter = document.getElementById('filter-status').value;

  const filteredTasks = allTasks.filter(task => {
    return task.projectId === selectedProjectId && 
      (filter === 'all' || task.status === filter);
  });

  taskList.innerHTML = '';
  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.name} (${task.status})`;
    taskList.appendChild(li);
  });
}

// Submit new project
document.getElementById('project-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('project-name').value;
  const description = document.getElementById('project-desc').value;

  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description })
  });

  const project = await res.json();
  selectedProjectId = project.id;
  document.getElementById('project-name').value = '';
  document.getElementById('project-desc').value = '';
  loadProjects();
});

// Submit new task
document.getElementById('task-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('task-name').value;
  const status = document.getElementById('task-status').value;

  if (!selectedProjectId) {
    alert('Please select a project first!');
    return;
  }

  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, status, projectId: selectedProjectId })
  });

  document.getElementById('task-name').value = '';
  document.getElementById('task-status').value = 'todo';
  loadTasks();
});

// Filter change
document.getElementById('filter-status').addEventListener('change', loadTasks);

// Initial load
window.onload = () => {
  loadProjects();
};