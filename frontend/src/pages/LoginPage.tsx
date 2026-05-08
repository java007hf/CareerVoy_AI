export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-logo">CareerVoy AI</div>
      <div className="login-slogan">失业不孤单，副业有方向</div>
      <button className="login-btn login-phone">📱 手机号登录</button>
      <button className="login-wechat login-btn">💚 微信登录</button>
      <p style={{ fontSize: '12px', color: 'var(--sub)', marginTop: '16px' }}>
        登录即代表同意《用户协议》和《隐私政策》
      </p>
    </div>
  );
}
