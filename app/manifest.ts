import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Apoorv Maurya - Full-Stack AI Engineer',
        short_name: 'Apoorv Maurya',
        description: 'Full-Stack AI Engineer · LLM-Integrated Products',
        start_url: '/',
        display: 'standalone',
        background_color: '#111111',
        theme_color: '#F0B35A',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
