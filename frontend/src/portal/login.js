import { demoRequest } from "../demo.js";

const DEMO = {
  officer: { email: "so.questions@na.gov.pk", password: "questions123" },
  speaker: { email: "speaker@na.gov.pk", password: "speaker123" },
  js: { email: "js.admin@na.gov.pk", password: "js123" },
  special: { email: "specsec@na.gov.pk", password: "special123" },
  secgen: { email: "secgen@na.gov.pk", password: "secretary123" },
};

const TITLES = {
  officer: "Section Officer · Questions Branch",
  speaker: "Hon. Speaker",
  js: "Joint Secretary",
  special: "Special Secretary",
  secgen: "Secretary",
};

let user = null;

export function currentUser() {
  return user;
}

export function homePage(role = user?.role) {
  return role === "speaker" ? "desk" : "files";
}

export function mountLogin(onSuccess) {
  const screen = document.getElementById("loginScreen");
  document.querySelectorAll("#loginScreen .role-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#loginScreen .role-chip").forEach((el) => el.classList.remove("active"));
      chip.classList.add("active");
      const creds = DEMO[chip.dataset.role];
      document.getElementById("loginEmail").value = creds.email;
      document.getElementById("loginPassword").value = creds.password;
    });
  });
  document.getElementById("loginBtn").addEventListener("click", async () => {
    const subtitle = document.getElementById("loginSubtitle");
    try {
      const data = await demoRequest("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email: document.getElementById("loginEmail").value,
          password: document.getElementById("loginPassword").value,
        }),
      });
      user = data.user;
      user.title = TITLES[user.role] || user.role;
      screen.classList.add("hidden");
      document.getElementById("app").classList.add("show");
      onSuccess(user);
    } catch (err) {
      subtitle.textContent = err.message;
    }
  });
}

export async function logout() {
  await demoRequest("/api/logout", { method: "POST" });
  user = null;
  document.getElementById("app").classList.remove("show");
  document.getElementById("app").innerHTML = "";
  document.getElementById("loginScreen").classList.remove("hidden");
}

export async function loginAs(role) {
  const creds = DEMO[role];
  const data = await demoRequest("/api/login", {
    method: "POST",
    body: JSON.stringify(creds),
  });
  user = data.user;
  user.title = TITLES[user.role] || user.role;
  return user;
}
