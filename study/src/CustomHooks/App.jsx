import { useFetch } from './useFetch';
// import { useInput } from './useInput';

// function displayMessage(messaga) {
//   alert(messaga);
// }

const baseUrl = 'https://jsonplaceholder.typicode.com';

function App() {
  const { data: userData } = useFetch(baseUrl, 'users');
  const { data: postData } = useFetch(baseUrl, 'posts');

  // const [inputValue, handleChange, handleSubmit] = useInput('', displayMessage);

  return (
    <div>
      {/* <h1>useFetch</h1>
      <button onClick={() => fetchUrl('users')}>Users</button>
      <button onClick={() => fetchUrl('posts')}>Posts</button>
      <button onClick={() => fetchUrl('todos')}>Todos</button> */}

      <h1>User</h1>
      {userData && <pre>{JSON.stringify(userData[0], null, 2)}</pre>}
      <h1>Post</h1>
      {postData && <pre>{JSON.stringify(postData[0], null, 2)}</pre>}

      {/* <h1>useInput</h1>
      <input value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>확인</button> */}
    </div>
  );
}

export default App;
