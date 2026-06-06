import inquirer from "inquirer"
import fs from "fs"
import downloadFile from "../../util/download_file"
import extractFile from "../../util/extract_file"

/**
 * @description Update or install danser
 */
export default async function updateDanser(version: string) {
    let url: string, filename: string
    if (process.platform === "win32") {
        url = `https://github.com/Wieku/danser-go/releases/download/${version}/danser-${version}-win.zip`
        filename = `danser-${version}-win.zip`
    } else {
        url = `https://x.cubi.dev/u/danser-0.12.0-s2-linux.zip`
        filename = `danser-0.12.0-s2-linux.zip`
    }

    let { confirmed }: { confirmed: boolean } = await inquirer.prompt({
        name: "confirmed",
        type: "confirm",
        message: "WARNING: a danser update needs to be made. The o!rdr client will now download external non MIT-licensed binaries. Do you want to proceed?",
        default: true
    })
    if (!confirmed) return process.exit(0)

    let output = "bins/danser"

    await downloadFile({ url, to: output, filename: "danser.zip" })
    console.log("Extracting danser...")
    await extractFile({ input: `${output}/danser.zip`, output })

    console.log("Preparing danser...")
    if (process.platform === "linux") fs.chmodSync("bins/danser/danser-cli", "755")
}
