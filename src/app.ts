import path from 'path';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import {HealthImplementation} from 'grpc-health-check';
import PostsHandler from './handlers/PostsHandler';

import './data-source'

Date.prototype.toString = Date.prototype.toISOString;

const port = process.env.PORT || 4000;

const packageDefinition = protoLoader.loadSync(
    path.resolve('./protos/posts.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    },
);


const {posts} = grpc.loadPackageDefinition(packageDefinition) as any;

const server = new grpc.Server();

server.addService(posts.Posts.service, PostsHandler);

const healthImpl = new HealthImplementation({'': 'SERVING'});
healthImpl.addToServer(server);

server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`0.0.0.0:${port}: service-posts started`);
});
