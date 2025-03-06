import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your new password</p>
        </div>
        <div className="relative w-full">
          <Input
            type="password"
            placeholder="Enter your email"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="pl-10"
          />
          <LockKeyhole className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        <Button className="bg-orange hover:bg-hoverOrange">Reset</Button>
        <span>
          Back to{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};
