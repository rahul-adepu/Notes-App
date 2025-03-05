const passwordValidator = require('password-validator');

const validatePassword = (req, res, next) => {
    const schema = new passwordValidator();
    const { password } = req.body;

    schema
        .is().min(8)
        .is().max(10)
        .has().uppercase()
        .has().lowercase()
        .has().digits(2)
        .has().not().spaces()
        .is().not().oneOf(['Passw0rd', 'Password123']);

    try {
        const validPassword = schema.validate(password);
        if (validPassword) {
            next();
        }
        else {
            const missingValues = (schema.validate(password, { list: true }));
            res.json({ msg: "Your Password is weak", missingValues });
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = validatePassword;