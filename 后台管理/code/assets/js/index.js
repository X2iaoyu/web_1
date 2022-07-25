$(function () {
    var layer = layui.layer
    getUser()

    // 退出
    $('#btnLogOut').on('click', function () {
        // 退出提示
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/后台管理/code/login.html'
            layer.close(index)
        });
    })
})

// 获取用户基本信息
function getUser() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        complete: function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/后台管理/code/login.html'
            }

        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic) {
        $('.ayui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()

        $('.text-avatar').html(first).show()
    }
}