"use client";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function UserList() {
  const { isLoading, error, data } = useQuery("user", () =>
    axios.get("/api/user").then((res) => res.data),
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data.users.map((item: any) => {
        return (
          <ul key={item.id}>
            <li>
              {item.id} | {item.phone}
            </li>
          </ul>
        );
      })}
    </div>
  );
}
