import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const dynamic = "force-dynamic";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { correctCount, totalCount, theme } = await req.json();
    const allCorrect = correctCount === totalCount;

    const prompt = `あなたは神社のおみくじAIです。
ユーザーが「${theme}」のおみくじパズルを解きました。
結果: ${correctCount}/${totalCount}カテゴリ正解

${allCorrect ? "全問正解でした！" : `${correctCount}問正解でした。`}

運勢判定と今日のメッセージを以下の形式でJSON返してください：
{
  "fortune": "大吉|吉|中吉|小吉|末吉|凶",
  "message": "今日の運勢メッセージ（50文字以内・絵文字1〜2個含む）",
  "advice": "具体的なアドバイス（40文字以内）"
}

全正解なら大吉〜吉、半分なら中吉〜小吉、1〜2問なら末吉〜凶。JSONのみ返してください。`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "{}";
    const json = JSON.parse(text.replace(/```json\n?|```\n?/g, "").trim());
    return NextResponse.json(json);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ fortune: "吉", message: "今日も良い一日になりますように！🌸", advice: "前向きな気持ちで過ごしましょう" });
  }
}
