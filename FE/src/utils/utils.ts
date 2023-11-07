const placeholderImage = (number: number) => {
  return `https://picsum.photos/1920/1000/?image=${number}`;
};

const getDateDiff = (d1: string) => {
  const date1 = new Date(d1);
  const today = new Date();

  const diffDate = date1.getTime() - today.getTime();
  const day = Math.floor(diffDate / (1000 * 60 * 60 * 24)) + 1;
  return day <= 0 ? "마감" : "마감 " + day + "일 전";
};

export { placeholderImage, getDateDiff };
