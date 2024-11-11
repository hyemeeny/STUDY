import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // 특정 페이지를 다시 업데이트하여 생성해줌 => 정적 페이지로 유지
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Revalidation Failed");
  }
}
