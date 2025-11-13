export function sanitizeUser(user: any) {
    if (!user) return null;
    // If it's a Mongoose document, convert to a plain object
    const sanitizedUser = user.toObject ? user.toObject() : user;

    const { _id, password, __v, ...rest } = sanitizedUser;

    return {
        id: _id?.toString?.() ?? _id,
        ...rest
    };
}
