import Platform from '../Platform';
class Gamecenter extends Platform {
    constructor() {
        super('com.vivo.game');
    }

    isMatch() {
        let cookies = this.getCookies();
        let packageName = cookies['vvc_pn'] || cookies['pn'] || '';
        return Boolean(packageName === this.platformName);
    }

    getUrlToEarnPoint() {
        return process.env.urlToEarnPointInGamecenter;
    }
}
export default new Gamecenter();
