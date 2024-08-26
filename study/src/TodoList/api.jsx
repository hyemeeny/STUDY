// 데이터 조회하기
export const getTodoList = async () => {
  return fetch('/todos')
    .then(response => {
      if (!response.ok) {
        throw new Error('데이터를 조회하는데 실패했습니다.');
      }
      return response.json();
    })
    .catch(error => console.error(error));
};

// 데이터 생성하기
export const postTodoList = async title => {
  return fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('데이터를 생성하는데 실패했습니다.');
      }
      return response.json();
    })
    .catch(error => console.error(error));
};

// 데이터 수정하기
export const patchTodoList = async (id, title) => {
  return fetch(`/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('데이터를 수정하는데 실패했습니다.');
      }
      return response.json();
    })
    .catch(error => console.error(error));
};
