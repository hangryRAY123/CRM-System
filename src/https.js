const baseURL = 'https://easydev.club/api/v1/';

export const updateTask = async (isDone, id, title) => {
  try {
    const response = await fetch(baseURL + `todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isDone, title }),
    });

    if (!response.ok) {
      throw new Error(response.statusText || 'Failed to update task. Please try again later.');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to update task. Please try again later.');
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(baseURL + `todos/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(response.statusText || 'Failed to delete task. Please try again later.');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to delete task. Please try again later.');
  }
};

export const fetchTasks = async (tab = 'all') => {
  try {
    const response = await fetch(baseURL + `todos?filter=${tab}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText || 'Failed to fetch tasks.');
    }

    return resData;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch tasks. Please try again later.');
  }
};

export const addingTask = async (title) => {
  try {
    const response = await fetch(baseURL + 'todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isDone: false, title }),
    });

    if (!response.ok) {
      throw new Error(response.statusText || 'Failed to add task. Please try again later.');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to add task. Please try again later.');
  }
};
