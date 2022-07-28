import { imgixUrl } from "./constants";

export const elementIsOnscreen = (element: Element | HTMLElement): boolean => {
  if (typeof window === "undefined") return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= window.innerHeight
  );
};

export const scrollToAnchor = (anchor: string): void => {
  if (typeof window === 'undefined') return;
  const anchorElement = document.querySelector(anchor);
  if (anchorElement) {
    anchorElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export const shortenAddress = (address: string): string => {
  const sliceNumber = 4
  const start: string = address.toLowerCase().slice(0, sliceNumber)
  const end: string = address.toLowerCase().slice(Math.max(0, address.length - sliceNumber))
  const shortAddress = `${start}...${end}`
  return shortAddress
}


export const buildImgUrl = (img: string, path: string): string => `${imgixUrl}/${path}/${img}`;