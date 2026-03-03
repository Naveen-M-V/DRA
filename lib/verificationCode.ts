export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function createCodeKey(email: string): string {
  return `verify_${email}`;
}

// In-memory storage for verification codes (expires after 10 minutes)
const verificationCodes = new Map<string, { code: string; expiresAt: number }>();

export function storeVerificationCode(email: string, code: string) {
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  verificationCodes.set(createCodeKey(email), { code, expiresAt });
}

export function verifyCode(email: string, code: string): boolean {
  const key = createCodeKey(email);
  const stored = verificationCodes.get(key);

  if (!stored) {
    return false;
  }

  if (Date.now() > stored.expiresAt) {
    verificationCodes.delete(key);
    return false;
  }

  if (stored.code !== code) {
    return false;
  }

  verificationCodes.delete(key);
  return true;
}

// Clean up expired codes every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of verificationCodes.entries()) {
    if (now > value.expiresAt) {
      verificationCodes.delete(key);
    }
  }
}, 5 * 60 * 1000);
