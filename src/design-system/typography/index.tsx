import { JSX } from 'react';

export const H4 = ({ ...props }: JSX.IntrinsicElements['h4']) => (
    <h4 className='text-lg leading-5 font-bold' {...props} />
);
export const H5 = ({ ...props }: JSX.IntrinsicElements['h5']) => (
    <h5 className='text-sm leading-4 font-semibold' {...props} />
);

export const SH1 = ({ ...props }: JSX.IntrinsicElements['h6']) => (
    <h6 className='text-sm leading-4 font-semibold' {...props} />
);
export const SH2 = ({ ...props }: JSX.IntrinsicElements['h6']) => (
    <h6 className='text-xs leading-3.5 font-semibold' {...props} />
);
export const SH3 = ({ ...props }: JSX.IntrinsicElements['div']) => (
    <div className='text-xs leading-3.5 font-medium' {...props} />
);

export const B4 = ({ ...props }: JSX.IntrinsicElements['div']) => <div className='text-2xs font-medium' {...props} />;
