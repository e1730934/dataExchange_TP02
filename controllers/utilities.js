exports.printImage = async (req, res) => {
    const {fileName} = req.params
    res.sendFile(`C:\\Users\\Bilal\\WebstormProjects\\DataExchange\\TP02\\uploads\\${fileName}`)

}
