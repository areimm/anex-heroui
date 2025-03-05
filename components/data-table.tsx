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
import { PhoneIcon } from "lucide-react";

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
      {/* Tablo Alanı */}
        <Table
          classNames={{
            // wrapper: "bg-anex-side/20 backdrop-blur-lg",
            th: "bg-anex-bg/80 text-gray-300 text-sm font-semibold ",
            td: "group-data-[hover=true]:bg-anex-primary/10 transition-colors",
            tr: "hover:bg-anex-primary/5",
          }}
          removeWrapper
          isHeaderSticky
          aria-label="User Data Table"
        >
          <TableHeader className="">
            <TableColumn className="py-5 text-center">ID</TableColumn>
            <TableColumn className="py-5 pl-6">USER</TableColumn>
            <TableColumn className="py-5">USERNAME</TableColumn>
            <TableColumn className="py-5">EMAIL</TableColumn>
            <TableColumn className="py-5">WEBSITE</TableColumn>
            <TableColumn className="py-5 pr-6">PHONE</TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleRowClick(user)}
                className="cursor-pointer border-b border-anex-primary/10 last:border-0"
              >
                <TableCell className="text-center">
                  <span className="bg-anex-primary/10 text-anex-primary px-3 py-1 rounded-full text-xs font-medium">
                    #{user.id}
                  </span>
                </TableCell>
                <TableCell>
                  <User
                    avatarProps={{
                      size: "sm",
                      radius: "lg",
                      src: `https://i.pravatar.cc/150?u=${user.id}`,
                      className: "ring-2 ring-anex-primary/50",
                    }}
                    name={
                      <span className="text-gray-200 font-medium">
                        {user.name}
                      </span>
                    }
                    description={
                      <span className="text-gray-400 text-xs">
                        {user.email}
                      </span>
                    }
                  />
                </TableCell>
                <TableCell>
                  <span className="text-gray-300 font-mono">
                    @{user.username}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-400 hover:text-anex-primary transition-colors">
                    {user.email}
                  </span>
                </TableCell>
                <TableCell>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    className="text-anex-primary hover:text-anex-accent flex items-center gap-1"
                  >
                    {user.website}
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-gray-400">
                    <PhoneIcon className="w-4 h-4 shrink-0" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      {/* Pagination ve Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-anex-bg/50 rounded-xl backdrop-blur-lg border border-anex-primary/20 mt-2">
        <span className="text-gray-400 text-sm mb-2 md:mb-0">
          Showing {paginatedUsers.length} of {filteredUsers.length} users
        </span>
        <Pagination
          classNames={{
            item: "bg-transparent text-gray-400",
            cursor: "bg-anex-primary/20 text-anex-primary",
            prev: "hover:bg-anex-primary/10",
            next: "hover:bg-anex-primary/10",
          }}
          isCompact
          showControls
          total={pages}
          initialPage={1}
          page={page}
          onChange={setPage}
        />
      </div>

      {/* Modal (Düzenlenmiş versiyon) */}
      <Modal
        backdrop="blur"
        className="dark text-white"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent className="bg-anex-bg border border-anex-primary/20">
          <ModalHeader className="border-b border-anex-primary/20 text-xl font-bold">
            User Profile
          </ModalHeader>
          <ModalBody className="space-y-4 py-6">
            {selectedUser && (
              <>
                <User
                  avatarProps={{
                    size: "lg",
                    src: `https://i.pravatar.cc/150?u=${selectedUser.id}`,
                    className: "ring-4 ring-anex-primary/30",
                  }}
                  name={
                    <h3 className="text-2xl font-bold text-gray-200">
                      {selectedUser.name}
                    </h3>
                  }
                  description={
                    <p className="text-anex-primary mt-1">
                      @{selectedUser.username}
                    </p>
                  }
                  className="flex flex-col items-center text-center mb-6"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    value={selectedUser.email}
                    readOnly
                    variant="bordered"
                    classNames={{
                      inputWrapper: "border border-anex-primary/20",
                      label: "text-gray-400",
                    }}
                  />
                  <Input
                    label="Username"
                    value={selectedUser.username}
                    readOnly
                    variant="bordered"
                    classNames={{
                      inputWrapper: "border border-anex-primary/20",
                      label: "text-gray-400",
                    }}
                  />
                  <Input
                    label="Phone"
                    value={selectedUser.phone}
                    readOnly
                    variant="bordered"
                    classNames={{
                      inputWrapper: "border border-anex-primary/20",
                      label: "text-gray-400",
                    }}
                  />
                  <Input
                    label="Website"
                    value={selectedUser.website}
                    readOnly
                    variant="bordered"
                    classNames={{
                      inputWrapper: "border border-anex-primary/20",
                      label: "text-gray-400",
                    }}
                  />

                  <Textarea
                    label="Address"
                    value={`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}, ${selectedUser.address.zipcode}`}
                    readOnly
                    variant="bordered"
                    className="col-span-2"
                    classNames={{
                      inputWrapper: "border border-anex-primary/20",
                      label: "text-gray-400",
                    }}
                  />
                </div>
              </>
            )}
          </ModalBody>
          <ModalFooter className="border-t border-anex-primary/20">
            <Button
              className="bg-anex-primary/20 text-anex-primary hover:bg-anex-primary/30"
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
