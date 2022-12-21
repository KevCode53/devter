import md5 from "md5"

export const manageFiles = (files, user, imgList) => {
    const imgsDrop = []
    let newImg = {}
    if (files.length > 4 || (imgList.length + files.length) > 4) {
        return console.error('Agregue 1 GIF o hasta 4 imagenes!')
    }
    for (let i = 1; i <= files.length; ++i) {
    // for (let file in files) {
        const reader = new FileReader()
        reader.readAsDataURL(files[i-1])
        reader.onload = (e) => {
            e.preventDefault(e.target.result)
            newImg = {
                id: md5(files[i-1]),
                frontPath: e.target.result,
                serverPath: `${user}/${files.name}`,
                imgFile: files[i-1]
            }
            imgsDrop.push(newImg)
        }
    }
    return imgsDrop
}