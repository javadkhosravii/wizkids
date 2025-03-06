"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addWizkid } from "@/redux/wizkidsSlice";
import { type Wizkid, roles } from "@/types/wizkids.type";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";

export default function AddWizkidPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.wizkids.currentUser !== null && !state.wizkids.currentUser.fired
  );
  const [wizkid, setWizkid] = useState<Wizkid>({
    id: "",
    name: "",
    email: "",
    role: roles[0],
    profilePicture: "",
    password: "",
    phoneNumber: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setWizkid({ ...wizkid, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addWizkid(wizkid));
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-8 mt-24 rounded-lg shadow-xl dark:shadow-sm dark:shadow-foreground/70">
        <div className="prose">
          <h1 className="text-3xl font-bold text-center mb-6">Access Denied</h1>
          <p className="text-center">
            Guests are not allowed to add a new wizkid. Please log in as a user
            to access this feature.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 mt-24 rounded-lg shadow-xl dark:shadow-sm dark:shadow-foreground/70">
      <div className="prose">
        <h1 className="text-3xl font-bold text-center mb-6">Add New Wizkid</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <div className="prose">
            <label className="mb-1 font-medium">Name:</label>
          </div>
          <input
            name="name"
            value={wizkid.name}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />
        </div>
        <div className="flex flex-col">
          <div className="prose">
            <label className="mb-1 font-medium">Email:</label>
          </div>
          <input
            name="email"
            type="email"
            value={wizkid.email}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />
        </div>
        <div className="flex flex-col">
          <div className="prose">
            <label className="mb-1 font-medium">Password:</label>
          </div>
          <input
            name="password"
            type="password"
            value={wizkid.password}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />
        </div>
        <div className="flex flex-col">
          <div className="prose">
            <label className="mb-1 font-medium">Role:</label>
          </div>
          <select
            name="role"
            value={wizkid.role}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <div className="prose">
            <label className="mb-1 font-medium">Profile Picture:</label>
          </div>
          <input
            name="profilePicture"
            value={wizkid.profilePicture}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />
        </div>
        <div className="flex flex-col">
          <div className="prose">
            <label className="mb-1 font-medium">Phone Number:</label>
          </div>
          <input
            name="phoneNumber"
            value={wizkid.phoneNumber}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
          />
        </div>
        <Button type="submit">Add Wizkid</Button>
      </form>
    </div>
  );
}
