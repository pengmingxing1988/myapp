const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
  * 计算滑动角度
  * @param {Object} start 起点坐标
  * @param {Object} end 终点坐标
*/
const calcAngle = function (start, end) {
	var _X = end.X - start.X,
  _Y = end.Y - start.Y
  //返回角度 /Math.atan()返回数字的反正切值
  return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
}

//手指触摸动作开始 记录起点X坐标
const touchStartEvent = function (e) {
  this.setData({
    startX: e.changedTouches[0].clientX,
    startY: e.changedTouches[0].clientY
  })
}

//滑动事件处理
const touchMoveEvent = function (e, callback) {
  var that = this,
    index = e.currentTarget.dataset.index,//当前索引
    startX = that.data.startX,//开始X坐标
    startY = that.data.startY,//开始Y坐标
    touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
    touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
    //获取滑动角度
    angle = calcAngle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
	//滑动超过30度角 return
	if (Math.abs(angle) > 30) {
		return;
	}
  if (touchMoveX > startX) { //右滑
		callback && callback(index, true)
  } else { //左滑
		callback && callback(index, false)
  }
}

// 获取随机字符串
const randomString = function (len) {
　len = len || 32;
　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　var maxPos = chars.length;
　var pwd = '';
　for (let i = 0; i < len; i++) {
  　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd + Date.now();
}

// 获取文件后缀
const getFileSuffix = function (file) {
	if (!file) {
		return null;
	}
	return file.substring(file.lastIndexOf('.'))
}

// 选择视频
const chooseVideo = function (opts, success, error) {
	if (typeof opts === 'function') {
		success = opts;
		error = success;
		opts = {};
	}
	wx.chooseVideo({
		sourceType: ['album', 'camera'],
		//录制视频最大时长
    maxDuration: 60,
    //摄像头
    camera: ['front', 'back'],
		success: function (res) {
			success && success(res);
		},
		fail: function (res) {
			error && error(res);
		}
	})
}

// 选择图片
const chooseImage = function (opts, success, error) {
	if (typeof opts === 'function') {
		success = opts;
		error = success;
		opts = {};
	}
	wx.chooseImage({
		count: opts.count || 9, // 默认9
		sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		success: function (res) {
			// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
			success && success(res.tempFilePaths);
		},
		fail: function (res) {
			error && error(res);
		}
	})
}

// 上传附件
const uploadFile = function (file, fileName, data, progressUpdate, success, error) {
	let uploadTask = wx.uploadFile({
		url: 'https://file.xiao360.com.cn/', // data.host
		filePath: file,
		name: 'file',
		formData: {
			'key' : data.dir + `/${fileName ? fileName : '${filename}'}`,
      'policy': data.policy,
      'OSSAccessKeyId': data.accessid, 
      'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
      'signature': data.signature
		},
    success: function (res) {
			success && success(res);
    },
		fail: function (res) {
			error && error(res);
		}
	});
	uploadTask.onProgressUpdate((res) => {
		//上传进度(progress)
		//已经上传的数据长度(totalBytesSent)
		//预期需要上传的数据总长度(totalBytesExpectedToSend)
		progressUpdate && progressUpdate(res);
	});
	return uploadTask;
}

// 检查文件大小
const checkSize = function (curSize, limitSize) {
	return curSize <= (limitSize || 20) * 1024 * 1024;
}

const showToast = function (title, opts) {
	wx.showToast({
		title: title,
		icon: opts.icon,
		duration: opts.duration || 2000,
		success: opts.success
	});
}

const showSuccess = function (title, opts) {
	if (typeof opts === 'function') {
		success = opts;
		error = success;
		opts = {};
	} else {
		opts = opts || {}
	}
	opts.icon = 'success';
	showToast(title, opts);
}

const showError = function (title, opts) {
	if (typeof opts === 'function') {
		success = opts;
		error = success;
		opts = {};
	} else {
		opts = opts || {}
	}
	opts.icon = 'error';
	showToast(title, opts);
}

module.exports = {
  formatTime: formatTime,
	touchStartEvent: touchStartEvent,
	touchMoveEvent: touchMoveEvent,
	randomString: randomString,
	getFileSuffix: getFileSuffix,
	chooseVideo: chooseVideo,
	chooseImage: chooseImage,
	uploadFile: uploadFile,
	checkSize: checkSize,
	success: showSuccess,
	error: showError
}
