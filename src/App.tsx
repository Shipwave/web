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
  const [audioUrl, setAudioUrl] = createSignal<string | null>(null);

  const getSong = async () => {
    try {
      const response = await fetch("http://localhost:3000/song/1")
      const json = await response.json()
      setSong(json);
      playAudio(song()!.audio_bytes)
    } catch (e: any) {
      if (e instanceof Error)
        setError([e.message, e.name])
    }
  }

  const playAudio = (base64Audio: string) => {
    const byteCharacters = atob(base64Audio);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'audio/mp3' });
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };


  return (
    <>
      <Navbar />
      <div class={styles.container}>
        <div class={styles.content}>
          <button class={styles.getSong} onClick={getSong}>Get song</button>
          {song() && (
            <div class={styles.info}>
              <h1 class={styles.title}>{song()!.title}</h1>
              <p class={styles.detail}>Artist: {song()!.artist}</p>
              <p class={styles.detail}>Album: {song()!.album}</p>
              {audioUrl() && <audio class={styles.player} src={audioUrl()!} controls />}
            </div>
          )}
          {error()[0] && (
            <p class={styles.error}>An error occurred: {error()[0]} - {error()[1]}</p>
          )}
        </div>
      </div>

    </>
  );
};

export default App;