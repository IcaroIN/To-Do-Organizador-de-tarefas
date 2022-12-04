async function registerOrLogin() {
  let userInput = document.getElementById("inputUser").value;
  let passwordInput = document.getElementById("inputPassword").value;
  const { data } = await axios.post("http://localhost:8888/register", {
    user: userInput,
    password: passwordInput,
  });
  console.log(data);
}
