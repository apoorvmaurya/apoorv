import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Apoorv Maurya Portfolio',
        short_name: 'Apoorv',
        description: 'Portfolio of Apoorv Maurya - Full Stack Developer & AI Enthusiast',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0f',
        theme_color: '#7a7aff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
