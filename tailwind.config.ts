import { colors } from './src/app/utils/colors';
import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{ts,tsx}',
        './src/components/**/*.{ts,tsx}',
        './src/app/**/*.{ts,tsx}',
        './src/design-system/**/*.{ts,tsx}'
    ],
    theme: {
        extend: {
            colors,
            fontSize: {
                '2xs': ['0.625rem', '0.75rem']
            },
            lineHeight: {
                '3.5': '0.875rem'
            },
            boxShadow: {
                DEFAULT: '0px 0px 6px 0px #0000000D'
            }
        }
    },
    plugins: []
} satisfies Config;
