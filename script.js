let selectedProject = null;
let projects = JSON.parse(localStorage.getItem('projects')) || {};

const projectForm = document.getElementById('project-form');
const taskForm = document.getElementById('task-form');
const projectList = document.getElementById('project-list');
const taskList = document.getElementById('task-list');
const currentProjectTitle = document.getElementById('current-project-title');
const filterStatus = document.getElementById('filter-status');

function saveProjects() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

projectForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('project-name').value.trim();
  const desc = document.getElementById('project-desc').value.trim();
  if (!name || projects[name]) return;

  projects[name] = { description: desc, tasks: [] };
  saveProjects();
  renderProjects();
  projectForm.reset();
});

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('task-name').value.trim();
  const status = document.getElementById('task-status').value;
  if (!name || !selectedProject) return;

  projects[selectedProject].tasks.push({ name, status });
  saveProjects();
  renderTasks();
  taskForm.reset();
});

function selectProject(name) {
  selectedProject = name;
  currentProjectTitle.textContent = `📌 Working on: ${name}`;
  renderTasks();
}

function deleteProject(name) {
  if (confirm(`Delete project '${name}' and its tasks?`)) {
    delete projects[name];
    if (selectedProject === name) selectedProject = null;
    saveProjects();
    renderProjects();
    renderTasks();
    currentProjectTitle.textContent = '📌 No project selected';
  }
}

function deleteTask(index) {
  if (!selectedProject) return;
  projects[selectedProject].tasks.splice(index, 1);
  saveProjects();
  renderTasks();
}

function renderProjects() {
  projectList.innerHTML = '';
  Object.keys(projects).forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.className = 'list-item-btn';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteProject(name);
    };

    li.appendChild(delBtn);
    li.onclick = () => selectProject(name);
    projectList.appendChild(li);
  });
}

function renderTasks() {
  taskList.innerHTML = '';
  if (!selectedProject) return;

  const statusFilter = filterStatus.value;
  projects[selectedProject].tasks.forEach((task, index) => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return;

    const li = document.createElement('li');
    li.textContent = `${task.name} - ${task.status}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = '🗑️';
    delBtn.className = 'list-item-btn';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

filterStatus.addEventListener('change', renderTasks);

renderProjects();
renderTasks();