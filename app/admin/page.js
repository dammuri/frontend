"use client";

import { useState, useEffect } from "react";
import API from "../../lib/api";
import Protected from "../../components/Protected";

export default function AdminPage() {
  // CREATE USER STATE
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // USERS LIST
  const [users, setUsers] = useState([]);

  // EDIT STATE
  const [editingId, setEditingId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState(false);

  // LOAD USERS
  const loadUsers = () => {
    API.get("/users/")
      .then((res) => setUsers(res.data))
      .catch(() => alert("Failed to load users"));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // CREATE USER
  const createUser = async () => {
    if (!username || !email || !password) {
      alert("All fields required");
      return;
    }

    try {
      await API.post("/users/admin/create-user", {
        username,
        email,
        password,
        is_admin: isAdmin,
      });

      alert("User created!");

      setUsername("");
      setEmail("");
      setPassword("");
      setIsAdmin(false);

      loadUsers();
    } catch {
      alert("Failed to create user");
    }
  };

  // DELETE USER
  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);
      loadUsers();
    } catch {
      alert("Delete failed");
    }
  };

  // TOGGLE ROLE QUICK BUTTON
  const toggleRole = async (user) => {
    try {
      await API.put(`/users/${user.id}`, {
        username: user.username,
        email: user.email,
        is_admin: !user.is_admin,
      });

      loadUsers();
    } catch {
      alert("Role update failed");
    }
  };

  // START EDIT
  const startEdit = (u) => {
    setEditingId(u.id);
    setEditUsername(u.username);
    setEditEmail(u.email);
    setEditRole(u.is_admin);
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);
  };

  // SAVE EDIT
  const saveEdit = async (id) => {
    try {
      await API.put(`/users/${id}`, {
        username: editUsername,
        email: editEmail,
        is_admin: editRole,
      });

      setEditingId(null);
      loadUsers();
    } catch {
      alert("Update failed");
    }
  };

  return (
    <Protected adminOnly={true}>
      <div className="container py-10">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ================= CREATE USER ================= */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add User</h2>

            <input
              placeholder="Username"
              className="w-full border p-3 mb-3 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              placeholder="Email"
              className="w-full border p-3 mb-3 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 mb-3 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="flex items-center gap-2 mb-4 text-sm">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              Make Admin
            </label>

            <button
              onClick={createUser}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Create User
            </button>
          </div>

          {/* ================= USER LIST ================= */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Users</h2>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="border p-3 rounded-lg hover:bg-gray-50"
                >

                  {editingId === u.id ? (
                    <>
                      <input
                        className="w-full border p-2 mb-2 rounded"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                      />

                      <input
                        className="w-full border p-2 mb-2 rounded"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />

                      {/* ROLE EDIT */}
                      <label className="flex items-center gap-2 mb-2 text-sm">
                        <input
                          type="checkbox"
                          checked={editRole}
                          onChange={() => setEditRole(!editRole)}
                        />
                        Admin Role
                      </label>

                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(u.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>

                        <button
                          onClick={cancelEdit}
                          className="bg-gray-300 px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between items-center">

                      <div>
                        <p className="font-medium">{u.username}</p>
                        <p className="text-sm text-gray-500">{u.email}</p>
                      </div>

                      <div className="flex items-center gap-2">

                        {/* ROLE BADGE */}
                        <button
                          onClick={() => toggleRole(u)}
                          className={`text-xs px-3 py-1 rounded-full ${
                            u.is_admin
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {u.is_admin ? "Admin" : "Member"}
                        </button>

                        {/* EDIT */}
                        <button
                          onClick={() => startEdit(u)}
                          className="text-blue-500 text-sm hover:underline"
                        >
                          Edit
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Delete
                        </button>

                      </div>

                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Protected>
  );
}