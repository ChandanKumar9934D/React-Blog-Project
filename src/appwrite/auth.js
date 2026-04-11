import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      // .setEndpoint(conf.appwriteUrl)
      // .setProject(conf.appwriteProjectId);
 .setEndpoint("https://cloud.appwrite.io/v1") // ✅ FIXED
  .setProject("69ceddd0001817717ea0");
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        email: email,
        password: password,
        name: name,
      });
      if (user) {
        return this.login({ email, password });
      } else {
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const result = await this.account.createEmailPasswordSession({
        email,
        password,
      });
      //   return result
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // console.log("Appwrite service :: getCurrentUser :: error ", error);
    }
    return null;
  }
  async logout(){
    try {
        await this.account.deleteSessions()
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);

        
    }
  }
}
const authService = new AuthService();
export default authService;
