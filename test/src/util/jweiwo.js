(function(win) {

	// 防止重复引入带来问题
	if (win.WeiwoJSBridge) {
		return;
	}

	// 获取cookie中的值
	function getCookie(key) {
		var ret = document.cookie.match(new RegExp("(?:^|;\\s)" + encodeURIComponent(key) + "=(.*?)(?:;\\s|$)"));
		if (ret) {
			ret = decodeURIComponent(ret[1]);
		} else {
			ret = '';
		}
		return ret;
	}

	// 通信系列接口
	// 创建通信用的DOM
	function _createMsgIframe() {
		_msgIframe = document.createElement('iframe');
		_msgIframe.style.display = 'none';
		document.documentElement.appendChild(_msgIframe);
	}
	// 对IFrame的src属性的变更，客户端有可能还没有收到前一次，就被后一次覆盖，
	// 因此添加一个队列处理这种情况，客户端收到请求后，循环调用 _continueSendMsg 处理队列中所有的消息处理请求
	// 发送消息给客户端执行特定的动作
	// msg 解释
	// {
	//		funName    需要调用的客户端方法名
	//    params     调用客户端方法时传递的参数(JSON 字符串)
	//    callbackID 调用客户端方法后需要执行的回调函数（JS 函数）在 MAP 中的 KEY	
	// }
	function _sendMsg(msg, action) {

		// 所有的对客户端的请求消息按调用顺序放到消息队列中，防止消息丢失
		_sendMsgQueue.push({msg: msg, action: action});

		// 处理当前消息列队中的消息，直到队列为空
		if (_sendMsgQueueRunning) {
			return;
		}

		// 客户端循环调用该方法处理当前消息队列中的所有消息
		_continueSendMsg();
	}
	// 客户端循环调用该方法处理当前消息队列中的所有消息
	function _continueSendMsg() {
		var pendingMsg = _sendMsgQueue.shift();
		if (pendingMsg === undefined) {
			_sendMsgQueueRunning = false;
		} else {
			_sendMsgQueueRunning = true;
			var msg        = pendingMsg.msg;
			var action     = pendingMsg.action;
			var funName    = msg.funName;
			var params     = msg.params;
			var callbackID = msg.callbackID;
			_msgIframe.src = _CUSTOM_PROTOCOL_SCHEME + '://' + _CUSTOM_ACTION_MAP[action] + '/' + funName + '?callback=' + encodeURIComponent(callbackID) + '&data=' + encodeURIComponent(JSON.stringify(params));
		}
	}
	// 1.客户端方法执行完成后，调用该方法来执行回调函数
	// 2.客户端调用该方法来执行注册在 _regist_map 中的函数
	function _handleMessageFromNative(data) {
		var msg;
		var callbackFn;
		var callbackID;
		try {
			msg = JSON.parse(data) || {};
		} catch(e) {
			msg = {};
		}
		callbackID = msg.handlerjsName;
		if (msg.msgtype === 'request') {
			callbackFn = _regist_map[callbackID];
		} else if (msg.msgtype === 'response') {
			callbackFn = _callback_map[callbackID];
			if (callbackID in _callback_map) {
				delete _callback_map[callbackID];
			}
		}
		if (typeof callbackFn === 'function') {
			callbackFn(msg.requestdata, msg.responsecallback);
		}
	}
	// 调用客户端方法
	function _call(name, params, callback, action) {
		
		if (!name || typeof name !== 'string') {
			return;
		}
		if (!params || typeof params !== 'object') {
			params = {};
		}

		// 使用唯一 key 来索引回调函数，保证回调函数不会被同名 key 覆盖，从而可以得到调用
		var callbackID = String(_callback_count++);
		var msg;

		if (typeof callback === 'function') {
			_callback_map[callbackID] = callback;
		}

		msg = {
			'funName'   : name,
			'params'    : params,
			'callbackID': callbackID
		};

		// 发送消息给客户端
		_sendMsg(msg, action);
	}
	function _callCommon(name, params, callback) {
		_call(name, params, callback, 'common');
	}
	function _callNormal(name, params, callback) {
		_call(name, params, callback, 'call');
	}
	function _callResult(name, params) {
		_call(name, params, null, 'result');
	}
	// 注册方法，用于给客户端调用
	function _registHandler(handlerName, handlerFn) {
		if (typeof handlerName !== 'string') {
			return;
		}
		if (typeof handlerFn !== 'function') {
			return;
		}
		_registHandler[handlerName] = handlerFn;
	}

	var ua        = navigator.userAgent;
	var isVivo    = /vivospace/i.test(ua);
	var vivoVer   = parseInt(getCookie('vvc_app_version'), 10);
	var targetVer = 170;
	var isOld     = !isVivo || isNaN(vivoVer) || vivoVer < targetVer;
	var noop      = function() {};

	var _msgIframe;
	var _sendMsgQueue           = [];
	var _sendMsgQueueRunning    = false;
	var _callback_count         = 1000;
  var _callback_map           = {};
  var _regist_map             = {};
	var _CUSTOM_PROTOCOL_SCHEME = 'jsBridge';
	var _CUSTOM_ACTION_CALL     = 'javacall';
	var _CUSTOM_ACTION_COMMON   = 'javacommon';
	var _CUSTOM_ACTION_RESULT   = 'javaresponse';
	var _CUSTOM_ACTION_MAP      = {
		'call'   : _CUSTOM_ACTION_CALL,
		'common' : _CUSTOM_ACTION_COMMON,
		'result' : _CUSTOM_ACTION_RESULT
	};
	var _commonFnNames          = [
		'toast',
		'copy',
		'isPackageInstall',
		'openAppByPackage',
		'openAppByDeepLink',
		'download',
		'getNetType',
		'registerBack',
		'unregisterBack',
		'webBackPress',
		'hideSoftKeyBoard',
		'requestedOrientation',
		'exit'
	];

	win.WeiwoJSBridge = {
		// public
		call                : _callNormal,
		callCommon          : _callCommon,
		registHandler       : _registHandler,

		// private
		_continueSendMsg: _continueSendMsg,
		_handleMessageFromNative: _handleMessageFromNative

	};

	// 绑定公共方法
	var wwJSBridge = win.WeiwoJSBridge;
	for (var i = 0, len = _commonFnNames.length; i < len; i++) {
		var fnName = _commonFnNames[i];
		wwJSBridge[fnName] = (function(fnName) {
			return function(data, callback) {
				_callCommon(fnName, data, callback);
			};
		})(fnName);
	}

	// 老版本处理
	if (isOld) {
		/*for (var p in wwJSBridge) {
			wwJSBridge[p] = noop;
		}*/
	}

	_createMsgIframe();

})(window);