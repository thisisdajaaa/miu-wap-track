function askPassword(ok, fail) {
  let password = prompt("Password?", "");
  if (password === "rockstar") ok();
  else fail();
}

let user = {
  name: "John",
  loginOk() {
    alert(`${this.name} logged in`);
  },
  loginFail() {
    alert(`${this.name} failed to log in`);
  },
};

// wrapper
askPassword(
  () => user.loginOk(),
  () => user.loginFail()
);

// // bind
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));

// apply
askPassword(
  () => user.loginOk.apply(user),
  () => user.loginFail.apply(user)
);

// call
askPassword(
  () => user.loginOk.call(user),
  () => user.loginFail.call(user)
);
