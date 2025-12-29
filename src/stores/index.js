import { createPinia } from "pinia";
import * as axios from '@/common/api';

const pinia = createPinia();

pinia.use(({ store }) => {
    store.$axios = axios.instance;
});

export default pinia;