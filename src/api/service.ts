import axios, { AxiosResponse } from 'axios';

// interfaces
import { PostPayload } from '../models/index';

const endPoint = "https://jsonplaceholder.typicode.com"

export const getPostsAPI = async (page: number = 1, limit: number = 10, sort: string = 'title', order: string = 'asc'): Promise<AxiosResponse<PostPayload[]>> => {
    const url = `${endPoint}/posts?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    const response = await axios.get<PostPayload[]>(url);
    return response;
}




export const postAPI = async (payload: PostPayload) => {
    const url = `${endPoint}/posts`;
    const response = await axios.post(url, payload);
    return response;
}

export const putAPI = async (payload: PostPayload) => {
    const url = `${endPoint}/posts/${payload.id}`;
    const response = await axios.put(url, payload);
    return response;
}


export const deletePostAPI = async (id: number) => {
    const url = `${endPoint}/posts/${id}`;
    const response = await axios.delete(url);
    return response;
}