import { browser } from '@wdio/globals'

class Page {
    
    async open(path = '/') {
        await browser.url(path);
    }
}

export default Page;
