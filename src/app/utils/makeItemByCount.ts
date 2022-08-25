export const makeItemsByCount = <T>(count: number, item: T) => {
  const list: T[] = [];
  for (let i = 0; i < count; i++) {
    list.push(item);
  }
  return list;
};
