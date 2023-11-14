import { authenticator } from "otplib";

const secret = authenticator.generateSecret();
const token = authenticator.generate(secret);
try {
  const isValid = authenticator.verify({ token, secret });

  console.log(isValid);
} catch (err) {
  // Possible errors
  // - options validation
  // - "Invalid input - it is not base32 encoded string" (if thiry-two is used)
  console.error(err);
}
