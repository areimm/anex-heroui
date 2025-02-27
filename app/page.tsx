"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Divider, Image, Input } from "@heroui/react";
import { Tabs, Tab } from "@heroui/tabs";

export default function Auth() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === "test@gmail.com" && loginPassword === "12345") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register Successful");
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#a61a1e] to-[#2e3192] px-4 ">
      {/* Beyaz kutu (kart) */}
      <div
        className="
          bg-white text-black rounded-lg shadow-lg p-8 w-full max-w-lg
          min-h-[400px] transition-all duration-300
        "
      >
        {/* Logo */}
        <div className="flex justify-center mb-2">
          <Image
            src="/anex.png"
            alt="Logo"
            width={150}
            height={60}
            className="h-16 w-auto"
          />
        </div>

        {/* İnce bir çizgi (Divider) - logonun hemen altında */}
        <Divider className="w-48 mx-auto mb-3" />

        {/* Login/Register Tabs - Divider altında, tam genişlikte */}
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as "login" | "register")}
          aria-label="Login or Register"
          className="w-full"
          fullWidth
        >
          {/* LOGIN TAB */}
          <Tab title="Login" key="login">
            <form
              onSubmit={handleLogin}
              className="flex flex-col space-y-4 mt-4"
            >
              <Input
                label="Email"
                size="sm"
                type="email"
                isRequired
                errorMessage="Please enter a valid email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <Input
                label="Password"
                size="sm"
                type="password"
                isRequired
                errorMessage="Please enter a valid password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="bordered"
                className="w-full rounded-lg"
              >
                Login
              </Button>
            </form>
          </Tab>

          {/* REGISTER TAB */}
          <Tab title="Register" key="register">
            <form
              onSubmit={handleRegister}
              className="flex flex-col space-y-4 mt-4"
            >
              <Input
                label="Username"
                size="sm"
                type="text"
                isRequired
                errorMessage="Please enter a valid username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
              <Input
                label="Email"
                size="sm"
                type="email"
                isRequired
                errorMessage="Please enter a valid email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <Input
                label="Password"
                size="sm"
                type="password"
                isRequired
                errorMessage="Please enter a valid password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <Button
                type="submit"
                variant="bordered"
                className="w-full rounded-lg"
              >
                Register
              </Button>
            </form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
