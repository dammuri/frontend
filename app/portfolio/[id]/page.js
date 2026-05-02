"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { useParams } from "next/navigation";
import AnimatedPage from "../../../components/AnimatedPage";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProfileDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [certs, setCerts] = useState([]);
  const [me, setMe] = useState(null);

  const [preview, setPreview] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editYear, setEditYear] = useState("");

  useEffect(() => {
    API.get(`/users/public/${id}`).then(res => {
      setUser(res.data);
      console.log("USER DATA:", res.data); // debug
    });

    API.get(`/users/certificates/${id}`)
      .then(res => setCerts(res.data));

    API.get("/users/me")
      .then(res => setMe(res.data))
      .catch(() => {});
  }, [id]);

  const deleteCert = async (certId) => {
    if (!confirm("Delete this certificate?")) return;

    await fetch(`${BASE_URL}/users/certificates/${certId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setCerts(certs.filter(c => c.id !== certId));
    toast.success("Certificate deleted");
  };

  const startEdit = (c) => {
    setEditingId(c.id);
    setEditTitle(c.title || "");
    setEditYear(c.year || "");
  };

  const saveEdit = async (certId) => {
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("year", editYear);

    await fetch(`${BASE_URL}/users/certificates/${certId}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setEditingId(null);

    const res = await API.get(`/users/certificates/${id}`);
    setCerts(res.data);

    toast.success("Updated successfully");
  };

  if (!user) {
    return (
      <div className="flex justify-center mt-10">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="container py-10">

        {/* PROFILE CARD */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center mb-10">

          <img
            src={
              user.image
                ? `${BASE_URL}/${user.image}`
                : "https://via.placeholder.com/150"
            }
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />

          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-500">{user.email}</p>

          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            {user.bio || "No bio available"}
          </p>

          {/* 🔥 SKILLS FIXED */}
          {user.skills && user.skills.trim() !== "" && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Skills</h3>

              <div className="flex flex-wrap gap-2 justify-center">
                {user.skills.split(",").map((skill, i) => (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs hover:scale-105 transition"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* CERTIFICATES */}
        <h2 className="text-xl font-semibold mb-4">Certificates</h2>

        <div className="grid md:grid-cols-3 gap-4">

          {certs.length > 0 ? (
            certs.map((c) => (
              <div
                key={c.id}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur p-3 rounded-xl shadow hover:shadow-xl transition"
              >

                <img
                  src={`${BASE_URL}/${c.image}`}
                  onClick={() => setPreview(c.image)}
                  className="h-40 w-full object-cover rounded cursor-pointer hover:scale-105 transition"
                />

                {editingId === c.id ? (
                  <>
                    <input
                      className="w-full border p-1 mt-2 rounded"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <input
                      className="w-full border p-1 mt-1 rounded"
                      value={editYear}
                      onChange={(e) => setEditYear(e.target.value)}
                    />

                    <button
                      onClick={() => saveEdit(c.id)}
                      className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-center font-medium mt-2">
                      {c.title || "Certificate"}
                    </p>

                    <p className="text-center text-sm text-gray-500">
                      {c.year}
                    </p>

                    {/* OWNER CONTROLS */}
                    {me && me.id === user.id && (
                      <div className="flex justify-center gap-3 mt-2 text-sm">

                        <button
                          onClick={() => startEdit(c)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteCert(c.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>

                      </div>
                    )}
                  </>
                )}

              </div>
            ))
          ) : (
            <p className="text-gray-500">No certificates yet</p>
          )}

        </div>

        {/* IMAGE PREVIEW MODAL */}
        {preview && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => setPreview(null)}
          >
            <img
              src={`${BASE_URL}/${preview}`}
              className="max-h-[80vh] rounded-2xl shadow-xl"
            />
          </div>
        )}

      </div>
    </AnimatedPage>
  );
}