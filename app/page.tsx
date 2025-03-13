"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import { Divider, Image, Input } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
// icons import mail pass https://lucide.dev/icons/
import { Mail, Lock } from "lucide-react";

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (email === "test@gmail.com" && password === "12345") {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/home");
      } else {
        alert("Invalid credentials");
      }
    } else {
      console.log("Register Successful");
      router.push("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#171923] via-[#434a6b] to-[#262a3a] animate-gradient-xy px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20 transition-all duration-300 hover:shadow-2xl flex flex-col items-center">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6 space-y-3 w-full">
          <Image
            src="/anex.png"
            alt="Logo"
            width={160}
            height={70}
            className="h-14 w-auto transform transition-transform duration-500 hover:scale-105"
          />
          <Divider className="h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent w-3/4" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-5 w-full">
              {!isLogin && (
                <Input
                  label="Username"
                  size="sm"
                  type="text"
                  isRequired
                  radius="sm"
                  classNames={{
                    input: "!text-[#919191]",
                    label: "text-white/70",
                    inputWrapper:
                      "bg-white/5 hover:bg-white/10 border-white/20",
                  }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}

              <Input
                label="Email"
                size="sm"
                type="email"
                isRequired
                radius="sm"
                classNames={{
                  input: "!text-[#919191]",
                  label: "text-white",
                  inputWrapper: `bg-white/5 hover:bg-white/10 data-[has-value=true]:bg-white/10 border-white/2`,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                size="sm"
                type="password"
                isRequired
                radius="sm"
                classNames={{
                  input: "!text-[#919191]",
                  label: "text-white",
                  inputWrapper: "bg-white/5 hover:bg-white/10 border-white/2 text-red-500",
                  
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#a61a1e] to-[#2e3192] text-white hover:from-[#c71d22] hover:to-[#3b3fa3] transition-all duration-300 shadow-lg hover:shadow-xl rounded-lg py-3 font-semibold"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </motion.div>
        </AnimatePresence>

        <p className="text-center mt-6 text-white/70 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-white hover:text-white/80 transition-colors duration-300 font-semibold"
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </p>
      </div>

      <style jsx global>{`
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-move 15s ease infinite;
        }

        /* Change autocomplete styles */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: none !important;
          -webkit-text-fill-color: rgba(200, 200, 200, 0.9) !important;
        }
      `}</style>
    </div>
  );
}
