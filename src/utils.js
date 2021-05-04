// eslint-disable-next-line import/prefer-default-export
export const logger = (...args) => {
  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV !== 'preoduction') console.log(...args)
}
