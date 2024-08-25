import { Component, createSignal } from "solid-js";
import styles from '../styles/Content.module.css';
import { Button } from "./ui/button";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  audio_bytes: string;
}

const Content: Component = () => {
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
    <div class="w-full bg-[#e9e9e9] py-2.5 min-h-[calc(100vh-60px)]">
    <div class="flex flex-col items-center max-w-[1200px] mx-auto px-5">
      <Button class="bg-[#3498db] text-white border-none py-2.5 px-5 text-base cursor-pointer rounded transition-colors duration-300 ease-in-out hover:bg-[#2980b9] mb-5" onClick={getSong}>
        Get song
      </Button>
      {song() && (
        <div class="bg-white p-5 rounded-lg shadow-md mt-5 w-full text-left">
          <h1 class="text-[#2c3e50] text-4xl mb-2.5">{song()!.title}</h1>
          <p class="my-2.5 text-lg">Artist: {song()!.artist}</p>
          <p class="my-2.5 text-lg">Album: {song()!.album}</p>
          {audioUrl() && <audio class="w-full mt-5" src={audioUrl()!} controls />}
        </div>
      )}
      {error()[0] && (
        <p class="bg-[#e74c3c] text-white p-2.5 rounded mt-5">
          An error occurred: {error()[0]} - {error()[1]}
        </p>
      )}
    </div>
  </div>
  )

}

export default Content;