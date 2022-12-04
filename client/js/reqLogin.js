formLogin.addEventListener("submit", async function (e) {
  e.preventDefault();
  let userInput = inputUser.value;
  let passwordInput = inputPassword.value;
  await axios
    .post("http://localhost:8888/user/register", {
      user: userInput,
      password: passwordInput,
    })
    .then(function ({ data }) {
      localStorage.setItem("infoLogin", JSON.stringify(data));
      location.replace("/client");
    })
    .catch(function (error) {
      console.log(error);
    });
});
