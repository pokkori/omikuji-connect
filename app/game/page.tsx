"use client";

import { useState, useCallback, useEffect } from "react";
import { getTodayPuzzle, CATEGORY_LABELS, OmikujiWord } from "@/lib/puzzles";

type Category = "work" | "love" | "health" | "money";

interface FortuneResult {
  fortune: string;
  message: string;
  advice: string;
}

const FORTUNE_EMOJI: Record<string, string> = {
  大吉: "🎉", 吉: "😊", 中吉: "🌸", 小吉: "🍀",
  末吉: "🌱", 凶: "🔥",
};
const MAX_MISTAKES = 3;

export default function GamePage() {
  const puzzle = getTodayPuzzle();
  const [shuffled, setShuffled] = useState<OmikujiWord[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [solved, setSolved] = useState<Category[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [shakeActive, setShakeActive] = useState(false);
  const [result, setResult] = useState<FortuneResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  useEffect(() => {
    const arr = [...puzzle.words];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setShuffled(arr);

    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem("omikuji_last");
    const currentStreak = parseInt(localStorage.getItem("omikuji_streak") || "0");
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastPlayed === yesterday) {
      setStreak(currentStreak);
    } else if (lastPlayed !== today) {
      setStreak(0);
    } else {
      setStreak(currentStreak);
    }
  }, []);

  const toggleSelect = useCallback((idx: number) => {
    if (gameOver) return;
    const cat = shuffled[idx]?.category;
    if (solved.includes(cat as Category)) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else if (next.size < 4) next.add(idx);
      return next;
    });
  }, [shuffled, solved, gameOver]);

  const submitGuess = useCallback(async () => {
    if (selected.size !== 4) return;
    const selectedWords = Array.from(selected).map(i => shuffled[i]);
    const categories = selectedWords.map(w => w.category);
    const allSame = categories.every(c => c === categories[0]);
    if (allSame) {
      const cat = categories[0] as Category;
      const newSolved = [...solved, cat];
      setSolved(newSolved);
      setSelected(new Set());

      if (newSolved.length === 4) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem("omikuji_streak", String(newStreak));
        localStorage.setItem("omikuji_last", new Date().toDateString());
        setGameOver(true);
        setIsLoading(true);
        try {
          const res = await fetch("/api/fortune", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correctCount: 4, totalCount: 4, theme: puzzle.theme }),
          });
          const data = await res.json();
          setResult(data);
        } catch {
          setResult({ fortune: "大吉", message: "完璧です！今日は最高の一日になります🎉", advice: "このまま全力で駆け抜けましょう" });
        }
        setIsLoading(false);
      }
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setShakeActive(true);
      setTimeout(() => setShakeActive(false), 400);
      setSelected(new Set());

      if (newMistakes >= MAX_MISTAKES) {
        setGameOver(true);
        setIsLoading(true);
        try {
          const res = await fetch("/api/fortune", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correctCount: solved.length, totalCount: 4, theme: puzzle.theme }),
          });
          const data = await res.json();
          setResult(data);
        } catch {
          setResult({ fortune: "凶", message: "今日は慎重に。明日また挑戦しよう🌱", advice: "休息も大切な運気の豊め時です" });
        }
        setIsLoading(false);
      }
    }
  }, [selected, shuffled, solved, mistakes, puzzle.theme, streak]);

  const buildShareText = (r: FortuneResult) => {
    const catText = solved.length === 4 ? "全問正解！" : solved.length + "/4カテゴリ正解";
    const shareLines = [
      "🎋 おみくじコネクト 今日の結果",
      r.fortune + " " + (FORTUNE_EMOJI[r.fortune] || "✨"),
      catText,
      r.message,
      "連続" + streak + "日達成！",
      "#おみくじコネクト",
      "https://omikuji-connect.vercel.app",
    ];
    return shareLines.join("\n");
  };

  const shareUrl = result
    ? "https://twitter.com/intent/tweet?text=" + encodeURIComponent(buildShareText(result))
    : "";

  const remainingWords = shuffled.filter(w => !solved.includes(w.category as Category));
  return (
    <div className="min-h-dvh flex flex-col px-3 py-4"
      style={{ background: "linear-gradient(160deg, #0d0d1a, #1a1030)" }}>

      <div className="flex items-center justify-between mb-3">
        <a href="/" className="text-amber-600 text-sm">← トップ</a>
        <h1 className="font-black text-lg" style={{ color: "#fbbf24" }}>おみくじコネクト</h1>
        <div className="text-xs text-amber-600">
          {streak > 0 ? streak + "日連続" : "今日"}
        </div>
      </div>

      <div className="text-center mb-3">
        <span className="text-xs text-amber-600">今日のテーマ: </span>
        <span className="text-sm font-bold text-amber-300">{puzzle.theme}</span>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
          <span key={i} className="text-xl" style={{ opacity: i < MAX_MISTAKES - mistakes ? 1 : 0.2 }}>
            🔮
          </span>
        ))}
      </div>

      {solved.map(cat => {
        const info = CATEGORY_LABELS[cat];
        const catWords = puzzle.words.filter(w => w.category === cat);
        return (
          <div key={cat} className="rounded-xl p-3 mb-2 bounce-in"
            style={{ background: info.bg, border: "1px solid " + info.color + "40" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{info.emoji}</span>
              <span className="font-black text-sm" style={{ color: info.color }}>{info.label}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {catWords.map((w, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded-full font-bold text-white"
                  style={{ background: info.color }}>
                  {w.emoji} {w.word}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      {!gameOver && (
        <>
          <div className={"grid grid-cols-4 gap-2 mb-4 " + (shakeActive ? "wrong-shake" : "")}>
            {remainingWords.map((word, idx) => {
              const originalIdx = shuffled.indexOf(word);
              const isSelected = selected.has(originalIdx);
              return (
                <button
                  key={word.word + "-" + idx}
                  onClick={() => toggleSelect(originalIdx)}
                  className="rounded-xl p-2 text-center transition-all active:scale-95"
                  aria-label={`${word.word}を${isSelected ? "選択解除" : "選択"}する`}
                  aria-pressed={isSelected}
                  style={{
                    background: isSelected ? "rgba(251,191,36,0.3)" : "rgba(255,255,255,0.06)",
                    border: isSelected ? "2px solid #fbbf24" : "1px solid rgba(255,255,255,0.1)",
                    minHeight: "64px",
                  }}
                >
                  <div className="text-lg" aria-hidden="true">{word.emoji}</div>
                  <div className="text-xs font-bold text-amber-100 leading-tight mt-0.5">{word.word}</div>
                </button>
              );
            })}
          </div>

          <button
            onClick={submitGuess}
            disabled={selected.size !== 4}
            className="w-full py-3 rounded-xl font-black text-base transition-all active:scale-95 min-h-[44px]"
            aria-label={selected.size === 4 ? "4枚選択済み — 答えを決定する" : `${selected.size}枚選択中 — あと${4 - selected.size}枚選んでください`}
            style={selected.size === 4
              ? { background: "linear-gradient(135deg,#fbbf24,#d97706)", color: "#1a0a00" }
              : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", cursor: "not-allowed" }
            }
          >
            {selected.size === 4 ? "決定！" : selected.size + "/4 選択中"}
          </button>
        </>
      )}

      {gameOver && (
        <div className="mt-4 bounce-in">
          {isLoading ? (
            <div className="text-center text-amber-300 animate-pulse py-8">🔮 AIが運勢を占っています...</div>
          ) : result ? (
            <div className="rounded-2xl p-5 text-center"
              style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.3)" }}>
              <div className="text-5xl mb-2">{FORTUNE_EMOJI[result.fortune] || "✨"}</div>
              <div className="text-3xl font-black mb-2" style={{ color: "#fbbf24" }}>{result.fortune}</div>
              <div className="text-amber-200 text-sm mb-1">{result.message}</div>
              <div className="text-amber-500 text-xs mb-4">{result.advice}</div>
              <div className="text-amber-600 text-xs mb-4">連続 {streak} 日達成！</div>
              <div className="space-y-2">
                <a href={shareUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm"
                  style={{ background: "#000", color: "#fff" }}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Xでシェア
                </a>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}