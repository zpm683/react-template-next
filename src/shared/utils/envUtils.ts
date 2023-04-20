const isBrowser = () =>
  !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );

const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const getBaseURL = () => import.meta.env.BASE_URL;

const getApiServerURL = () => import.meta.env.ENV_API_URL;

const getApiTimeOut = () => {
  const timeout = Number(import.meta.env.ENV_API_TIME_OUT);

  return Number.isNaN(timeout) ? undefined : timeout;
};

export { isSafari, isBrowser, getBaseURL, getApiServerURL, getApiTimeOut };
