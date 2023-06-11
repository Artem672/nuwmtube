import VideoStore from "./videoStore";
import {createContext, useContext} from "react";
import CommonStore from "./commonStore";

interface Store {
    videoStore: VideoStore;
    commonStore: CommonStore;
}

export const store: Store = {
    videoStore: new VideoStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}