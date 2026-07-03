import type { ReactNode } from 'react';

const USAFlag = () => (
	<svg
		width='20'
		height='14'
		viewBox='0 0 20 14'
		className='rounded-sm shrink-0'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect width='20' height='14' fill='#B22234' />
		<path
			d='M0 1.08h20M0 3.23h20M0 5.38h20M0 7.54h20M0 9.69h20M0 11.85h20'
			stroke='#FFF'
			strokeWidth='1.08'
		/>
		<rect width='10' height='7.54' fill='#3C3B6E' />
		<circle cx='2' cy='1.8' r='0.45' fill='#FFF' />
		<circle cx='5' cy='1.8' r='0.45' fill='#FFF' />
		<circle cx='8' cy='1.8' r='0.45' fill='#FFF' />
		<circle cx='3.5' cy='3.8' r='0.45' fill='#FFF' />
		<circle cx='6.5' cy='3.8' r='0.45' fill='#FFF' />
		<circle cx='2' cy='5.8' r='0.45' fill='#FFF' />
		<circle cx='5' cy='5.8' r='0.45' fill='#FFF' />
		<circle cx='8' cy='5.8' r='0.45' fill='#FFF' />
	</svg>
);

const UAEFlag = () => (
	<svg
		width='20'
		height='14'
		viewBox='0 0 20 14'
		className='rounded-sm shrink-0'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect width='20' height='14' fill='#FFF' />
		<rect y='0' width='20' height='4.67' fill='#00732F' />
		<rect y='9.33' width='20' height='4.67' fill='#000' />
		<rect x='0' y='0' width='5.33' height='14' fill='#FF0000' />
	</svg>
);

const SGPFlag = () => (
	<svg
		width='20'
		height='14'
		viewBox='0 0 20 14'
		className='rounded-sm shrink-0'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect width='20' height='7' fill='#ED2939' />
		<rect y='7' width='20' height='7' fill='#FFF' />
		<path
			d='M 2.5 1.8 A 1.8 1.8 0 0 0 5 4 A 1.8 1.8 0 0 1 2.5 1.8 Z'
			fill='#FFF'
		/>
		<circle cx='4.2' cy='2' r='0.35' fill='#FFF' />
		<circle cx='4.8' cy='2.8' r='0.35' fill='#FFF' />
		<circle cx='3.8' cy='3.3' r='0.35' fill='#FFF' />
		<circle cx='3' cy='2.6' r='0.35' fill='#FFF' />
	</svg>
);

const CANFlag = () => (
	<svg
		width='20'
		height='14'
		viewBox='0 0 20 14'
		className='rounded-sm shrink-0'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect width='20' height='14' fill='#FF0000' />
		<rect x='5' y='0' width='10' height='14' fill='#FFF' />
		<path
			d='M10 2 L10.5 4.5 L12 4 L11 6 L13 6.5 L11 7 L11.5 9 L10 8 L10 11 L9 11 L9 8 L7.5 9 L8 7 L6 6.5 L8 6 L7 4 L8.5 4.5 L9 2 Z'
			fill='#FF0000'
		/>
	</svg>
);

const SAUFlag = () => (
	<svg
		width='20'
		height='14'
		viewBox='0 0 20 14'
		className='rounded-sm shrink-0'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect width='20' height='14' fill='#006C35' />
		<rect x='1' y='1' width='18' height='12' fill='#006C35' />
		<path
			d='M10 4 L11 6 L13 6 L11.5 7.5 L12 10 L10 8.5 L8 10 L8.5 7.5 L7 6 L9 6 Z'
			fill='#FFF'
		/>
		<path d='M10 10 L13 10 L13 11 L10 11 Z' fill='#FFF' />
	</svg>
);

const KWTFlag = () => (
	<svg
		width='20'
		height='14'
		viewBox='0 0 20 14'
		className='rounded-sm shrink-0'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect y='0' width='20' height='4.67' fill='#007229' />
		<rect y='4.67' width='20' height='4.67' fill='#FFF' />
		<rect y='9.33' width='20' height='4.67' fill='#CE1126' />
		<polygon points='0,0 6,2.33 6,11.67 0,14' fill='#1E1E1E' />
	</svg>
);

const MYSFlag = () => (
	<svg
		width='20'
		height='14'
		viewBox='0 0 20 14'
		className='rounded-sm shrink-0'
		xmlns='http://www.w3.org/2000/svg'
	>
		<rect y='0' width='20' height='2' fill='#CC0001' />
		<rect y='2' width='20' height='2' fill='#FFF' />
		<rect y='4' width='20' height='2' fill='#CC0001' />
		<rect y='6' width='20' height='2' fill='#FFF' />
		<rect y='8' width='20' height='2' fill='#CC0001' />
		<rect y='10' width='20' height='2' fill='#FFF' />
		<rect y='12' width='20' height='2' fill='#CC0001' />
		<rect width='9' height='8' fill='#010066' />
		<circle cx='3.5' cy='3.5' r='2.8' fill='#FFD700' />
		<circle cx='4.3' cy='3.5' r='2.3' fill='#010066' />
		<polygon
			points='7,1 7.3,2.5 8.8,2.5 7.7,3.3 8,4.8 7,4 6,4.8 6.3,3.3 5.2,2.5 6.7,2.5'
			fill='#FFD700'
		/>
	</svg>
);

export interface Country {
	code: string;
	name: string;
	flag: ReactNode;
	phone: string;
	email: string;
	address: string;
}

export const countries: Country[] = [
	{
		code: 'USA',
		name: 'USA',
		flag: <USAFlag />,
		phone: '+1 646 421 5740',
		email: 'usa@aibizmod.com',
		address: '2500 MARCONI AVE, STE 101, SACRAMENTO, CA 95821 USA',
	},
	{
		code: 'CAN',
		name: 'Canada',
		flag: <CANFlag />,
		phone: '+1 (979) 326-9493',
		email: 'canada@aibizmod.com',
		address: 'Canada Regional Office',
	},
	{
		code: 'UAE',
		name: 'UAE',
		flag: <UAEFlag />,
		phone: '+971 56 256 7509',
		email: 'uae@aibizmod.com',
		address: 'Middle East Regional Office, Dubai, UAE',
	},
	{
		code: 'SAU',
		name: 'Saudi Arabia',
		flag: <SAUFlag />,
		phone: '+966 56 208 1999',
		email: 'saudi@aibizmod.com',
		address: 'Saudi Arabia Regional Office',
	},
	{
		code: 'KWT',
		name: 'Kuwait',
		flag: <KWTFlag />,
		phone: '+965 9724 3755',
		email: 'kuwait@aibizmod.com',
		address: 'Kuwait Regional Office',
	},
	{
		code: 'SG',
		name: 'Singapore',
		flag: <SGPFlag />,
		phone: '+65 86 111 900',
		email: 'sg@aibizmod.com',
		address: '7 Soon Lee St, #04-39 ISPACE BUILDING, Singapore 627608',
	},
	{
		code: 'MYS',
		name: 'Malaysia',
		flag: <MYSFlag />,
		phone: '+60 10660 7357',
		email: 'malaysia@aibizmod.com',
		address: 'Malaysia Regional Office',
	},
];
