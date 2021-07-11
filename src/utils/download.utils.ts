
export function download(jsonObject: any, fileName: string) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObject));
    const dlAnchorElem = document.getElementById('downloadAnchorElem') as HTMLElement;
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `${fileName}.json`);
    dlAnchorElem.click();
}
