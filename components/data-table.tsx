"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
} from "@heroui/react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default function DataTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="w-full p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Input
          type="text"
          placeholder="Full Name / Per Number"
          className="flex-grow p-2 bg-gray-800 text-white border border-gray-600 rounded-md"
        />
        {/* <Pop /> */}
        <Button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Search
        </Button>
      </div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>USERNAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
        </TableHeader>
        <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
