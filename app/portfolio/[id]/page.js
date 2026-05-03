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

  useEffect(() => {
    // 🔥 GET PROFILE
    API.get(`/users/public/${id}`).then((res) => setUser(res.data));

    // 🔥 GET CERTIFICATES
    API.get(`/users/certificates/${id}`).then((res) => setCerts(res.data));

    // 🔥 GET CURRENT USER (IMPORTANT)
    API.get("/users/me")
      .then((res) => {
        setMe(res.data);
        console.log("ME:", res.data);
      })
      .catch(() => {
        console.log("Not logged in");
      });
  }, [id]);

  // 🔥 DELETE FUNCTION
  const deleteCert = async (certId) => {
    if (!confirm("Delete this certificate?")) return;

    try {
      await API.delete(`/users/certificates/${certId}`);

      // remove from UI instantly
      setCerts((prev) => prev.filter((c) => c.id !== certId));
    } catch (err) {
      console.log(err);
      alert("Delete failed");
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
          onError={(e) =>
            (e.target.src = `https://ui-avatars.com/api/?name=${user.username}`)
          }
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />

        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-gray-500">{user.email}</p>

        <p className="mt-3 text-gray-600">
          {user.bio || "No bio"}
        </p>

        {user.skills && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {user.skills.split(",").map((s, i) => (
              <span
                key={i}
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs"
              >
                {s.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CERTIFICATES */}
      <h2 className="text-xl font-semibold mb-4">Certificates</h2>

      <div className="grid md:grid-cols-3 gap-6">

        {certs.length > 0 ? (
          certs.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >

              <img
                src={c.image}
                onClick={() => setPreview(c.image)}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300")
                }
                className="h-48 w-full object-cover cursor-pointer hover:scale-105 transition"
              />

              <div className="p-3 text-center">
                <p className="font-medium">{c.title || "Certificate"}</p>
                <p className="text-sm text-gray-500">{c.year}</p>

                {/* 🔥 SHOW ONLY FOR OWNER */}
                {me && Number(me.id) === Number(user.id) && (
                  <div className="flex justify-center gap-4 mt-2 text-sm">

                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => alert("Edit feature later")}
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteCert(c.id)}
                    >
                      Delete
                    </button>

                  </div>
                )}
              </div>

            </div>
          ))
        ) : (
          <p>No certificates yet</p>
        )}
      </div>

      {/* MODAL PREVIEW */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            className="max-h-[80vh] rounded-xl shadow-xl"
          />
        </div>
      )}

    </div>
  );
}