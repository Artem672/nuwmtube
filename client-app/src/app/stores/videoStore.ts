import {makeAutoObservable} from "mobx";
import {Video} from "../models/video";
import agent from "../api/agent";

export default class VideoStore {
    videoRegistry = new Map<string, Video>();
    selectedVideo: Video | undefined = undefined;
    loading = false;
    searchText: string = '';

    constructor() {
        makeAutoObservable(this)
    }

    get videosByDate() {
        return Array.from(this.videoRegistry.values()).sort((a, b) =>
            b.date.getTime() - a.date.getTime())
    }

    loadVideos = async () => {
        this.setLoading(true);
        try {
            this.videoRegistry.clear();
            const videos = await agent.Videos.list();
            videos.forEach(video => {
                this.setRegistryVideo(video);
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
            const video = await agent.Videos.details(id);
            this.setVideo(video);
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
                this.setRegistryVideo(video);
            });
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    private setRegistryVideo = (video: Video) => {
        video.date = new Date(video.date);
        this.videoRegistry.set(video.id, video);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setVideo = (video: Video) => {
        this.selectedVideo = video;
    }

    setSearchText = (text: string) => {
        this.searchText = text;
    }
}