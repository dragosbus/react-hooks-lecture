import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = event => {
    event.preventDefault();
    const data = {
      email,
      password
    };
    console.log(data);
  };

  const changeField = (event, cb) => cb(event.target.value);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={email}
        onChange={event => changeField(event, setEmail)}
        name="email"
      />
      <input
        type="password"
        value={password}
        onChange={event => changeField(event, setPassword)}
        name="password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
