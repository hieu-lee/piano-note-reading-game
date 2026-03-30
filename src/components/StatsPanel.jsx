export default function StatsPanel({ total, correct, times }) {
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const avgTime = times.length > 0
    ? (times.reduce((a, b) => a + b, 0) / times.length / 1000).toFixed(1)
    : '—';

  return (
    <div className="stats-panel">
      <div className="stat-item">
        <span className="stat-value">{total}</span>
        <span className="stat-label">Câu hỏi</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{correct}</span>
        <span className="stat-label">Đúng</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{accuracy}%</span>
        <span className="stat-label">Tỉ lệ</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{avgTime}s</span>
        <span className="stat-label">TB thời gian</span>
      </div>
    </div>
  );
}
