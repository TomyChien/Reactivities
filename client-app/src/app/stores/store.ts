import { createContext,useContext } from "react";
import ActivityStore from "./activityStore";
import TitleStore from "./tilteStore";

interface Store {
    titleStore: TitleStore
    activityStore: ActivityStore
}

export const store: Store = {
    titleStore: new TitleStore(),
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}