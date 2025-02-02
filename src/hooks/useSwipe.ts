import { useState } from 'react';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import type { User } from '../types';

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

export function useSwipe(users: User[], onSwipe: (userId: string, direction: 'left' | 'right') => void) {
  const [gone] = useState(() => new Set());

  const [props, api] = useSprings(users.length, i => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;

    if (!down && trigger) {
      gone.add(index);
      onSwipe(users[index].id, dir === 1 ? 'right' : 'left');
    }

    api.start(i => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1;
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      };
    });
  });

  return { props, bind };
}