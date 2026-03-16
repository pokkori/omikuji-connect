import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(160deg, #0d0d1a 0%, #1a1030 60%, #0d0d1a 100%)" }}>

      <div className="text-center mb-8">
        <div className="text-8xl mb-4" style={{ filter: "drop-shadow(0 0 24px rgba(251,191,36,0.6))" }}>🎋</div>
        <h1 className="text-4xl font-black mb-2"
          style={{ color: "#fbbf24", textShadow: "0 0 20px rgba(251,191,36,0.4)" }}>
          おみくじコネクト
        </h1>
        <p className="text-amber-300 text-lg font-bold mb-1">毎日1問・運勢パズル</p>
        <p className="text-amber-600 text-sm">16枚の運勢ワードを4つのカテゴリに分類しよう</p>
      </div>

      <Link href="/game"
        className="inline-block px-14 py-4 rounded-2xl text-xl font-black mb-10 transition-all active:scale-95"
        style={{
          background: "linear-gradient(135deg, #fbbf24, #d97706)",
          color: "#1a0a00",
          boxShadow: "0 0 30px rgba(251,191,36,0.4)",
        }}>
        今日のおみくじを引く 🎋
      </Link>

      <div className="w-full max-w-sm space-y-3">
        {[
          { icon: "🃏", title: "16枚のワードを分類", desc: "仕事運・恋愛運・健康運・金運の4グループに振り分ける" },
          { icon: "🤔", title: "どのカテゴリ？考えよう", desc: "間違えると炎が燃える。3ミスでおみくじが燃え尽きる！" },
          { icon: "🤖", title: "AI運勢診断", desc: "正解数に応じてAIが「大吉〜凶」を判定・メッセージ生成" },
          { icon: "📤", title: "Xでシェア", desc: "全国同じ問題。今日の結果を友達と競おう" },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-center p-3 rounded-xl"
            style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
            <span className="text-2xl">{item.icon}</span>
            <div>
              <div className="font-bold text-amber-200 text-sm">{item.title}</div>
              <div className="text-xs text-amber-600">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-xs text-amber-800 text-center">
        毎日0:00に新しい問題が更新されます
      </div>
    </div>
  );
}
