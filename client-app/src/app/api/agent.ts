import axios, {Axios, AxiosResponse} from "axios";
import {Video} from "../models/video";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error1) {
        console.log(error1);
        return Promise.reject(error1);
    }
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
}

const agent = {
    Videos
}

export default agent;