import {MainConfig} from './core/decorators/main.decorator';
import { AppRoutes } from './routes';

@MainConfig({
    rootElement:'app',
    routes: AppRoutes
})
class Main{}