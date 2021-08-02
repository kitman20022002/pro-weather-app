const PosterState = Object.freeze({
  AWAIT: 4,
  REVIEWING: 5,
  INPROGRESS: 6,
  COMPLETED: 7,
});

const TaskerState = Object.freeze({
  AWAIT: 0,
  CREATED_OFFER: 1,
  ASSIGNED_OFFER: 2,
  COMPLETED: 3,
  REVIEWING: 4,
});

Object.freeze(PosterState);
Object.freeze(TaskerState);

export { TaskerState };
export { PosterState };
