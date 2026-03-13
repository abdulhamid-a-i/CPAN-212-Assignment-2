
export const REQUEST_TRANSITIONS = {
  open: ["quoted", "cancelled"],
  quoted: ["assigned", "cancelled"],
  assigned: ["completed"],
  completed: [],
  cancelled: []
};