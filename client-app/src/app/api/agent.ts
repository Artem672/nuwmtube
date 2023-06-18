import axios, {AxiosError, AxiosResponse} from "axios";
import {Video} from "../models/video";
import {toast} from "react-toastify";
import '../router/Routes'
import {router} from "../router/Routes";
import {store} from "../stores/store";
import {User, UserFormValues} from "../models/user";
import {Photo, Profile} from "../models/profile";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    if( process.env.NODE_ENV === 'development') {
        await sleep(1000);
    }
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found')
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error')
            break;
        default:
            break;
    }
    return Promise.reject(error);
})
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Videos = {
    list: () => request.get<Video[]>('/videos'),
    search: (searchText: string) => request.get<Video[]>(`/videos/search?searchText=${searchText}`),
    details: (id: string) => request.get<Video>(`/videos/${id}`),
}

const Account = {
    current: () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post<User>('/account/login', user),
    register: (user: UserFormValues) => request.post<User>('/account/register', user)
}

const Profiles = {
    get: (username: string) => request.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('/media/photo', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    uploadVideo: (name: string, file: Blob) => {
        let formData = new FormData();
        formData.append('VideoName', name);
        formData.append('File', file);
        return axios.post<Video>('/media/video', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },
    deleteVideo: (id: string) => request.delete(`/media/video/${id}`),
    setMainPhoto: (id: string) => request.post(`/media/photo/${id}/setMain`, {}),
    deletePhoto: (id: string) => request.delete(`/media/photo/${id}`),
    updateFollowing: (username: string) => request.post(`/follow/${username}`, {}),
    listFollowings: (username: string, predicate: string) =>
        request.get<Profile[]>(`/follow/${username}?predicate=${predicate}`)
}

const agent = {
    Videos,
    Account,
    Profiles
}

export default agent;