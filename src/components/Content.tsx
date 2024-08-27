import { Component, createSignal } from "solid-js";
import { Button } from "./ui/button";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
}

const Content: Component = () => {
  const [song, setSong] = createSignal<Song | null>(null);
  const [error, setError] = createSignal<string>("");

  const createSong = async () => {
    try {
      const response = await fetch("http://localhost:3000/song/CreateSong", {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      setSong(json);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error creating song: ${error.message}`);
      }
    }
  }

  const getSong = async () => {
    try {
      const response = await fetch("http://localhost:3000/song/GetSong")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setSong(json);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(`Error fetching song: ${error.message}`);
      }
    }
  }

  return (
    <div class="w-full bg-[#e9e9e9] py-2.5 min-h-[calc(100vh-60px)]">
      <div class="flex flex-col items-center max-w-[1200px] mx-auto px-5">
        <div class="row">
          <Button class="mx-5" onClick={createSong}>
            Create Song
          </Button>
          <Button class="mx-5" onClick={getSong}>
            Get song
          </Button>
        </div>
        {song() && (
          <div class="bg-white p-5 rounded-lg shadow-md mt-5 w-full text-left">
            <h1 class="text-[#2c3e50] text-4xl mb-2.5">{song()!.title}</h1>
            <p class="my-2.5 text-lg">Artist: {song()!.artist}</p>
            <p class="my-2.5 text-lg">Album: {song()!.album}</p>
          </div>
        )}
        {error()[0] && (
          <p class="bg-[#e74c3c] text-white p-2.5 rounded mt-5">
            An error occurred: {error()}
          </p>
        )}
      </div>
    </div>
  )

}

export default Content;