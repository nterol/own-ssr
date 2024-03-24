import { ViteDevServer } from "vite";
import urlToFilePath from "../utils/url-to-file-path";

export default function getServerData({ vite }: { vite: ViteDevServer }) {
  return async (req, res) => {
    const url = req.originalUrl.replace("/data/", "");

    const { getServerSideProps } = await vite.ssrLoadModule(
      `/src/pages/${urlToFilePath(url)}`
    );

    const { props } = (await getServerSideProps?.({ url })) ?? {};

    res.status(200).json(props);
  };
}
