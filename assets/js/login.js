$(function() {
    //点击已注册链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击登录链接
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 重复密码规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    // 监听注册表单的提交事件
    $("#form_reg").on('submit', function(e) {
            e.preventDefault()

            $.post('/api/reguser', {
                    username: $('#form_reg [name=username]').val(),
                    password: $('#form_reg [name=password]').val()
                },

                function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg("注册成功，请登录")
                        //模拟人工点击
                    $('#link_login').click()
                }
            )
        })
        //监听登录表单事件
    $("#form_login").submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                console.log(res.token);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                location.href = '/code/index.html'
            }
        })
    })
})