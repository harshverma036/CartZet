import bcrypt from "bcryptjs";

const Users = [
  {
    name: "Admin User",
    email: "admin@cartzet.com",
    password: bcrypt.hashSync("admin@12345", 10),
    isAdmin: true,
  },
  {
    name: "Harsh Verma",
    email: "harsh@cartzet.com",
    password: bcrypt.hashSync("harsh@12345", 10),
  },
];

export default Users;
