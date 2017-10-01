import Home from '../Home';
import { RouterGenerator } from '../../services';

export const routes = new RouterGenerator(process.env.BASENAME)
  .addRoute('/', Home, true)
  .getRoutes();
