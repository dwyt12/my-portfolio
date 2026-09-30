// Frees up PORT before the server starts, so a leftover process from a
// previous run (a common issue with `node --watch` on Windows when a
// terminal gets closed instead of Ctrl+C'd) never blocks the new one.
// Runs automatically via the "predev"/"prestart" npm scripts — you
// shouldn't need to run this by hand.
import { execSync } from "node:child_process";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5174;

function killWindows(port) {
  let out;
  try {
    out = execSync(`netstat -ano | findstr :${port}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return; // nothing listening on this port — normal case
  }

  const pids = new Set(
    out
      .split("\n")
      .filter((line) => line.includes("LISTENING"))
      .map((line) => line.trim().split(/\s+/).pop())
      .filter((pid) => pid && /^\d+$/.test(pid) && pid !== "0")
  );

  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
      console.log(`[free-port] Stopped stray process on port ${port} (PID ${pid})`);
    } catch {
      // Already gone, or no permission — safe to ignore.
    }
  }
}

function killUnix(port) {
  let out;
  try {
    out = execSync(`lsof -ti tcp:${port}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return; // nothing listening on this port (or lsof unavailable) — normal case
  }
  if (!out) return;

  for (const pid of out.split("\n")) {
    try {
      execSync(`kill -9 ${pid}`, { stdio: "ignore" });
      console.log(`[free-port] Stopped stray process on port ${port} (PID ${pid})`);
    } catch {
      // Already gone — safe to ignore.
    }
  }
}

try {
  if (process.platform === "win32") {
    killWindows(PORT);
  } else {
    killUnix(PORT);
  }
} catch (err) {
  // Never block the actual server start over a cleanup failure.
  console.warn("[free-port] Skipped port cleanup:", err.message);
}
