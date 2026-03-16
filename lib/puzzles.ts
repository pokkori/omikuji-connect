export interface OmikujiWord {
  word: string;
  category: "work" | "love" | "health" | "money";
  emoji: string;
}

export interface DailyPuzzle {
  date: string;
  words: OmikujiWord[];
  theme: string;
}

const ALL_PUZZLES: DailyPuzzle[] = [
  {
    date: "2026-03-16",
    theme: "春の訪れ",
    words: [
      // 仕事運
      { word: "昇進", category: "work", emoji: "📈" },
      { word: "商談成立", category: "work", emoji: "🤝" },
      { word: "新企画採用", category: "work", emoji: "💡" },
      { word: "評価アップ", category: "work", emoji: "⭐" },
      // 恋愛運
      { word: "告白成功", category: "love", emoji: "💕" },
      { word: "運命の出会い", category: "love", emoji: "✨" },
      { word: "復縁チャンス", category: "love", emoji: "🌸" },
      { word: "デートで笑顔", category: "love", emoji: "😊" },
      // 健康運
      { word: "快眠続く", category: "health", emoji: "😴" },
      { word: "体力充実", category: "health", emoji: "💪" },
      { word: "肌つや良好", category: "health", emoji: "✨" },
      { word: "食欲旺盛", category: "health", emoji: "🍱" },
      // 金運
      { word: "臨時収入", category: "money", emoji: "💰" },
      { word: "投資好調", category: "money", emoji: "📊" },
      { word: "節約成功", category: "money", emoji: "🏦" },
      { word: "懸賞当選", category: "money", emoji: "🎯" },
    ],
  },
  {
    date: "2026-03-17",
    theme: "縁起物",
    words: [
      { word: "プレゼン完璧", category: "work", emoji: "🎤" },
      { word: "残業なし", category: "work", emoji: "🏠" },
      { word: "同僚と絆", category: "work", emoji: "👫" },
      { word: "資格合格", category: "work", emoji: "📜" },
      { word: "ときめき急増", category: "love", emoji: "💘" },
      { word: "相性抜群", category: "love", emoji: "🔮" },
      { word: "プロポーズ", category: "love", emoji: "💍" },
      { word: "片想い成就", category: "love", emoji: "🌹" },
      { word: "ぐっすり眠れる", category: "health", emoji: "🌙" },
      { word: "風邪知らず", category: "health", emoji: "🛡️" },
      { word: "ストレス解消", category: "health", emoji: "🧘" },
      { word: "元気いっぱい", category: "health", emoji: "⚡" },
      { word: "宝くじ当選", category: "money", emoji: "🎰" },
      { word: "給料アップ", category: "money", emoji: "💹" },
      { word: "副収入獲得", category: "money", emoji: "💎" },
      { word: "ボーナス増額", category: "money", emoji: "🎁" },
    ],
  },
  {
    date: "2026-03-18",
    theme: "吉日",
    words: [
      { word: "大型受注", category: "work", emoji: "📋" },
      { word: "チームリーダー", category: "work", emoji: "👑" },
      { word: "アイデア炸裂", category: "work", emoji: "🎆" },
      { word: "締切余裕", category: "work", emoji: "⏰" },
      { word: "恋文届く", category: "love", emoji: "💌" },
      { word: "キスに発展", category: "love", emoji: "💋" },
      { word: "結婚話浮上", category: "love", emoji: "🏠" },
      { word: "好きな人と話", category: "love", emoji: "💬" },
      { word: "健診オールA", category: "health", emoji: "🏥" },
      { word: "走れる体力", category: "health", emoji: "🏃" },
      { word: "心に余裕", category: "health", emoji: "🌈" },
      { word: "ケガ回避", category: "health", emoji: "🍀" },
      { word: "財布重くなる", category: "money", emoji: "👛" },
      { word: "株上昇", category: "money", emoji: "📈" },
      { word: "無駄遣いゼロ", category: "money", emoji: "🎯" },
      { word: "お小遣い増", category: "money", emoji: "🪙" },
    ],
  },
];

// 決定論的に今日のパズルを選ぶ（同じ日は全員同じ問題）
export function getTodayPuzzle(): DailyPuzzle {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const found = ALL_PUZZLES.find((p) => p.date === dateStr);
  if (found) return found;
  // フォールバック: 日付のハッシュで選ぶ
  const dayNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return ALL_PUZZLES[dayNum % ALL_PUZZLES.length];
}

export const CATEGORY_LABELS: Record<string, { label: string; emoji: string; color: string; bg: string }> = {
  work:   { label: "仕事運", emoji: "💼", color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  love:   { label: "恋愛運", emoji: "💕", color: "#ec4899", bg: "rgba(236,72,153,0.15)" },
  health: { label: "健康運", emoji: "💚", color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
  money:  { label: "金運",   emoji: "💰", color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
};
