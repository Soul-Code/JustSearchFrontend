import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import myTeam from "./components/myTeam.vue";
import Answer from "./components/Answer.vue";
import Rank from "./components/Rank.vue";

export const routes = [
  { path: "/justsoso", component: Home, name: -1 },
  { path: "/justsoso/login", component: Login, name: 3 },
  { path: "/justsoso/myteam", component: myTeam, name: 2 },
  { path: "/justsoso/answer", component: Answer, name: 0 },
  { path: "/justsoso/Rank", component: Rank, name: 1 }
];
