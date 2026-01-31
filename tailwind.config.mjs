/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'void': '#030303',
                // 'signal': '#CCFF00', <-- OLD HARDCODED
                'signal': 'var(--signal)', // <-- NEW DYNAMIC
                'zinc': {
                    850: '#1f1f22',
                    900: '#18181b',
                    950: '#09090b',
                }
            },
            fontFamily: {
                'display': ['"Space Grotesk"', 'sans-serif'],
                'mono': ['"JetBrains Mono"', 'monospace'],
            },
            backgroundImage: {
                'noise': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
                'grid-fade': 'linear-gradient(to bottom, transparent, #030303)',
            },
            animation: {
                'spin-slow': 'spin 30s linear infinite',
                'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
