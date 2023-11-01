import jwt from 'jsonwebtoken';

//TODO: create variable for token expiration

const generateToken = (res: any, userId: object) => {
  const howLong = res.rememeberMe ? '30d' : '1d';

  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: howLong,
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
};

export default generateToken;
