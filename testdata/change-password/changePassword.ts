import users from "../user.json";

export const changePasswordCase = [
    {
        reason: "when new password that is the same as old password",
        oldPassword: users.user1.password,
        newPassword: users.user1.password,
        confirmPassword: users.user1.password,
        reasonErrorMessage: "You entered the password that is the same as one of the last passwords you used. Please create a new password.",
    },
    {
        reason: "with wrong old password",
        oldPassword: users.user1.password + "abc",
        newPassword: "qwerty",
        confirmPassword: "qwerty",
        reasonErrorMessage: "Old password doesn't match",
    },
];
