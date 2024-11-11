async function fetchTasks() {
    try {
        const response = await fetch('/myTask');
        const tasks = await response.json();
        tasks.forEach(task => {
            addTaskToUI(task.description, task.date, task.id);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}
export{fetchTasks}