
export const generateVerificationCode = (length = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let verificationCode = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      verificationCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return verificationCode;
};