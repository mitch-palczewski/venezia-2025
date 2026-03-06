export async function GET() {
    const website = 'https://www.pilepilepile.com';
    
    const pages = [
        '', 
        '3d/pile', 
        'gallery/prints', 
        'gallery/pile-3d-gallery'
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
            .map((page) => {
                return `
                <url>
                    <loc>${website}/${page}</loc>
                    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>${'monthly'}</changefreq>
                    <priority>${page === '' ? '1.0' : '0.8'}</priority>
                </url>
                `;
            })
            .join('')}
    </urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600'
        }
    });
}