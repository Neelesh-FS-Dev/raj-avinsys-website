import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom';
import { routes } from './app/routes';

export { metaFor, prerenderPaths } from './seo/routeMeta';

/** Renders one route to an HTML string for prerendering. Runs in Node at build time only. */
export async function renderRoute(url: string): Promise<{ html: string; status: number }> {
  const { query, dataRoutes } = createStaticHandler(routes);
  const context = await query(new Request(new URL(url, 'http://localhost')));
  if (context instanceof Response) {
    throw new Error(`Unexpected response while rendering ${url}`);
  }
  const router = createStaticRouter(dataRoutes, context);
  const html = renderToString(<StaticRouterProvider router={router} context={context} />);
  return { html, status: context.statusCode };
}
