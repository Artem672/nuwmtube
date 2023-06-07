import {makeAutoObservable} from "mobx";
import {Video} from "../models/video";
import agent from "../api/agent";

export default class VideoStore {
    videoRegistry = new Map<string, Video>();
    selectedVideo: Video | undefined = undefined;
    loading = true;

    constructor() {
        makeAutoObservable(this)
    }

    get videosByDate() {
        return Array.from(this.videoRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date))
    }

    loadVideos = async () => {
        this.setLoading(true);
        try {
            this.videoRegistry.clear();
            const videos = await agent.Videos.list();
            videos.forEach(video => {
                video.date = video.date.split('T')[0];
                this.videoRegistry.set(video.id, video);
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    loadVideo = async (id: string) => {
        this.setLoading(true);
        try {
            this.setLoading(false);
        } catch (error) {
            this.setLoading(false);
        }
    }

    searchVideos = async (searchText: string) => {
        this.setLoading(true);
        try {
            this.videoRegistry.clear();
            const videos = await agent.Videos.search(searchText);
            videos.forEach(video => {
                video.date = video.date.split('T')[0];
                this.videoRegistry.set(video.id, video);
            });
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    selectVideo = (id: string) => {
        this.selectedVideo = this.videoRegistry.get(id);
    }
}