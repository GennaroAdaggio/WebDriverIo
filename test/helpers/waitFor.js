export async function waitForUrl(url){

    await browser.waitUntil(async () => {
        return (await browser.getUrl()).includes(url);
    });

}