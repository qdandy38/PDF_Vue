import { createRouter, createWebHistory } from 'vue-router'
import PdfUpload from "../views/PdfUpload.vue"
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
      component: PdfUpload,
    },
	]
});

export default router;
