import { Matrix4, Transforms3d, Vec3, multiply4, processTransform3d } from './Matrix4';

export const vec3 = (x: number, y: number, z: number) => [x, y, z] as const;

export const transformOrigin3d = (origin: Vec3, transform: Transforms3d): Transforms3d => {
  'worklet';
  return [
    { translateX: origin[0] },
    { translateY: origin[1] },
    { translateZ: origin[2] },
    ...transform,
    { translateX: -origin[0] },
    { translateY: -origin[1] },
    { translateZ: -origin[2] },
  ];
};

// matrix.value = concat(offset.value, origin.value, [{ scale: e.scale }]);
export const concat = (m: Matrix4, origin: Vec3, transform: Transforms3d) => {
  'worklet';
  const transforms = transformOrigin3d(origin, transform);
  const matrix = processTransform3d(transforms);

  return multiply4(m, matrix);
};
