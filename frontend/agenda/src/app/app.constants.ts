import { environment } from 'src/environments/environment';

const PROD_BASE_URL = '';
const LOCAL_BASE_URL = 'http://127.0.0.1:8000';

export let BASE_URL: string;
if (environment.production) {
    BASE_URL = PROD_BASE_URL;
} else {
    BASE_URL = LOCAL_BASE_URL;
}
