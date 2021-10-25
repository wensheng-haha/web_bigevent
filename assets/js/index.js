$(function() {
        getUserInfo()

        // 退出按钮
        $('#tuichu').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //清空token
                localStorage.removeItem('token')
                    // 跳转login页面
                location.href = "/code/login.html"
                    // 关闭confirm询问框
                layer.close(index);
            });
        })
    })
    //获取用户基本信息
function getUserInfo() {
    $.ajax({
            url: "/my/userinfo",
            method: "GET",
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                    //console.log(res);
                    if (res.status !== 0) {
                        console.log(localStorage.getItem('token'));
                        return layui.layer.msg("获取用户基本信息失败")
                    }
                    // layui.layer.msg('成功')
                    renderAvatar(res.data)
                }
                // 不论成功还是失败，最终都会调用 complete 回调函数
                // complete: function(res) {
                //     console.log('执行了 complete 回调：')
                //     console.log(res)
                //         // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
                //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //         // 1. 强制清空 token
                //         localStorage.removeItem('token')
                //             // 2. 强制跳转到登录页面
                //         location.href = '/code/login.html'
                //     }
                // }
        })
        //渲染用户头像
    function renderAvatar(user) {
        //获取用户的昵称
        var name = user.nickname || user.username
            // 设置欢迎的文本

        $('#weclome').html("欢迎&nbsp;&nbsp;" + name)
            // 判断用户头像是否为null
            // 如果为null设置以第一个昵称字符大写作为头像
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avart').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avart').html(first).show()
        }

    }
}