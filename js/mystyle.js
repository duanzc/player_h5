$(function() {

	var musiclist = {
		"data": [{
			"name": "改革春风吹满地",
			"src": "../music/ggcf.mp3"
		}, {
			"name": "We Can't Stop",
			"src": "../music/hhhh.mp3"
		}]
	};

	var height = $(document).height();
	var mp3 = $("#mp3");
	var imgpic = $("#imgpic");
	var pstart = $("#pstart");
	var pstop = $("#pstop");
	var pname = $("#p_name");
	var now = $("#now");
	var au = document.getElementById("mp3");
	var drag = document.getElementById("drag");

	// $("#nav").height((height / 10) * 9);
	$("#nav-left").height((height / 10) * 9);
	$("#nav-right").height((height / 10) * 9);
	$("#canvas").height((height / 10) * 9);

	// for (var i = 0; i < musiclist.data.length; i++) {
	// 	var li = '<li class="layui-nav-item"><a href="#">' + musiclist.data[i].name + '</a></li>';
	// 	$("#ulleft").append(li);
	// }

	$("#ulleft").on("click", "li", function() {
		var index = $(this).index();
		// console.log(index);

		$(this).addClass("lileft").siblings().removeClass("lileft");

		//点击切换音乐
		mp3.attr("src", musiclist.data[index].src);
		pname.text(musiclist.data[index].name);
		//重置数据
		resetdata();
	});


	//播放状态
	var state = false;
	// 获取歌曲时间长度
	var mduration;
	//进度条每秒应该走多少
	var mparg;
	//定时器
	var inval;
	//定时器总进度
	var y = 0;
	//时间计时初始化 秒 / 分
	var times = 0;
	var timem = 0;

	mp3.attr("src", musiclist.data[0].src);
	pname.text(musiclist.data[0].name);
	// pname.text("改革春风吹满地");

	dur();

	//初始化状态
	function dur() {
		au.addEventListener("loadeddata", function() {
			// 获取歌曲时间长度
			mduration = au.duration;
			mduration = parseInt(mduration);
			console.log(parseFloat(mduration));

			//分钟
			var minute = mduration / 60;
			var minutes = parseInt(minute);
			if (minutes < 10) {
				minutes = "0" + minutes;
			}

			//秒
			var second = mduration % 60;
			seconds = parseInt(second);
			if (seconds < 10) {
				seconds = "0" + seconds;
			}

			pstop.text(minutes + ":" + seconds);

			// console.log(minutes + ":" + seconds);

			mparg = 400 / mduration;
		});
		au.addEventListener("ended", function() {
			// console.log(111)
			//重置数据
			resetdata();
		});
	};


	//点击播放 暂停
	$("#player").click(function() {

		if (au.paused) {
			$("#player").attr("class", "layui-icon layui-icon-pause");
			mp3.get(0).play();
			state = true;
			inval = setInterval(function() {
				parg()
			}, 1000);
		} else {
			$("#player").attr("class", "layui-icon layui-icon-play");
			mp3.get(0).pause();
			state = false;
			clearin();
		}

		onpic();
	});

	function onpic() {
		if (state) {
			imgpic.attr("class", "ro-img");

		} else {
			imgpic.attr("class", "img-big");
		}
	}

	// 进度条 和 时间计时
	function parg() {

		// var i=400/mduration;

		// if (state) {
		// mparg++;
		y += mparg;
		// y = mparg+y;
		now.width(parseInt(y));
		drag.style.marginLeft = parseInt(y) + "px";
		// console.log(parseInt(y));

		if (times < 59) {
			times++;
			if (times < 10) {
				pstart.text("0" + timem + ":0" + times);
			} else {
				pstart.text("0" + timem + ":" + times);
			}
		} else {
			timem++;
			times = 0;
			
			pstart.text("0" + timem + ":0" + times);

			// if (times < 10) {
			// 	
			// 	// times++;
			// } else {
			// 	pstart.text("0" + timem + ":" + times);
			// }
		}

		// } else {
		// }

	}
	//清除计时器
	function clearin() {
		clearInterval(inval);
	}

	//重置数据
	function resetdata() {
		clearInterval(inval);
		now.width(0);
		drag.style.marginLeft = 0 + "px";
		imgpic.attr("class", "img-big");
		$("#player").attr("class", "layui-icon layui-icon-play");
		pstart.text("00:00");
		y = 0;
		times = 0;
		timem = 0;
	}
});
