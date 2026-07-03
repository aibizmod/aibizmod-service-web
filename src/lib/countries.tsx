import type { ReactNode } from "react";

const USAFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" className="rounded-sm shrink-0" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#B22234" />
    <path d="M0 1.08h20M0 3.23h20M0 5.38h20M0 7.54h20M0 9.69h20M0 11.85h20" stroke="#FFF" strokeWidth="1.08" />
    <rect width="10" height="7.54" fill="#3C3B6E" />
    <circle cx="2" cy="1.8" r="0.45" fill="#FFF" />
    <circle cx="5" cy="1.8" r="0.45" fill="#FFF" />
    <circle cx="8" cy="1.8" r="0.45" fill="#FFF" />
    <circle cx="3.5" cy="3.8" r="0.45" fill="#FFF" />
    <circle cx="6.5" cy="3.8" r="0.45" fill="#FFF" />
    <circle cx="2" cy="5.8" r="0.45" fill="#FFF" />
    <circle cx="5" cy="5.8" r="0.45" fill="#FFF" />
    <circle cx="8" cy="5.8" r="0.45" fill="#FFF" />
  </svg>
);

const UAEFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" className="rounded-sm shrink-0" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" fill="#FFF" />
    <rect y="0" width="20" height="4.67" fill="#00732F" />
    <rect y="9.33" width="20" height="4.67" fill="#000" />
    <rect x="0" y="0" width="5.33" height="14" fill="#FF0000" />
  </svg>
);

const SGPFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" className="rounded-sm shrink-0" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="7" fill="#ED2939" />
    <rect y="7" width="20" height="7" fill="#FFF" />
    <path d="M 2.5 1.8 A 1.8 1.8 0 0 0 5 4 A 1.8 1.8 0 0 1 2.5 1.8 Z" fill="#FFF" />
    <circle cx="4.2" cy="2" r="0.35" fill="#FFF" />
    <circle cx="4.8" cy="2.8" r="0.35" fill="#FFF" />
    <circle cx="3.8" cy="3.3" r="0.35" fill="#FFF" />
    <circle cx="3" cy="2.6" r="0.35" fill="#FFF" />
  </svg>
);

export interface Country {
  code: string;
  flag: ReactNode;
  phone: string;
  email: string;
  address: string;
}

export const countries: Country[] = [
  {
    code: "USA",
    flag: <USAFlag />,
    phone: "+1 646 421 5740",
    email: "usa@aibizmod.com",
    address: "2500 MARCONI AVE, STE 101, SACRAMENTO, CA 95821 USA",
  },
  {
    code: "UAE",
    flag: <UAEFlag />,
    phone: "+971 56 256 7509",
    email: "uae@aibizmod.com",
    address: "Middle East Regional Office, Dubai, UAE",
  },
  {
    code: "Singapore",
    flag: <SGPFlag />,
    phone: "+65 86 111 900",
    email: "sg@aibizmod.com",
    address: "7 Soon Lee St, #04-39 ISPACE BUILDING, Singapore 627608",
  },
];
