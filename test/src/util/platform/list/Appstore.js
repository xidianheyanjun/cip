import Platform from '../Platform';
class Appstore extends Platform {
    constructor() {
        super('com.bbk.appstore');
    }

    isMatch() {
        let cookies = this.getCookies();
        let packageName = cookies['vvc_pn'] || cookies['pn'] || '';
        return Boolean(packageName === this.platformName || cookies['an']);
    }

    getUrlToEarnPoint() {
        return process.env.urlToEarnPointInAppstore;
    }
}
export default new Appstore();
