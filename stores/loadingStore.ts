import { makeAutoObservable } from "mobx";

class LoadingStore {
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }
}

const loadingStore = new LoadingStore();
export default loadingStore;
