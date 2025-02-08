export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // регулярний вираз

export const accessTokenLifetime = 1000 * 60 * 15; // час життя 15 хвилин (1000 = 1 сек, 60 = 1 хв, 15 хвилин)

export const refreshTokenLifetime = 1000 * 60 * 60 * 24 * 7; // час життя 1 тиждень (1000 = 1 сек, 60 = 1 хв, 60 хвилин, 24 години = 1 доба, 7 днів)
