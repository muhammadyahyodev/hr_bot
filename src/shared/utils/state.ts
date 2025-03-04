const usersInQuestionMode = new Set<number>();

export const addUserToQuestionMode = (userId: number) => usersInQuestionMode.add(userId);
export const removeUserFromQuestionMode = (userId: number) => usersInQuestionMode.delete(userId);
export const isUserInQuestionMode = (userId: number) => usersInQuestionMode.has(userId);
