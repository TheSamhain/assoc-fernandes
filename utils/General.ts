export const youtubeParser = (url: string) => {
  const regExpYtID = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExpYtID);
  return match && match[7].length === 11 ? match[7] : '';
};
