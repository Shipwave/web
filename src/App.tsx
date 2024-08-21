import { createSignal, type Component } from 'solid-js';

import styles from './App.module.css';

interface JsonRespose {
  body: string;
}

const App: Component = () => {
  const [data, setData] = createSignal<JsonRespose | null>(null);
  const [error, setError] = createSignal<string>("");
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      const json = await response.json();
      setData(json);
    } catch (e: any) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(e);
      }
      console.log(e);
    }
  }

  return (
    <div class={styles.App}>
      <button class={styles.button} onClick={fetchData}>FetchData from "/"</button>
      {data()  &&
        <p>Response data: {data()!.body}</p>
      }
      {error() &&
        <p>An error occured : {error()}</p>
      }
    </div>
  );
};

export default App;
