const usersInQuestionMode = new Set<number>();
const adminMode = new Set<number>();

export const addUserToQuestionMode = (userId: number) => usersInQuestionMode.add(userId);
export const removeUserFromQuestionMode = (userId: number) => usersInQuestionMode.delete(userId);
export const isUserInQuestionMode = (userId: number) => usersInQuestionMode.has(userId);

export const adminModeOn = (adminId: number) => adminMode.add(adminId);
export const adminModeOff = (adminId: number) => adminMode.delete(adminId);
export const isAdminMode = (adminId: number) => adminMode.has(adminId);
