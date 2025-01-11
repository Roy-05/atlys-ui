import { colors } from './src/utils/colors';
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
            boxShadow: {
                DEFAULT: '0px 0px 6px 0px #0000000D'
            }
        }
    },
    plugins: []
} satisfies Config;
