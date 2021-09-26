$(function() {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repassword: function(value, item) {
            if (value !== $("#password").val()) {
                return '两次的密码不一致'
            }
        }
    });

    // 绑定提交事件更新密码
    $("#resetpassword").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg(res.message);
                } else {
                    layer.msg(res.message + '请重新登录');
                    localStorage.removeItem('token');
                    window.parent.location.assign('/login.html');
                }
            }
        });
    });
});