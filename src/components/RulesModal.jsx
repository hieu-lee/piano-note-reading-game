export default function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Luật Đọc Nốt Nhạc Cơ Bản</h2>

        <div className="rule-list">
          <div className="rule-item">
            <div className="rule-number">1</div>
            <div className="rule-body">
              <h4>Nốt nhạc tự nhiên = Phím trắng</h4>
              <p>
                Một nốt nhạc không có dấu thăng (♯) hay giáng (♭) <strong>luôn luôn</strong> tương ứng
                với một <strong>phím trắng</strong> trên đàn piano.
              </p>
              <div className="rule-visual">
                <span className="white-demo-key">Đô</span>
                <span className="white-demo-key">Rê</span>
                <span className="white-demo-key">Mi</span>
                <span className="white-demo-key">Fa</span>
                <span className="white-demo-key">Sol</span>
                <span className="white-demo-key">La</span>
                <span className="white-demo-key">Si</span>
              </div>
            </div>
          </div>

          <div className="rule-item">
            <div className="rule-number">2</div>
            <div className="rule-body">
              <h4>Dấu thăng (♯) = Phím bên phải gần nhất</h4>
              <p>
                Khi một nốt nhạc có <strong>dấu thăng ♯</strong>, bạn lấy phím của nốt đó rồi di chuyển sang
                <strong> phím bên phải gần nhất</strong> (kể cả phím đen).
              </p>
              <p className="rule-example">
                Ví dụ: Đô thăng (C♯) = phím đen bên phải của phím Đô (C)
              </p>
            </div>
          </div>

          <div className="rule-item">
            <div className="rule-number">3</div>
            <div className="rule-body">
              <h4>Dấu giáng (♭) = Phím bên trái gần nhất</h4>
              <p>
                Khi một nốt nhạc có <strong>dấu giáng ♭</strong>, bạn lấy phím của nốt đó rồi di chuyển sang
                <strong> phím bên trái gần nhất</strong> (kể cả phím đen).
              </p>
              <p className="rule-example">
                Ví dụ: Rê giáng (D♭) = phím đen bên trái của phím Rê (D)<br/>
                Lưu ý: Đô giáng (C♭) = Si (B), vì bên trái phím Đô là phím Si (phím trắng)
              </p>
            </div>
          </div>

          <div className="rule-item">
            <div className="rule-number">4</div>
            <div className="rule-body">
              <h4>Nốt dịch lên nửa dòng kẻ = Phím trắng bên phải</h4>
              <p>
                Trên khuông nhạc, khi một nốt <strong>dịch lên nửa dòng kẻ</strong> (từ dòng lên khe, hoặc từ khe lên dòng),
                nốt mới tương ứng với <strong>phím trắng gần nhất bên phải</strong> của phím ban đầu trên đàn piano.
              </p>
              <p className="rule-example">
                Ví dụ: Mi (E) dịch lên nửa dòng → Fa (F)
              </p>
            </div>
          </div>

          <div className="rule-item">
            <div className="rule-number">5</div>
            <div className="rule-body">
              <h4>Nốt dịch xuống nửa dòng kẻ = Phím trắng bên trái</h4>
              <p>
                Trên khuông nhạc, khi một nốt <strong>dịch xuống nửa dòng kẻ</strong>,
                nốt mới tương ứng với <strong>phím trắng gần nhất bên trái</strong> của phím ban đầu trên đàn piano.
              </p>
              <p className="rule-example">
                Ví dụ: Fa (F) dịch xuống nửa dòng → Mi (E)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
