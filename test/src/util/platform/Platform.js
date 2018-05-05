class Platform {
    constructor(platformName) {
        this.platformName = platformName;
    }

    getPlatformName() {
        return this.platformName;
    }

    trim(str) {
        return !str ? '' : str.replace(/(^\s*)|(\s*$)|( )/g, '');
    }

    converter(val) {
        return val;
    }

    isMatch() {
        return false;
    }

    isLogin() {
        let cookies = this.getCookies();
        return parseInt(cookies['vvc_status']) === 1 || parseInt(cookies['status']) === 1;
    }

    invoke(funName, info) {
        if (!window.AppWebClient || !window.AppWebClient.invokeLocal) {
            return false;
        }
        info = info || {};
        info['webErrorCatch'] = info['webErrorCatch'] || 'callback';
        info['localErrorCatch'] = info['localErrorCatch'] || 'true';
        return window.AppWebClient.invokeLocal(funName, JSON.stringify(info));
    }

    login(callback) {
        window.onAccountsUpdate = () => {
            callback && callback();
        };
        this.invoke('login', {
            info: {}
        });
    }

    webToastShow(text) {
        var info = {
            info: {
                toast: text
            }
        };
        this.invoke('webToastShow', info);
    }

    copyText(text) {
        let self = this;
        window.copyTextCallback = () => {
            self.webToastShow('复制成功');
        };
        var info = {
            info: {
                copyText: text
            },
            callback: 'copyTextCallback'
        };
        this.invoke('copyText', info);
    }

    getCookies(keyConverter, valConverter) {
        let self = this;
        keyConverter = keyConverter || self.converter;
        valConverter = valConverter || self.converter;
        let cookiePair = document.cookie.split(';');
        let cookieObj = {};
        for (let m = 0; m < cookiePair.length; ++m) {
            let keyValArr = cookiePair[m].split('=');
            if (keyValArr.length !== 2) {
                continue;
            }
            let key = self.trim(keyValArr[0]);
            if (!key) {
                continue;
            }
            cookieObj[keyConverter(key)] = valConverter(self.trim(keyValArr[1]));
        }
        return cookieObj;
    }
}
export default Platform;
