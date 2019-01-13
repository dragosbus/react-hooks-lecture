import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const changeField = ({target}) =>
    setForm({
      ...form,
      [target.name]: target.value
    });

  return (
    <form>
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={changeField}
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={changeField}
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={changeField}
      />
      <button type="submit">Register</button>
    </form>
  );
}
