import React, {useEffect, useState} from 'react';
import {Video} from "../models/video";
import axios from "axios";
import {Container, List} from "semantic-ui-react";
import NavBar from "./NavBar";
import './Grid.css'
import VideoDashboard from "../../features/videos/dashboard/VideoDashboard";

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(undefined)
  const [searchText, setSearchText] = useState<string>("")

  useEffect(() => {
    axios.get<Video[]>('http://localhost:5000/api/videos').then(response => {
      setVideos(response.data);
    })
  }, [])

  function handleSelectedVideo(id: string) {
      setSelectedVideo(videos.find(x => x.id === id));
  }

  function handleSearch(text: string) {
      setSearchText(text);
      axios.get<Video[]>('http://localhost:5000/api/Videos/search?searchText=' + text).then(response => {
          setVideos(response.data);
      })
  }

  return (
    <div className="App">
        <NavBar setSearchText={handleSearch}/>
        <Container style={{marginTop: '7em'}}>
            <VideoDashboard
                videos={videos}
                selectedVideo={selectedVideo}
                selectVideo={handleSelectedVideo}
            ></VideoDashboard>
        </Container>
    </div>
  );
}

export default App;
