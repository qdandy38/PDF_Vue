import { createRouter, createWebHistory } from 'vue-router'
const PdfUpload = () => import("../views/PdfUpload.vue");
const Preview = () => import("../views/Preview.vue");
const Finish = () => import("../views/Finish.vue");
const Test = () => import("../views/Test.vue");
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   redirect: '/pdfupload',
    // },
    {
      path: '/',
      name: 'PdfUpload',
      component: PdfUpload//import("../views/PdfUpload.vue"),
    },
    {
      path: '/preview',
      name: 'Preview',
      component: Preview,
    },
    {
      path: '/finish',
      name: 'Finish',
      component: Finish,
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
	]
});
router.beforeEach((to, from, next) => {
  next();
})

export default router;
