import {User, UserFormValues} from "../models/user";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {store} from "./store";
import {router} from "../router/Routes";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (credentials: UserFormValues) => {
        try {
            const user = await agent.Account.login(credentials);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/videos')
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    register = async (credentials: UserFormValues) => {
        try {
            const user = await agent.Account.register(credentials);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/videos')
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    setImage = (image: string) => {
        if (this.user) this.user.image = image;

    }

}