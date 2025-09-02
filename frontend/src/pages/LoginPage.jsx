import { useEffect } from "react";

function LoginPage() {
  // Redirect to backend Google OAuth URL on button click
  const handleGoogleSignIn = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || ""}/auth/google`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body text-center">
          <h2 className="card-title mb-4">Login</h2>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-primary btn-outline w-full gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
              className="inline"
            >
              <path fill="#4285F4" d="M24 9.5c3.3 0 6.3 1.2 8.5 3.5L40 8.5C36 4.4 30.5 2 24 2a21 21 0 00-18 10l7 5C..."/>
              {/* Google logo svg paths */}
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
