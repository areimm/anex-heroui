"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Image, Input } from "@heroui/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();

    // Giriş bilgilerini kontrol et
    if (email === "test@gmail.com" && password === "12345") {
      localStorage.setItem("isLoggedIn", "true");
      console.log("Login Successful");
      router.push("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2a0845] to-[#6441A5] text-white">
      <div className="bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image
            src="/anex.png"
            alt="Logo"
            width={100}
            height={40}
            className="h-16 w-auto"
          />
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Input
              label="Email"
              type="email"
              isRequired
              errorMessage="Please enter a valid email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Password"
              type="password"
              isRequired
              errorMessage="Please enter a valid password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" type="submit" variant="bordered">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
