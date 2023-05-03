/* eslint-disable indent */
import exprees from 'express';

export const router = exprees.Router();

router.get(
    '/profile',
    (req, res) => {
      res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token,
      });
    },
  );