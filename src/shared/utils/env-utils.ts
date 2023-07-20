const isBrowser = () =>
  !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );

const getUserAgent = () => {
  return window.navigator.userAgent;
};

const isSafari = () => {
  return /\bsafari\b/i.test(getUserAgent());
};

const isChrome = () => {
  return /\bchrome\b/i.test(getUserAgent());
};

const isSafariOrChrome = () => {
  return /\b(safari|chrome)\b/i.test(getUserAgent());
};

const isFirefox = () => {
  return /\b(firefox|gecko)\b/i.test(getUserAgent());
};

const isOpera = () => {
  return /\bopera\b/i.test(getUserAgent());
};

const isIE = () => {
  return /\bmsie\b/i.test(getUserAgent());
};

const isOnLine = () => {
  return window.navigator.onLine;
};

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

const getBaseURL = () => import.meta.env.BASE_URL;

const getApiServerURL = () => import.meta.env.ENV_API_URL;

const getApiTimeOut = () => {
  const timeout = Number(import.meta.env.ENV_API_TIME_OUT);

  return Number.isNaN(timeout) ? undefined : timeout;
};

export {
  isSafari,
  isChrome,
  isSafariOrChrome,
  isFirefox,
  isOpera,
  isIE,
  isOnLine,
  getCookie,
  isBrowser,
  getBaseURL,
  getApiServerURL,
  getApiTimeOut,
  getUserAgent,
};
