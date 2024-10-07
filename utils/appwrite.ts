import { Client, Databases, Account } from "appwrite";

class AppwriteService {
  public account: Account;
  public databases: Databases;

  constructor() {
    const config = useRuntimeConfig();
    const client = new Client();
    client
      .setEndpoint(
        config.public.appwriteEndpoint ?? "https://cloud.appwrite.io/v1",
      )
      .setProject(config.public.appwriteProjectId);

    this.account = new Account(client);
    this.databases = new Databases(client);
  }

  // async getFile(bucketId, fileId) {
  //   return await this.storage.getFileDownload(bucketId, fileId);
  // }
}

export default AppwriteService;
