const path = require("path");
const fs = require("fs");
const hasha = require("hasha");
const throat = require("throat");

const getDuplicateFiles = async (folder) => {
    console.log("get All files");
    let files = await getFileList(folder);
    let duplicates = {};
    console.log("flat the array");
    if (Array.isArray(files)) files = files.flat(10000);

    console.log("start the comparating");
    files.map((file) => {
        let hasSimilar = false;
        files.map((similar) => {
            if (
                file.hash === similar.hash &&
                file.filepath !== similar.filepath
            ) {
                hasSimilar = true;
                files.splice(files.indexOf(similar), 1);
                console.log(
                    "found duplicate of",
                    file.filepath,
                    ":",
                    file.filepath
                );
                // similar = getImage(similar);
                if (Array.isArray(duplicates[file.hash])) {
                    duplicates[file.hash].push(similar);
                } else {
                    // file = getImage(file);
                    duplicates[file.hash] = [file, similar];
                }
            }
        });

        if (!hasSimilar) {
            files.splice(files.indexOf(file), 1);
        }
    });

    return duplicates;
};

const getFileList = async (folder) => {
    if (!fs.existsSync(folder)) {
        console.log(`The directory ${folder} doesn't exist`);
        return [];
    }

    const files = fs.readdirSync(folder);
    const list = await Promise.all(
        files.map(
            throat(2, async (file) => {
                const relFilepath = path.join(folder, path.sep, file);
                if (fs.statSync(relFilepath).isDirectory()) {
                    console.log("get files in folder", file);
                    const folderList = await getFileList(relFilepath);
                    return folderList;
                }

                const hash = await hasha.fromFile(relFilepath, {
                    algorithm: "md5",
                });

                return {
                    file,
                    filepath: relFilepath,
                    hash,
                };
            })
        )
    );

    console.log("return list of", folder);

    return list;
};

module.exports = {
    getDuplicateFiles,
};
