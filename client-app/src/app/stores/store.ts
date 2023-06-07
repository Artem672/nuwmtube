import VideoStore from "./videoStore";
import {createContext, useContext} from "react";

interface Store {
    videoStore: VideoStore
}

export const store: Store = {
    videoStore: new VideoStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}