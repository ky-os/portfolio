import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://appwrite.ky-os.dev/v1')
    .setProject('6929fc350016ae4aea64');

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
