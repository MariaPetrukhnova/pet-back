const getUserInfo = async (req, res) => {
    const { 
        login, 
        email, 
        avatarURL,
        startPhoto,
        currentPhoto,
        goal, 
        birthDate, 
        height, 
        startWeight, 
        goalWeight, 
        currentWeight, 
        startDimensions, 
        currentDimensions,
        currentBMI, 
        currentTDEE,
     } = req.user;

    res.json({
        login, 
        email, 
        avatarURL,
        startPhoto,
        currentPhoto,
        goal, 
        birthDate, 
        height, 
        startWeight, 
        goalWeight, 
        currentWeight, 
        startDimensions, 
        currentDimensions,
        currentBMI, 
        currentTDEE,
    })
};

module.exports = getUserInfo;
