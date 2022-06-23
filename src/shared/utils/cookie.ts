export function setCookie(name: string, val: string, duration: number) {
  const date = new Date();
  const value = val;

  // duration in minutes
  date.setTime(date.getTime() + duration * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}

export function deleteCookie(name: string) {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
}
