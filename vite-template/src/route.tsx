import About from './About';
import Index from './App';
import Home from './Home';
const routes = [
  {
    path: '/',
    component: <Index />,
  },
  {
    path: '/home',
    component: <Home />,
  },
  {
    path: '/about',
    component: <About />,
  },
];

export default routes;
