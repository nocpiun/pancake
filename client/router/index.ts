import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			redirect: "/login"
		},
		{
			path: "/app",
			name: "home",
			component: () => import("../views/Layout.vue"),
			redirect: "/app/home",
			children: [
				{
					path: "home",
					component: () => import("../views/HomeView.vue")
				},
				{
					path: "share",
					component: () => import("../views/ShareView.vue")
				},
				{
					path: "user",
					component: () => import("../views/UserView.vue")
				},
				{
					path: "file/:key",
					name: "file",
					component: () => import("../views/FileView.vue")
				},
				{
					path: "shared/:key",
					name: "shared-file",
					component: () => import("../views/SharedFileView.vue")
				}
			]
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/LoginView.vue")
		},
		{
			path: "/register",
			name: "register",
			component: () => import("../views/RegisterView.vue")
		}
	]
});

export default router;
