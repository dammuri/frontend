"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";
import { useParams } from "next/navigation";

export default function ProfileDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [certs, setCerts] = useState([]);
  const [me, setMe] = useState(null);

  const [preview, setPreview] = useState(null);

  // EDIT STATE
  const [editOpen, setEditOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    API.get(`/users/public/${id}`).then((res) => setUser(res.data));
    API.get(`/users/certificates/${id}`).then((res) => setCerts(res.data));

    API.get("/users/me")
      .then((res) => setMe(res.data))
      .catch(() => {});
  }, [id]);

  // DELETE
  const deleteCert = async (certId) => {
    if (!confirm("Delete this certificate?")) return;

    await API.delete(`/users/certificates/${certId}`);
    setCerts((prev) => prev.filter((c) => c.id !== certId));
  };

  // OPEN EDIT
  const openEdit = (cert) => {
    setEditingCert(cert);
    setTitle(cert.title || "");
    setYear(cert.year || "");
    setFile(null);
    setEditOpen(true);
  };

  // SAVE EDIT
  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    if (file) formData.append("file", file);

    try {
      await API.put(`/users/certificates/${editingCert.id}`, formData);

      setCerts((prev) =>
        prev.map((c) =>
          c.id === editingCert.id
            ? {
                ...c,
                title,
                year,
                image: file ? URL.createObjectURL(file) : c.image,
              }
            : c
        )
      );

      setEditOpen(false);
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10">

      {/* PROFILE */}
      <div className="bg-white/70 backdrop-blur p-8 rounded-2xl shadow text-center mb-10">

        <img
          src={
            user.image ||
            `https://ui-avatars.com/api/?name=${user.username}`
          }
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />

        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-gray-500">{user.email}</p>
        <p className="mt-3">{user.bio}</p>

        {/* ========================= */}
        {/* 🔥 SKILLS (FIXED) */}
        {/* ========================= */}
        {user.skills && user.skills.trim() !== "" && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Skills</h3>

            <div className="flex flex-wrap justify-center gap-2">
              {user.skills.split(",").map((s, i) => (
                <span
                  key={i}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm shadow"
                >
                  {s.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* CERTIFICATES */}
      <h2 className="text-xl font-semibold mb-4">Certificates</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {certs.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">

            <img
              src={c.image}
              onClick={() => setPreview(c.image)}
              className="h-48 w-full object-cover cursor-pointer"
            />

            <div className="p-3 text-center">
              <p className="font-medium">{c.title}</p>
              <p className="text-sm text-gray-500">{c.year}</p>

              {/* OWNER ONLY */}
              {me && Number(me.id) === Number(user.id) && (
                <div className="flex justify-center gap-4 mt-2 text-sm">

                  <button
                    onClick={() => openEdit(c)}
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
            </div>

          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">

            <h2 className="text-lg font-semibold mb-4">Edit Certificate</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
              className="w-full border p-2 mb-3 rounded"
            />

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditOpen(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PREVIEW */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center"
          onClick={() => setPreview(null)}
        >
          <img src={preview} className="max-h-[80vh]" />
        </div>
      )}

    </div>
  );
}