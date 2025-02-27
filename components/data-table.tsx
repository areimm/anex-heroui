"use client";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "@heroui/react";
import { Textarea } from "@heroui/react";
import { ScrollShadow } from "@heroui/scroll-shadow";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  User,
} from "@heroui/react";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
}

export default function DataTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rowsPerPage = 10;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const pages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="dark w-full h-full p-3 rounded-lg overflow-auto">
      <div className="flex flex-col md:flex-row gap-4 mb-4 bg-anex-bg rounded-lg">
        <Input
          classNames={{ inputWrapper: "bg-anex-side" }}
          isClearable
          placeholder="Search by name..."
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={setFilterValue}
          className="flex-1"
        />
        <DateRangePicker
          classNames={{ inputWrapper: "bg-anex-side" }}
          labelPlacement="outside"
          className="dark max-w-xs flex-1"
        />
        <Button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-950 flex-1 h-full">
          Search
        </Button>
      </div>
      <Table
        classNames={{ wrapper: "bg-anex-bg", th: "bg-anex-side" }}
        isStriped
        aria-label="User Data Table"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>USERNAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => handleRowClick(user)}
              className="cursor-pointer"
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: `https://i.pravatar.cc/150?u=${user.id}`,
                  }}
                  name={user.name}
                  description={user.email}
                />
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <span className="text-default-400 text-small">
          Total {filteredUsers.length} users
        </span>
        <Pagination
          initialPage={0}
          isCompact
          showControls
          showShadow
          color="default"
          page={pages}
          total={pages}
          onChange={setPage}
        />
      </div>

      {/* Modal */}
        <Modal
          backdrop="blur"
          className="dark text-white"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <ModalContent>
            <ModalHeader>User Details</ModalHeader>
            <ModalBody>
              {selectedUser && (
                <div className="flex flex-col gap-2">
                  <Input label="Name" value={selectedUser.name} readOnly />
                  <Input
                    label="Username"
                    value={selectedUser.username}
                    readOnly
                  />
                  <Input label="Email" value={selectedUser.email} readOnly />
                  <Input label="Phone" value={selectedUser.phone} readOnly />
                  <Input
                    label="Website"
                    value={selectedUser.website}
                    readOnly
                  />
                  <Textarea
                    label="Address"
                    value={
                      selectedUser.address.city +
                      +selectedUser.address.street +
                      selectedUser.address.suite +
                      selectedUser.address.zipcode
                    }
                    readOnly
                  />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                color="danger"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </div>
  );
}
