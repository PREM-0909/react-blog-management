import conf from "../conf/conf";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImg, status, userID }) {
        try {
            return await this.databases.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImg,
                    status,
                    userID
                }
            })
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, { title, content, featuredImg, status }) {
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImg,
                    status,
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async deletePosy(slug) {
        try {
            await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            })
            return true
        } catch (error) {
            console.log(error)
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries: queries
            })
        } catch (error) {
            console.log(error)
        }
    }

    // file upload services ---:

    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file: file
            })
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async deleteFile(FileID) {
        try {
            return await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: FileID
            })
        } catch (error) {
            console.log(error)
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
        } catch (error) {

        }
    }
}