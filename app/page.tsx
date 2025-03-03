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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a61a1e] via-[#7a1e4c] to-[#2e3192] animate-gradient-xy px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20 transition-all duration-300 hover:shadow-2xl">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6 space-y-3">
          <Image
            src="/anex.png"
            alt="Logo"
            width={160}
            height={70}
            className="h-14 w-auto transform transition-transform duration-500 hover:scale-105"
          />
          <Divider className="h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent w-3/4" />
        </div>

        {/* Tabs Section */}
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as "login" | "register")}
          aria-label="Auth Tabs"
          className="group"
          fullWidth
        >
          <Tab 
            title={
              <span className={`text-sm font-medium ${activeTab === 'login' ? 'text-white' : 'text-white/60'}`}>
                Login
              </span>
            } 
            key="login"
          >
            <form onSubmit={handleLogin} className="flex flex-col space-y-5 mt-6">
              <Input
                label="Email"
                size="sm"
                type="email"
                isRequired
                radius="sm"
                classNames={{
                  input: "text-white/90",
                  label: "text-white/70",
                  innerWrapper: "bg-white/5",
                  inputWrapper: "bg-white/5 hover:bg-white/10 border-white/20"
                }}
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <Input
                label="Password"
                size="sm"
                type="password"
                isRequired
                radius="sm"
                classNames={{
                  input: "text-white/90",
                  label: "text-white/70",
                  innerWrapper: "bg-white/5",
                  inputWrapper: "bg-white/5 hover:bg-white/10 border-white/20"
                }}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#a61a1e] to-[#2e3192] text-white hover:from-[#c71d22] hover:to-[#3b3fa3] transition-all duration-300 shadow-lg hover:shadow-xl rounded-lg py-3 font-semibold"
              >
                Sign In
              </Button>
            </form>
          </Tab>

          <Tab 
            title={
              <span className={`text-sm font-medium ${activeTab === 'register' ? 'text-white' : 'text-white/60'}`}>
                Register
              </span>
            } 
            key="register"
          >
            <form onSubmit={handleRegister} className="flex flex-col space-y-5 mt-6">
              <Input
                label="Username"
                size="sm"
                type="text"
                isRequired
                radius="sm"
                classNames={{
                  input: "text-white/90",
                  label: "text-white/70",
                  innerWrapper: "bg-white/5",
                  inputWrapper: "bg-white/5 hover:bg-white/10 border-white/20"
                }}
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
              <Input
                label="Email"
                size="sm"
                type="email"
                isRequired
                radius="sm"
                classNames={{
                  input: "text-white/90",
                  label: "text-white/70",
                  innerWrapper: "bg-white/5",
                  inputWrapper: "bg-white/5 hover:bg-white/10 border-white/20"
                }}
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <Input
                label="Password"
                size="sm"
                type="password"
                isRequired
                radius="sm"
                classNames={{
                  input: "text-white/90",
                  label: "text-white/70",
                  innerWrapper: "bg-white/5",
                  inputWrapper: "bg-white/5 hover:bg-white/10 border-white/20"
                }}
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#a61a1e] to-[#2e3192] text-white hover:from-[#c71d22] hover:to-[#3b3fa3] transition-all duration-300 shadow-lg hover:shadow-xl rounded-lg py-3 font-semibold"
              >
                Create Account
              </Button>
            </form>
          </Tab>
        </Tabs>

      
      </div>

      {/* Gradient animation style */}
      <style jsx global>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-move 15s ease infinite;
        }
      `}</style>
    </div>
  );
}