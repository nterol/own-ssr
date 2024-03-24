const urlToFilePath = (url: string) =>
  url[url.length - 1] === "/" ? `${url}index.tsx` : `${url}.tsx`;
export default urlToFilePath;
