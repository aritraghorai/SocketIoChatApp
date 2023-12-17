import env from "@/utils/env";
import Axios from "axios";
const ApiClient = Axios.create({ baseURL: env.BASE_URL });

export default ApiClient;
