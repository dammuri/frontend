"use client";

import { useEffect, useState } from "react";
import API from "../../lib/api";
import Protected from "../../components/Protected";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Profile() {
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [file, setFile] = useState(null);

  const [certTitle, setCertTitle] = useState("");
  const [certYear, setCertYear] = useState("");
  const [certFile, setCertFile] = useState(null);

  useEffect(() => {
    API.get("/users/me").then((res) => {
      setUser(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setBio(res.data.bio || "");
      setSkills(res.data.skills || "");
    });
  }, []);

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("skills", skills);
    if (file) formData.append("file", file);

    await fetch(`${BASE_URL}/users/me/update`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    toast.success("Profile updated");

    const res = await API.get("/users/me");
    setUser(res.data);
  };

  const uploadCert = async () => {
    if (!certFile) return alert("Select file");

    const formData = new FormData();
    formData.append("file", certFile);
    formData.append("title", certTitle);
    formData.append("year", certYear);

    await fetch(`${BASE_URL}/users/certificates/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Certificate uploaded");

    setCertTitle("");
    setCertYear("");
    setCertFile(null);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <Protected>
      <div className="flex justify-center mt-10">
        <div className="bg-white p-6 rounded-xl shadow w-96">

          <h2 className="text-xl font-bold text-center mb-4">
            Edit Profile
          </h2>

          <img
            src={
                user?.image ||
                `https://ui-avatars.com/api/?name=${user?.username}`
            }
            onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${user?.username}`;
            }}
            className="w-32 h-32 rounded-full object-cover mx-auto"
            />

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <input
            className="w-full border p-2 mt-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="w-full border p-2 mt-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)} disabled
          />

          <textarea
            className="w-full border p-2 mt-3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <input
            className="w-full border p-2 mt-3"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="React, Python"
          />

          <button
            onClick={updateProfile}
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded"
          >
            Save
          </button>

          {/* CERTIFICATE */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">Add Certificate</h3>

            <input
              className="w-full border p-2 mb-2"
              placeholder="Title"
              value={certTitle}
              onChange={(e) => setCertTitle(e.target.value)}
            />

            <input
              className="w-full border p-2 mb-2"
              placeholder="Year"
              value={certYear}
              onChange={(e) => setCertYear(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setCertFile(e.target.files[0])}
            />

            <button
              onClick={uploadCert}
              className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
            >
              Upload
            </button>
          </div>

        </div>
      </div>
    </Protected>
  );
}