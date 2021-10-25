$(function() {
    //制定规则
    var form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度必须在 1 ~ 6 个字符之间！"
            }
        }
    })

    //获取用户基本信息
    initUserInfo()
        //获取用户基本信息
    function initUserInfo() {
        var layer = layui.layer
        $.ajax({
            metho: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                }
                // return layer.msg("获取用户信息成功")
                // 调用form.val()为表单快速赋值
                // console.log(res);
                // form.val("formUserInfo", res.data)
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置
    $('#btnReset').on("click", function(e) {
        e.preventDefault()
        initUserInfo()
    })

    //// 监听表单的提交事件
    $('.layui-form').on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            url: "/my/userinfo",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败")
                }
                layer.msg("更新用户信息成功")
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })

})