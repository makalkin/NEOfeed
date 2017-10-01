import Home from '../Home';
import { RouterGenerator } from '../../services';

export const routes = new RouterGenerator('/').addRoute('/', Home, true).getRoutes();
