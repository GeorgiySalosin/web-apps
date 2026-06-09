class Task {
    constructor(id, text, completed, date, timestamp) {
        this.id = id;
        this.text = text;
        this.completed = completed;
        this.date = date;
        this.timestamp = timestamp;
    }
}


    //contains task list, active filter, active sort
class TodoModel {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.currentSort = 'date-desc';
        this.loadFromStorage();
    }


    // adds a new task
    addTask(text) {
        const now = new Date();
        const task = new Task(
            Date.now(),
            text,
            false,
            this.formatDate(now),
            now.getTime()
        );
        this.tasks.push(task);
        this.saveToStorage();
        return task;
    }

    // formats date for display view
    formatDate(date) {
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    }

    // removes task by id
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToStorage();
    }


    // removes all tasks
    deleteAllTasks() {
        this.tasks = [];          
        this.saveToStorage();    
    }

    // switches 'completed' property of task
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
        }
    }

    // sort
    getFilteredAndSortedTasks() {
        let filtered = [...this.tasks];

        if (this.currentFilter === 'completed') {
            filtered = filtered.filter(task => task.completed);
        } else if (this.currentFilter === 'active') {
            filtered = filtered.filter(task => !task.completed);
        }

        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'date-asc':
                    return a.timestamp - b.timestamp;
                case 'date-desc':
                    return b.timestamp - a.timestamp;
                case 'name-asc':
                    return a.text.localeCompare(b.text, 'ru');
                case 'name-desc':
                    return b.text.localeCompare(a.text, 'ru');
                default:
                    return 0;
            }
        });

        return filtered;
    }

    // returns 3 numbers corresponding to total task amount, completed tasks, non-completed
    getStats() {
        return {
            total: this.tasks.length,
            completed: this.tasks.filter(t => t.completed).length,
            active: this.tasks.filter(t => !t.completed).length
        };
    }

    // local string storage (5-10 mB)
    saveToStorage() {
        localStorage.setItem('todo_tasks', JSON.stringify(this.tasks));
    }

    // load from local storage by key
    loadFromStorage() {
        const saved = localStorage.getItem('todo_tasks');
        if (saved) {
            this.tasks = JSON.parse(saved);
        } else {
            this.tasks = [];
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
    }

    setSort(sort) {
        this.currentSort = sort;
    }
}


class TodoView {
    constructor() {
        this.todoList = document.getElementById('todoList');
        this.taskInput = document.getElementById('taskInput');
        this.createButton = document.getElementById('createButton');
        this.clearButton = document.getElementById('clearButton');
        this.completedCount = document.getElementById('completedCount');
        this.activeCount = document.getElementById('activeCount');
        this.filterLinks = document.querySelectorAll('.filter-link');
        this.sortButtons = document.querySelectorAll('.sort-btn');
    }


    render(tasks, currentFilter) {
            // clears list
        this.todoList.innerHTML = '';

        if (tasks.length === 0) {
            this.todoList.classList.add('empty');
        } else {
            this.todoList.classList.remove('empty');
        }

        tasks.forEach(task => {
            const li = this.createTaskElement(task);
            this.todoList.appendChild(li);
        });

        this.updatePlaceholder(currentFilter);
    }


    //   create     elem     representation

    createTaskElement(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;

        const label = document.createElement('label');
        label.className = 'MyLabel';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        const allText = document.createElement('span');
        allText.className = 'AllText';

        const taskText = document.createElement('span');
        taskText.className = 'TaskText';
        taskText.textContent = task.text;

        const subTaskText = document.createElement('span');
        subTaskText.className = 'SubTaskText';
        subTaskText.textContent = `от ${task.date}`;

        allText.appendChild(taskText);
        allText.appendChild(subTaskText);
        label.appendChild(checkbox);
        label.appendChild(allText);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'LiButton';
        deleteButton.textContent = '✖';

        li.appendChild(label);
        li.appendChild(deleteButton);

        return li;
    }


    //   update a placeholder that shows up if there's no tasks displayed

    updatePlaceholder(currentFilter) {
        let message = '';
        switch(currentFilter) {
            case 'completed':
                message = 'Нет выполненных дел';
                break;
            case 'active':
                message = 'Нет активных дел';
                break;
            default:
                message = 'Не найдено ни одного дела';
        }
        this.todoList.setAttribute('data-placeholder', message);
    }

    // updates text on done & undone filters
    updateStats(completed, active) {
        this.completedCount.textContent = completed;
        this.activeCount.textContent = active;
    }

    // sets filter button active
    setActiveFilter(filter) {
        this.filterLinks.forEach(link => {
            if (link.dataset.filter === filter) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // sets sort button active
    setActiveSort(sort) {
        this.sortButtons.forEach(btn => {
            if (btn.dataset.sort === sort) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }


    getInputValue() {
        return this.taskInput.value.trim();
    }

    clearInput() {
        this.taskInput.value = '';
    }


    // ==== BINDINGS ==== //

    bindAddTask(handler) {
        this.createButton.addEventListener('click', () => {
            const text = this.getInputValue();
            if (text) {
                handler(text);
                this.clearInput();
            }
        });
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = this.getInputValue();
                if (text) {
                    handler(text);
                    this.clearInput();
                }
            }
        });
    }


    bindDeleteTask(handler) {
        this.todoList.addEventListener('click', (e) => {
            if (e.target.classList.contains('LiButton')) {
                const li = e.target.closest('li');
                if (li) {
                    handler(parseInt(li.dataset.id));
                }
            }
        });
    }


    bindToggleTask(handler) {
        this.todoList.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const li = e.target.closest('li');
                if (li) {
                    handler(parseInt(li.dataset.id));
                }
            }
        });
    }

    bindClearAll(handler) {
        this.clearButton.addEventListener('click', () => {
            handler();   
        });
    }

    bindFilter(handler) {
        this.filterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                handler(link.dataset.filter);
            });
        });
    }

    bindSort(handler) {
        this.sortButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                handler(btn.dataset.sort);
            });
        });
    }
}


class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.view.bindAddTask(this.handleAddTask.bind(this));
        this.view.bindDeleteTask(this.handleDeleteTask.bind(this));
        this.view.bindToggleTask(this.handleToggleTask.bind(this));
        this.view.bindClearAll(this.handleClearAll.bind(this));
        this.view.bindFilter(this.handleFilter.bind(this));
        this.view.bindSort(this.handleSort.bind(this));
        this.updateView();
    }

    handleAddTask(text) {
        this.model.addTask(text);
        this.updateView();
    }

    handleDeleteTask(id) {
        this.model.deleteTask(id);
        this.updateView();
    }

    handleToggleTask(id) {
        this.model.toggleTask(id);
        this.updateView();
    }

    handleClearAll() {
        this.model.deleteAllTasks();
        this.updateView();
    }

    handleFilter(filter) {
        this.model.setFilter(filter);
        this.updateView();
    }

    handleSort(sort) {
        this.model.setSort(sort);
        this.updateView();
    }

    updateView() {
        const tasks = this.model.getFilteredAndSortedTasks();
        const stats = this.model.getStats();
        this.view.render(tasks, this.model.currentFilter);
        this.view.updateStats(stats.completed, stats.active);
        this.view.setActiveFilter(this.model.currentFilter);
        this.view.setActiveSort(this.model.currentSort);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const model = new TodoModel();
    const view = new TodoView();
    new TodoController(model, view);
});