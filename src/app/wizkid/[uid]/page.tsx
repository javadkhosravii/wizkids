"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateWizkid, deleteWizkid, fire } from "@/redux/wizkidsSlice";
import { Wizkid, roles } from "@/types/wizkids.type";
import { Button } from "@/components/ui/button";

export default function EditWizkidPage() {
  const { uid } = useParams() as { uid: string };
  const router = useRouter();
  const dispatch = useDispatch();

  // Get authentication state
  const isAuthenticated =
    useSelector((state: RootState) => state.wizkids.currentUser)

  // Get the wizkid details using the uid parameter
  const wizkidToEdit = useSelector((state: RootState) =>
    state.wizkids.list.find((wizkid) => wizkid.id === uid)
  );

  const [formData, setFormData] = useState<Wizkid | null>(wizkidToEdit || null);

  // Update local state when the wizkid is loaded
  useEffect(() => {
    if (wizkidToEdit) {
      setFormData(wizkidToEdit);
    }
  }, [wizkidToEdit]);

  if (!formData) {
    return <div>Wizkid not found</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only allow update if authenticated
    if (!isAuthenticated) return;
    dispatch(updateWizkid({ email: formData.email, data: formData }));
    router.push("/");
  };

  const handleDelete = () => {
    // Only allow deletion if authenticated
    if (!isAuthenticated) return;
    dispatch(deleteWizkid(formData.id));
    router.push("/");
  };

  const handleFire = () => {
    // Only allow firing if authenticated
    if (!isAuthenticated) return;
    const id = formData.id;
    dispatch(
      fire(id)
    );
  };

  return (
    <div className="container p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4 text-current">Edit Wizkid</h1>
        <p>
          <strong>Status:</strong> {formData.fired ? "Fired" : "Not Fired"}
        </p>
        {isAuthenticated && (
          <>
            <Button onClick={handleDelete} variant="destructive">
              Delete Wizkid
            </Button>
            {!formData.fired && (
              <Button onClick={handleFire} variant="destructive">
                Fire Wizkid
              </Button>
            )}
          </>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-current">Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={!isAuthenticated}
            className="px-3 py-2 border border-border rounded focus:outline-none focus:ring focus:ring-ring bg-background text-current"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-current">Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            readOnly
            className="px-3 py-2 border border-border rounded bg-background text-current cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-current">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={!isAuthenticated}
            className="px-3 py-2 border border-border rounded focus:outline-none focus:ring focus:ring-ring bg-background text-current"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-current">
            Profile Picture:
          </label>
          <input
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            disabled={!isAuthenticated}
            className="px-3 py-2 border border-border rounded focus:outline-none focus:ring focus:ring-ring bg-background text-current"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-current">Phone Number:</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            disabled={!isAuthenticated}
            className="px-3 py-2 border border-border rounded focus:outline-none focus:ring focus:ring-ring bg-background text-current"
          />
        </div>
        <Button className="w-full" type="submit" disabled={!isAuthenticated}>
          Save Changes
        </Button>
      </form>
      {!isAuthenticated && (
        <p className="mt-4 text-sm text-muted-foreground">
          You are viewing as a guest. Editing and deletion are disabled.
        </p>
      )}
    </div>
  );
}
