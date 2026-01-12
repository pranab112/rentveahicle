export const getTenantSlug = (): string | null => {
  // 1. Check URL param (dev override)
  const params = new URLSearchParams(window.location.search);
  const paramTenant = params.get('tenant');
  if (paramTenant) return paramTenant;

  // 2. Check LocalStorage (dev persistence)
  try {
    const stored = localStorage.getItem('fleetlink_tenant');
    if (stored) return stored;
  } catch (e) {
    // Ignore storage errors
  }

  // 3. Check Subdomain (production)
  const host = window.location.hostname;
  // logic: sub.domain.com
  const parts = host.split('.');
  if (parts.length > 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
    return parts[0];
  }

  return null; 
};

// Convert Hex color to HSL for Tailwind CSS variable injection
// Tailwind variable format in index.html is "H S% L%" (no commas)
export const hexToHsl = (hex: string): string => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt("0x" + hex[1] + hex[1]);
    g = parseInt("0x" + hex[2] + hex[2]);
    b = parseInt("0x" + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt("0x" + hex[1] + hex[2]);
    g = parseInt("0x" + hex[3] + hex[4]);
    b = parseInt("0x" + hex[5] + hex[6]);
  }
  
  r /= 255;
  g /= 255;
  b /= 255;
  
  const cmin = Math.min(r,g,b), cmax = Math.max(r,g,b), delta = cmax - cmin;
  let h = 0, s = 0, l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `${h} ${s}% ${l}%`;
};