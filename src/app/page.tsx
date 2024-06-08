import axios from "axios"
import { useEffect, useState } from "react";
import "reflect-metadata";

interface User {
  id: number;
  name: string;
  email: string;
}

interface HomeProps {
  users: User[];
}

export default async function Home() {

  const {data}  = await axios.get<User[]>("http://localhost:3000/api/users");

  return (
    <div>
      <ul>
        {data.map(user => {
          return  <li key={user.id}>
                    <strong>{user.name}</strong>: {user.email},
                  </li>
        })}
      </ul>
    </div>
  )
}
