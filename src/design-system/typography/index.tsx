export const H4 = ({ ...props }) => <h4 className='text-lg leading-5 font-bold' {...props} />;
export const H5 = ({ ...props }) => <h5 className='text-sm leading-4 font-semibold' {...props} />;

export const SH1 = ({ ...props }) => <h6 className='text-sm leading-4 font-semibold' {...props} />;
export const SH2 = ({ ...props }) => <h6 className='text-xs leading-3.5 font-medium' {...props} />;

export const B1 = ({ ...props }) => <div className='text-xs leading-3.5 font-medium' {...props} />;
export const B4 = ({ ...props }) => <div className='text-2xs font-medium' {...props} />;
const typography = {
    body: {
        P1: {
            fontFamily: 'Inter',
            fontSize: '0.875rem', // 14px
            fontWeight: 600,
            lineHeight: '1.05875rem' // 16.94px
        },
        P2: {
            fontFamily: 'Inter',
            fontSize: '0.75rem', // 12px
            fontWeight: 500,
            lineHeight: '0.9075rem' // 14.52px
        }
    },
    overline: {
        OLN: {
            fontFamily: 'Inter',
            fontSize: '0.625rem', // 10px
            fontWeight: 500,
            lineHeight: '0.75625rem' // 12.1px
        }
    },
    caption: {
        CTN: {
            fontFamily: 'Inter',
            fontSize: '0.75rem', // 12px
            fontWeight: 500,
            lineHeight: '0.9075rem' // 14.52px
        }
    }
};
