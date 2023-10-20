const getCurrent = async (req, res) => {
    const { login, email } = req.user;

    res.json({
        login,
        email, 
    });
};

module.exports = getCurrent;