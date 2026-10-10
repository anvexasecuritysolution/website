import localPosts from '../data/posts.js';
import { createApi } from './createClient.js';
import { submitSheets } from './sheets.js';
export { ApiError } from './createClient.js';

export const api = createApi({
  base: (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') + '/api',
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || '',
  sheetsUrl: import.meta.env.VITE_SHEETS_URL || '',
  localPosts,
  submitSheets,
});
