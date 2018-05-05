import appstore from './list/Appstore';
import gamecenter from './list/Gamecenter';
import browser from './list/Browser';
class Chain {
    constructor() {
        this.platformList = [appstore, gamecenter, browser];
        this.platform = this.matchPlatform();
    }

    matchPlatform() {
        let self = this;
        for (let m = 0; m < self.platformList.length; ++m) {
            if (self.platformList[m].isMatch()) {
                return self.platformList[m];
            }
        }
    }

    getCurrentPlatform() {
        return this.platform;
    }
}
export default new Chain();
