import {MainConfig} from './core/decorators/main.decorator';
import { AppRoutes } from './routes';
import { DataService } from './services/data.service';

@MainConfig({
    rootElement:'app',
    routes: AppRoutes,
    services:[DataService]
})
class Main{}