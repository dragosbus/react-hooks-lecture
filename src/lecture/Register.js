import React, { useState } from "react";

export default function Register() {
  const initialFormState = {
    username: "",
    email: "",
    password: ""
  };

  const [form, setForm] = useState(initialFormState);

  const changeField = ({ target }) =>
    setForm({
      ...form,
      [target.name]: target.value
    });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(form);
    setForm(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit}>
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
