const matchId = (id: string, item: object) => (item: { id: string }) =>
  item.id === id;
