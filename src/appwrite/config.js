import confi from "../confi/confi";
import { Client, ID , Databases ,Storage , Query } from "appwrite";

export class Service{
    client = new Client;
    databases;
    bucket;
    constructor(){
        this.client
                .setEndpoint(confi.appwriteUrl)
                .setProject(confi.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
        
    }

    async createPost({title ,slug , content , featuredImage , status , userId}){
        console.log();
        // console.log("img hai");
        console.log(title);
        console.log(slug);
        console.log(content);
        console.log(featuredImage);
        console.log(status);
        console.log(userId);
        try {
            return await this.databases.createDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug ,{title, content , featuredImg , status}){
        try {
            return await this.databases.updateDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: UpdatePost");
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: DeletePost");
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite error:: GetPost");
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                confi.appwriteDatabaseId,
                confi.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }



    //File Upload Service

    async uploadFile(file){
        try {
             return await this.bucket.createFile(
                confi.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite:: uploadFile", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                confi.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite:: uploadFile", error);
            return false
        }
    }

    filePreview(fileId){
        return this.bucket.getFilePreview(
            confi.appwriteBucketId,
            fileId // have to chane it with fileId
        )
    }
}

const service = new Service()

export default service