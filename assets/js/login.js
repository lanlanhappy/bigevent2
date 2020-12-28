$(function() {


    //点击去注册
    $(".gotoRegister").on('click', function() {
        $(".login").hide();
        $(".register").show();
    })

    //点击去登录
    $(".gotoLogin").on('click', function() {
        $(".register").hide();
        $(".login").show();
    })

    //申明form和layer
    let form = layui.form;
    let layer = layui.layer;

    //表单验证
    let $pwd_one = $(".pwd_one");
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value, item) {
            if (value !== $pwd_one.val()) {
                return '两次密码输入不同'
            }
        }
    });

    //完成注册功能
    $("#registerForm").on('submit', function(e) {
        //阻止表单的默认提交事件
        e.preventDefault();
        // 收集表单数据
        const data = $(this).serialize();
        // console.log(data);

        //发送Ajax请求来注册
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败' + res.message);
                }
                layer.msg('注册成功');
                //清空注册表单中的值
                $("#registerForm")[0].reset();
                // $(".register").hide();
                // $(".login").show();
                //跳转到登录表单
                $(".gotoLogin").click();
            }
        })
    })


    //完成登录功能
    $("#loginForm").on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        const data = $(this).serialize();
        console.log(data);

        //发送Ajax请求来登录
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败' + res.message);
                }
                //如果登录成功
                //清空登录表单
                $("#loginForm")[0].reset();
                //提示登录成功
                // layer.msg(res.message);
                //将服务器返回的token信息保存到本地
                localStorage.setItem('token', res.token);
                //登录成功，跳转到主页面
                // location.href = '/home/index.html';

                //使用layui提供的跳转方法
                layer.msg('登录成功，即将跳转到主页面', {
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function() {
                    location.href = '/home/index.html';
                });
            }
        })
    })
})