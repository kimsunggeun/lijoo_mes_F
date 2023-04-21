const systemRouter = {  
  path: 'pdaDashboard',
  name: 'pdaDashboard',
  component: () => import('@/views/dashboard/pdaDashboard.vue'),
  meta: { nemu_code: 'pdadashboard', menu_id: 'pdadashboard', title: 'PDA 대시보드', title2: 'PDA Dashboard',affix: false }
}

export default systemRouter
