export const getWindowData = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}