"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSchoolPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    board: "",
    medium: "",
    district: "",
    taluka: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    router.push("/admin/schools");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-6"
    >
      <h1 className="mb-6 text-2xl font-bold">
        Create School
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        {Object.keys(form).map((field) => (
          <input
            key={field}
            placeholder={field}
            value={form[field]}
            onChange={(e) =>
              setForm({
                ...form,
                [field]: e.target.value,
              })
            }
            className="rounded-xl border p-3"
          />
        ))}
      </div>

      <button className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-white">
        Create School
      </button>
    </form>
  );
}