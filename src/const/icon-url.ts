import { PointExpression } from 'leaflet';

export const IconrUrl = {
  Default: '/img/svg/pin-default.svg',
  Active: '/img/svg/pin-active.svg',
} as const;

export const IconSize = {
  Size: [27, 39] as PointExpression,
  Anchor: [13.5, 39] as PointExpression,
} as const;
