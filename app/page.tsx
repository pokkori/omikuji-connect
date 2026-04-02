import Link from "next/link";

function OmikujiIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="omi-g" x1="20" y1="10" x2="76" y2="86" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* bamboo sticks container */}
      <rect x="30" y="40" width="36" height="48" rx="4" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="1.5" />
      {/* sticks */}
      <rect x="38" y="20" width="4" height="45" rx="2" fill="url(#omi-g)" />
      <rect x="46" y="15" width="4" height="50" rx="2" fill="url(#omi-g)" opacity="0.8" />
      <rect x="54" y="22" width="4" height="43" rx="2" fill="url(#omi-g)" opacity="0.9" />
      {/* sparkles */}
      <circle cx="28" cy="25" r="2.5" fill="#fbbf24" opacity="0.6" />
      <circle cx="70" cy="30" r="2" fill="#fbbf24" opacity="0.4" />
      <circle cx="75" cy="18" r="1.5" fill="#fbbf24" opacity="0.5" />
      {/* kanji on container */}
      <text x="48" y="78" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fbbf24" opacity="0.7">御神籤</text>
    </svg>
  );
}

function FloatingParticles() {
  const particles = [
    { x: 10, y: 25, size: 4, dur: 6, del: 0 },
    { x: 80, y: 40, size: 3, dur: 5, del: 1 },
    { x: 50, y: 70, size: 5, dur: 7, del: 0.5 },
    { x: 65, y: 15, size: 3, dur: 5.5, del: 2 },
    { x: 30, y: 55, size: 4, dur: 6.5, del: 1.3 },
    { x: 88, y: 65, size: 3, dur: 5, del: 0.7 },
    { x: 15, y: 80, size: 3.5, dur: 6, del: 1.8 },
  ];
  return (
    <>
      <style>{`
        @keyframes goldFloat {
          0% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-25px) scale(1.4); opacity: 0.5; }
          100% { transform: translateY(0) scale(1); opacity: 0.2; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(251,191,36,0.3), 0 0 40px rgba(251,191,36,0.15); }
          50% { box-shadow: 0 0 30px rgba(251,191,36,0.5), 0 0 60px rgba(251,191,36,0.25); }
        }
      `}</style>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(251,191,36,0.5) 0%, transparent 70%)`,
            animation: `goldFloat ${p.dur}s ease-in-out ${p.del}s infinite`,
          }}
        />
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      role="main"
      aria-label="おみくじコネクト ホーム"
      style={{
        background: `radial-gradient(ellipse at 20% 50%, rgba(120,119,198,0.15) 0%, transparent 50%),
                     radial-gradient(ellipse at 80% 20%, rgba(255,119,198,0.1) 0%, transparent 50%),
                     radial-gradient(ellipse at 50% 80%, rgba(99,179,237,0.1) 0%, transparent 50%),
                     #0F0F1A`,
      }}
    >
      <FloatingParticles />

      <div className="text-center mb-8 relative z-10">
        <div className="mb-4" style={{ filter: "drop-shadow(0 0 24px rgba(251,191,36,0.5))" }}>
          <OmikujiIcon />
        </div>
        <h1
          className="text-4xl font-black mb-2"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 8px rgba(251,191,36,0.4))',
          }}
        >
          おみくじコネクト
        </h1>
        <p className="text-amber-300 text-lg font-bold mb-1">毎日1問 / 運勢パズル</p>
        <p className="text-amber-600 text-sm">16枚の運勢ワードを4つのカテゴリに分類しよう</p>
      </div>

      <Link href="/game"
        className="relative z-10 inline-block px-14 py-4 rounded-2xl text-xl font-black mb-10 transition-all hover:scale-105 active:scale-95 min-h-[52px]"
        aria-label="今日のおみくじコネクトを引いてプレイする"
        style={{
          background: "linear-gradient(135deg, #fbbf24, #d97706)",
          color: "#1a0a00",
          animation: 'pulseGlow 3s ease-in-out infinite',
        }}>
        今日のおみくじを引く
      </Link>

      <div className="w-full max-w-sm space-y-3 relative z-10" role="list" aria-label="ゲームの特徴">
        {[
          { title: "16枚のワードを分類", desc: "仕事運・恋愛運・健康運・金運の4グループに振り分ける" },
          { title: "どのカテゴリ?考えよう", desc: "間違えると炎が燃える。3ミスでおみくじが燃え尽きる!" },
          { title: "AI運勢診断", desc: "正解数に応じてAIが「大吉~凶」を判定・メッセージ生成" },
          { title: "Xでシェア", desc: "全国同じ問題。今日の結果を友達と競おう" },
        ].map((item) => (
          <div key={item.title} role="listitem" className="flex gap-3 items-center p-4 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
            <div>
              <div className="font-bold text-amber-200 text-sm">{item.title}</div>
              <div className="text-xs text-gray-400">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-xs text-gray-500 text-center relative z-10">
        毎日0:00に新しい問題が更新されます
      </div>

      <footer className="mt-6 text-xs text-center relative z-10" style={{ color: "rgba(255,255,255,0.3)" }}>
        <Link href="/legal" className="hover:text-amber-400 transition-colors" aria-label="特定商取引法に基づく表記">特定商取引法</Link>
        {' / '}
        <Link href="/privacy" className="hover:text-amber-400 transition-colors" aria-label="プライバシーポリシー">プライバシーポリシー</Link>
        {' / '}
        <Link href="/terms" className="hover:text-amber-400 transition-colors" aria-label="利用規約">利用規約</Link>
        <div className="mt-1">© 2026 ポッコリラボ</div>
      </footer>
    </div>
  );
}
