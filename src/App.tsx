import { createSignal, type Component } from 'solid-js';

import styles from './App.module.css';
import Navbar from './components/Navbar';

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  audio_bytes: string;
}

const App: Component = () => {
  const [song, setSong] = createSignal<Song | null>(null);
  const [error, setError] = createSignal<string[]>(["", ""]);


  const getSong = async () => {
    try {
      const response = await fetch("http://localhost:3000/song/1")
      const json = await response.json()
      console.log(response, json)
      setSong(json);
    } catch (e: any) {
      if (e instanceof Error)
        setError([e.message, e.name])
    }
  }

  return (
    <>
      <Navbar />
      <button class={styles.button} onClick={getSong}>Fetchsong from "/"</button>
      <button onClick={getSong}>Get song</button>
      {song() &&
        <div>
          <h1>{song()!.title}</h1>
          <p>Artist: {song()!.artist}</p>
          <p>Album: {song()!.album}</p>
        </div>
      }

      {error()[0] && (
        <p>An error occurred: {error()[0]} - {error()[1]}</p>
      )}
    </>
  );
};

export default App;
