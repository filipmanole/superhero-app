import crypto from "crypto";
import KSUID from "ksuid";

export const generateID = (timestamp: Date) => {
  const payload = crypto.randomBytes(16);
  return KSUID.fromParts(+timestamp, payload).string;
};
