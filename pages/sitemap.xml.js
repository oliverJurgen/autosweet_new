// <?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   <url>
//     <loc>https://www.autosweet.com/tradein</loc>
//   </url>
//   <url>
//     <loc>https://www.autosweet.com/credit-form</loc>
//   </url>
//   <url>
//     <loc>https://www.autosweet.com/privacypolicy</loc>
//   </url>
//   <url>
//     <loc>https://www.autosweet.com/terms-and-conditions</loc>
//   </url>
//   <url>
//     <loc>https://www.autosweet.com/terms-and-conditions</loc>
//   </url>
//   <url>
//     <loc>https://www.autosweet.com/my-vehicles/liked</loc>
//   </url>
//   <url>
//     <loc>https://www.autosweet.com/my-vehicles/disliked</loc>
//   </url>
// </urlset>
const toUrl = (host, route) =>
  `<url><loc>http://www.${host}${route}</loc></url>`;

const createSitemap = (
  host,
  routes,
  products
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => toUrl(host, route)).join('')}
    </urlset>`;

const Sitemap = () => {};

Sitemap.getInitialProps = ({ res, req }) => {
  const routes = [
    '',
    '/tradein',
    '/credit-form',
    '/privacypolicy',
    '/terms-and-conditions',
    '/my-vehicles/liked',
    '/my-vehicles/disliked',
  ];
  const sitemap = createSitemap(req.headers.host, routes);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return res;
};

export default Sitemap;
