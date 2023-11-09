import jwt from 'jsonwebtoken';

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in environment variables.');
}

const generateToken = (res: any, userId: object) => {
  const rememberMe = res.req.body.rememberMe ? true : false;

  const howLong = !rememberMe ? '30d' : '1d';
  const maxAge = rememberMe
    ? 1000 * 60 * 60 * 24 * 30
    : 1000 * 60 * 60 * 24;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: howLong,
  });

  res.cookie('refreshToken', token, {
    httpOnly: true,
    maxAge: maxAge,
    secure: process.env.NODE_ENV === 'production' ? true : false,
  });
};

export default generateToken;
