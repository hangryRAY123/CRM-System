const baseURL = 'https://easydev.club/api/v1/';

export const fetchTasks = async () => {
  const response = await fetch(baseURL + 'todos?filter={all}');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(response.message || 'Failed to fetch tasks.');
  }

  return resData.data;
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
