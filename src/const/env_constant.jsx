const { BASE_URL, MODE, DEV, PROD, SSR } =import.meta.env
export const API_URL = DEV ? 'http://localhost:3000/api/' : 'https://api.marjintech.online/api/'
