export class User {
    _id?: string; // MongoDB ObjectId, usually optional because it will be generated on the server side
    username: string;
    password: string;
  
    constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
    }
  }
  