$(function() {
	// Waves初始化
	Waves.displayEffect();
	// 输入框获取焦点后出现下划线
	$('.form-control').focus(function() {
		$(this).parent().addClass('fg-toggled');
	}).blur(function() {
		$(this).parent().removeClass('fg-toggled');
	});
});
$(function() {
	// 点击登录按钮
	$('#login-bt').click(function() {
		login();
	});
	// 回车事件
	$('#username, #password').keypress(function (event) {
		if (13 == event.keyCode) {
			login();
		}
	});
});
// 登录
var BASE_PATH="http://localhost:8080/";
function login() {
    window.location.href="list.html";
    // $.ajax({
	// 	url: BASE_PATH + '/sso/login',
	// 	type: 'POST',
	// 	data: {
	// 		username: $('#username').val(),
	// 		password: $('#password').val()
	// 	},
	// 	beforeSend: function() {
    //
	// 	},
	// 	success: function(json){
	// 		if (json.code == 1) {
	// 			location.href = json.data;
	// 		} else {
	// 			alert(json.data);
	// 			if (10101 == json.code) {
	// 				$('#username').focus();
	// 			}
	// 			if (10102 == json.code) {
	// 				$('#password').focus();
	// 			}
	// 		}
	// 	},
	// 	error: function(error){
	// 		console.log(error);
	// 	}
	// });
}