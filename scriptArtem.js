fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < 5; i++) {
      console.log(data[i]);
      const userCard = document.createElement("div");
      userCard.classList.add("userCard");
      const userInfo = document.createElement("ul");
      userCard.appendChild(userInfo);
      document.body.appendChild(userCard);
      Object.entries(data[i]).forEach(([key, valeur]) => {
        const li = document.createElement("li");
        li.innerText = `${key}: `;
        if (typeof valeur !== "object") {
          li.innerText += valeur;
        }
        userInfo.appendChild(li);
      });
    }
  });

const chargeUsers = document.createElement("button");
document.body.appendChild(chargeUsers);
chargeUsers.innerText = "Charge new users";
