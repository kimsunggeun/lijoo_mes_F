const systemRouter = {  
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/Dashboard.vue'),
  meta: { nemu_code: 'dashboard', menu_id: 'dashboard', title: '대시보드', title2: 'Dashboard',affix: true }
}

export default systemRouter
