

const calendar = document.querySelector('.calendar');
const prevBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const monthYearDisplay = document.querySelector('.monthYearDisplay');
const calendarDates = document.getElementById('calendarDates');
const clockDisplay = document.getElementById('clockDisplay');

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();

const updateCalendar = () => {
  let firstDay = new Date(currentYear, currentMonth, 1);
  let startingDay = firstDay.getDay();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  let date = 1;

  monthYearDisplay.innerHTML = `${months[currentMonth]} ${currentYear}`;
  
  let rows = [];
  let cells = [];

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < startingDay) {
        cells.push('');
      } else if (date > daysInMonth) {
        cells.push('');
      } else {
        cells.push(date);
        date += 1;
      }
    }
    rows.push(cells);
    cells = [];
  }

  calendarDates.innerHTML = '';
  for (let i = 0; i < rows.length; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement('td');
      if (rows[i][j] === currentDay && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
        cell.style.backgroundColor = '#0a595c';
        
      }
      cell.innerHTML = rows[i][j];
      row.appendChild(cell);
    }
    calendarDates.appendChild(row);
  }
};

prevBtn.addEventListener('click', () => {
  currentMonth -= 1;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  }
  updateCalendar();
});

nextBtn.addEventListener('click', () => {
  currentMonth += 1;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }
  updateCalendar();
});

const updateClock = () => {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  clockDisplay.innerHTML = `${hours}:${minutes}`;
};

setInterval(updateClock, 1000);
updateCalendar();


let taskListDisplay = document.getElementById("task-list-display");
let saveTaskBtn = document.getElementById("save-task");
let taskTitleInput = document.getElementById("input-task-title");
let taskNameInput = document.getElementById("input-task-name");
let taskDateInput = document.getElementById("task-date");
let taskTimeInput = document.getElementById("task-time");

let tasks = [];

const displayTasks = (dayTasks) => {
  taskListDisplay.innerHTML = "";
  dayTasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `<span class="task-title">${task.title}</span>  <strong class="task-date">${task.date}</strong>  
    <time class="task-time">${task.time}</time>  <p class="task-text">${task.name}</p>`;
    taskListDisplay.appendChild(li);
  });
};

const saveTask = () => {
  let taskTitle = taskTitleInput.value;
  let taskName = taskNameInput.value;
  let taskDate = taskDateInput.value;
  let taskTime = taskTimeInput.value;

  if (!taskName ||  !taskName || !taskDate || !taskTime) {
    return;
  }

  let task = {title: taskTitle, name: taskName, date: taskDate, time: taskTime };
  tasks.push(task);
  taskTitleInput.value = "";
  taskNameInput.value = "";
  taskDateInput.value = "";
  taskTimeInput.value = "";
  displayTasks(tasks);
};

saveTaskBtn.addEventListener("click", saveTask);




