import Platform from '../Platform';
class Browser extends Platform {
    constructor() {
        super('browser');
    }

    isMatch() {
        return true;
    }

    getUrlToEarnPoint() {
        return '';
    }
}
export default new Browser();
