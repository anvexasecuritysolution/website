import { createContext, useContext } from 'react';

export const PrerenderContext = createContext(null);
export const usePrerenderPosts = () => useContext(PrerenderContext);
