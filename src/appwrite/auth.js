import confi from "../confi/confi";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
                .setEndpoint(confi.appwriteUrl)
                .setProject(confi.appwriteProjectId); 
        this.account = new Account(this.client);
    }

    async createAccount({email , password , name}){
        // console.log(email);
        // console.log(password);
        // console.log(name);
        try {
            const userAccount = await this.account.create(ID.unique(), email , password ,name)
            if (userAccount) {
                console.log(email);
                console.log(password);
                return await this.account.createEmailSession(email , password);

            } else {
                return userAccount;
            }
        } catch (err) {
            console.log(err);
            console.log("Appwrite :: auth.js : createAcctount");
            // throw err;
        }
    }

    async login({email , password}){
        // eslint-disable-next-line no-useless-catch
        try {
            console.log("Email in login section ",email);
            console.log("password in login section ",password);
            return await this.account.createEmailSession(email , password);
        } catch (error) {
            console.log("Appwrite :: auth.js : login");
            // throw error;
        }
    }

    async getCurrentUser(){
        // eslint-disable-next-line no-useless-catch
        try {
            // console.log("This account is" , (await this.account.get()).$id);
            return await this.account.get(); 
        } catch (error) {
            console.log("Appwrite :: auth.js : getCurrentUser");
            // throw error;
        }
        return null;
    }

    async logout(){
        // eslint-disable-next-line no-useless-catch
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite :: auth.js : logout");
            // throw error;
        }   
    }

}

const authService = new AuthService();

export default authService