import { useState } from "react";

const API_URL = (
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? "http://localhost:5001" : "")
).replace(/\/$/, "");

const AuthModal = ({ initialMode = "login", onClose, onAuthenticated, backdropImage }) => {
    const [mode, setMode] = useState(initialMode);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isSignup = mode === "signup";

    const changeMode = (nextMode) => {
        setMode(nextMode);
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (isSignup && password !== confirmPassword) {
            setError("Those passwords do not match.");
            return;
        }

        if (!API_URL) {
            setError("Account access will be available once the API is connected.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/api/auth/${isSignup ? "register" : "login"}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...(isSignup ? { name: name.trim() } : {}),
                        email: email.trim(),
                        password
                    })
                }
            );
            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result.message || "Unable to sign in right now.");
            }

            onAuthenticated(result);
        } catch (requestError) {
            setError(
                requestError.message === "Failed to fetch"
                    ? "The account service is unavailable. Please try again shortly."
                    : requestError.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="auth-backdrop"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            style={{ "--auth-image": `url("${backdropImage}")` }}
        >
            <section
                aria-labelledby="auth-title"
                aria-modal="true"
                className="auth-panel"
                role="dialog"
            >
                <button
                    aria-label="Close sign in"
                    className="auth-close"
                    onClick={onClose}
                    type="button"
                >
                    ×
                </button>

                <div className="auth-art" aria-hidden="true">
                    <span className="auth-brand-mark">M</span>
                    <div className="auth-art-copy">
                        <p className="eyebrow">A seat for every story</p>
                        <p className="auth-quote">
                            The best nights begin when the lights go down.
                        </p>
                        <span className="auth-art-rule" />
                        <p className="auth-art-caption">MOVIEHOUSE · EST. FOR THE LOVE OF FILM</p>
                    </div>
                </div>

                <div className="auth-form-side">
                    <div className="auth-switch" role="tablist" aria-label="Account type">
                        <button
                            aria-selected={!isSignup}
                            className={!isSignup ? "active" : ""}
                            onClick={() => changeMode("login")}
                            role="tab"
                            type="button"
                        >
                            Sign in
                        </button>
                        <button
                            aria-selected={isSignup}
                            className={isSignup ? "active" : ""}
                            onClick={() => changeMode("signup")}
                            role="tab"
                            type="button"
                        >
                            Create account
                        </button>
                    </div>

                    <p className="eyebrow auth-eyebrow">WELCOME TO MOVIEHOUSE</p>
                    <h2 id="auth-title" className="auth-title">
                        {isSignup ? "Your next chapter." : "Good to see you."}
                    </h2>
                    <p className="auth-intro">
                        {isSignup
                            ? "Create an account to keep your movie nights close."
                            : "Sign in to pick up where your next movie night begins."}
                    </p>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {isSignup && (
                            <label>
                                <span>Your name</span>
                                <input
                                    autoComplete="name"
                                    maxLength={80}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                    value={name}
                                />
                            </label>
                        )}

                        <label>
                            <span>Email address</span>
                            <input
                                autoComplete="email"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                type="email"
                                value={email}
                            />
                        </label>

                        <label>
                            <span>Password</span>
                            <span className="password-field">
                                <input
                                    autoComplete={isSignup ? "new-password" : "current-password"}
                                    minLength={6}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                />
                                <button
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="password-toggle"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                    type="button"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </span>
                        </label>

                        {isSignup && (
                            <label>
                                <span>Confirm password</span>
                                <input
                                    autoComplete="new-password"
                                    minLength={6}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                />
                            </label>
                        )}

                        {error && <p className="auth-error" role="alert">{error}</p>}

                        <button className="auth-submit" disabled={loading} type="submit">
                            {loading
                                ? "Please wait…"
                                : isSignup
                                    ? "Create account"
                                    : "Sign in"}
                            {!loading && <span aria-hidden="true">↗</span>}
                        </button>
                    </form>

                    <p className="auth-terms">
                        By continuing, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AuthModal;