const toUrl = (host, route) =>
  `<url><loc>http://www.${host}${route}</loc></url>`;

const createSitemap = (
  host,
  routes,
  quickLinks
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => toUrl(host, route)).join('')}
    ${quickLinks.map((link) => toUrl(`${host}/search/`, link)).join('')}
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
  const quickLinks = [
    'Ford',
    'Chevrolet',
    'Jeep',
    'Toyota',
    'Nissan',
    'Ram',
    'Honda',
    'Dodge',
    'GMC',
    'BMW',
    'Hyundai',
    'Kia',
    'Mercedes-Benz',
    'Volkswagen',
    'Subaru',
    'Lexus',
    'Chrysler',
    'Audi',
    'Lincoln',
    'Cadillac',
    'AL',
    'AK',
    'AR',
    'AZ',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
    'SUV',
    '4 Door Car',
    'Truck',
    '2 Door Car',
    'Van',
    'Wagon',
    'Convertible',
    '5 Door Car',
    '3 Door Car',
    'Mini-Van',
    'New',
    'Used',
  ];
  const sitemap = createSitemap(req.headers.host, routes, quickLinks);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return res;
};

export default Sitemap;
