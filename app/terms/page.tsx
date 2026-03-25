import Link from 'next/link';

export const metadata = {
  title: '利用規約 | おみくじコネクト',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen p-6" style={{ background: 'linear-gradient(160deg, #0d0d1a 0%, #1a1030 60%, #0d0d1a 100%)' }}>
      <div className="max-w-2xl mx-auto" style={{ backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: '16px', padding: '32px' }}>
        <h1 className="text-2xl font-bold text-white mb-6">利用規約</h1>
        <div style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
          <p style={{ marginBottom: '16px' }}>本利用規約（以下「本規約」）は、ポッコリラボ（以下「当社」）が提供するおみくじコネクト（以下「本サービス」）の利用条件を定めるものです。</p>
          <h2 style={{ fontWeight: 700, marginBottom: '8px', color: '#fbbf24' }}>第1条（適用）</h2>
          <p style={{ marginBottom: '16px' }}>本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。</p>
          <h2 style={{ fontWeight: 700, marginBottom: '8px', color: '#fbbf24' }}>第2条（AI運勢診断について）</h2>
          <p style={{ marginBottom: '16px' }}>AI運勢診断の結果はエンターテインメント目的のものであり、実際の運勢を保証するものではありません。</p>
          <h2 style={{ fontWeight: 700, marginBottom: '8px', color: '#fbbf24' }}>第3条（禁止事項）</h2>
          <p style={{ marginBottom: '16px' }}>ユーザーは、本サービスの利用にあたり、法令または本規約に違反する行為、当社または第三者の権利を侵害する行為を行ってはなりません。</p>
          <h2 style={{ fontWeight: 700, marginBottom: '8px', color: '#fbbf24' }}>第4条（免責事項）</h2>
          <p style={{ marginBottom: '16px' }}>当社は、本サービスに事実上または法律上の瑕疵がないことを保証しません。</p>
          <h2 style={{ fontWeight: 700, marginBottom: '8px', color: '#fbbf24' }}>第5条（サービス内容の変更等）</h2>
          <p style={{ marginBottom: '16px' }}>当社は、ユーザーへの事前の告知なくして、本サービスの内容を変更しまたは本サービスの提供を中止することができます。</p>
          <p style={{ marginTop: '24px', color: 'rgba(255,255,255,0.4)' }}>2026年3月25日 制定</p>
        </div>
        <div className="mt-8 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <Link href="/" style={{ color: '#fbbf24' }} aria-label="ホームに戻る">ホームに戻る</Link>
          {' / '}
          <Link href="/legal" style={{ color: '#fbbf24' }} aria-label="特定商取引法に基づく表記を見る">特定商取引法</Link>
          {' / '}
          <Link href="/privacy" style={{ color: '#fbbf24' }} aria-label="プライバシーポリシーを見る">プライバシーポリシー</Link>
        </div>
      </div>
    </main>
  );
}
