const baseURL = 'https://easydev.club/api/v1/';

export const updateTask = async (isDone, id, title) => {
  const response = await fetch(baseURL + `todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isDone, title }),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(response.message || 'Failed to update task. Please try again later.');
  }

  return resData.message;
};

export const deleteTask = async (taskId) => {
  const response = await fetch(baseURL + `todos/${taskId}`, {
    method: 'DELETE',
  });

  const resData = await response.text();

  if (!response.ok) {
    throw new Error(resData || 'Failed to delete task. Please try again later.');
  }

  return resData;
};

export const fetchTasks = async (tab = 'all') => {
  const response = await fetch(baseURL + `todos?filter=${tab}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(response.message || 'Failed to fetch tasks.');
  }

  return resData;
};

export const addingTask = async (title) => {
  const response = await fetch(baseURL + 'todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isDone: false, title }),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(response.message || 'Failed to add task. Please try again later.');
  }

  return resData.message;
};
