import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Team from "./components/Team.vue";
import Answer from "./components/Answer.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/team", component: Team },
  { path: "/answer", component: Answer }
];
