import * as grpc from '@grpc/grpc-js';
import {ServiceError, sendUnaryData, ServerUnaryCall} from '@grpc/grpc-js';


import {Posts} from "../models/Posts";
import {AppDataSource} from '../data-source'

import {
    CreatePostRequest,
    CreatePostResponse,
    DeletePostRequest,
    DeletePostResponse,
    GetPostsRequest,
    GetPostsResponse,
    UpdatePostRequest,
    UpdatePostResponse,
} from "../types/postControllerTypes";

import {ObjectId} from 'mongodb';

export default {
    async createPost({request: req}: ServerUnaryCall<CreatePostRequest, CreatePostResponse>, res: sendUnaryData<CreatePostResponse>) {
        try {
            const posts = AppDataSource.getRepository(Posts);

            const post = posts.create({
                title: req.title,
                images: req.images,
                description: req.description,
            });

            await posts.save(post);

            res(null, {post});
        } catch (e) {
            console.error(e);
            res(e as ServiceError);
        }
    },

    async updatePost({request: req}: ServerUnaryCall<UpdatePostRequest, UpdatePostResponse>, res: sendUnaryData<UpdatePostResponse>) {
        try {
            const posts = AppDataSource.getRepository(Posts);
            let post = await posts.findOne({where: {_id: new ObjectId(req._id)}});

            if (!post) {
                return res({code: grpc.status.NOT_FOUND, message: 'Post not found'});
            }

            Object.assign(post, {
                title: req.title,
                images: req.images,
                archive: req.archive,
                description: req.description,
            });

            await posts.save(post);

            res(null, {post});
        } catch (e) {
            console.error(e);
            res(e as ServiceError);
        }
    },

    async deletePost({request: req}: ServerUnaryCall<DeletePostRequest, DeletePostResponse>, res: sendUnaryData<DeletePostResponse>) {
        try {
            const posts = AppDataSource.getRepository(Posts);
            let post = await posts.findOne({where: {_id: new ObjectId(req._id)}});

            if (!post) {
                return res({code: grpc.status.NOT_FOUND, message: 'Post not found'});
            }

            await posts.delete(new ObjectId(req._id));

            res(null, {
                message: 'deleted'
            });
        } catch (e) {
            console.error(e);
            res(e as ServiceError);
        }
    },

    async getPosts({request: req}: ServerUnaryCall<GetPostsRequest, GetPostsResponse>, res: sendUnaryData<GetPostsResponse>) {
        try {
            const posts = AppDataSource.getRepository(Posts);
            const skip = (req.limit * req.page) - req.limit;

            const list = await posts.find({
                where: {
                    archive: false,
                },
                take: req.limit,
                skip
            })

            console.log(list)
            res(null, )
        } catch (e) {
            console.error(e);
            res(e as ServiceError);
        }
    },
};
