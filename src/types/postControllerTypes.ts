import {Posts} from "../models/Posts";

export interface CreatePostRequest {
    title: string;
    description: string;
    images: string[];
}

export interface CreatePostResponse {
    post: Posts
}


export interface UpdatePostRequest {
    _id: number;
    title: string;
    images: string[];
    description: string;
    archive: boolean;
}

export interface UpdatePostResponse {
    post: Posts
}


export interface DeletePostRequest {
    _id: number;
}

export interface DeletePostResponse {
    message: string;
}


export interface GetPostsRequest {
    page: number;
    limit: number;
    s: string;
}

export interface GetPostsResponse {
    posts: Posts[];
    _meta: _meta;
}

export interface _meta {
    totalPages: number;
    count: number;
    page: number;
}
