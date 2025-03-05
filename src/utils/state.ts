const usersInQuestionMode = new Set<number>();
let adminMode: Boolean; 

export const addUserToQuestionMode = (userId: number) => usersInQuestionMode.add(userId);
export const removeUserFromQuestionMode = (userId: number) => usersInQuestionMode.delete(userId);
export const isUserInQuestionMode = (userId: number) => usersInQuestionMode.has(userId);

export const setAdminMode = (status: Boolean) => adminMode = status;
export const isAdminMode = () => adminMode;