const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "" : "http://localhost:8000");

export async function analyzeText(text) {
  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Unable to analyze content.");
  }

  return response.json();
}