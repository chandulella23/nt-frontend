export class User {
 public userName: string;
 public email : string;
 public password : string;
 public role : string;
 public team : string;
 constructor(userName : string,email :string,password:string,role:string,team: string){
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.team = team
 }
 public static create(): User{
 return new User(null,null,null,null,'Media');
 }
}