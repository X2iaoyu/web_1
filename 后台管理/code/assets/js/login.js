$(function () {
    // 切换去注册
    $('#link_reg').on('click', function () {
        $('.login').hide()
        $('.reg').show()
    })

    $('#link_login').on('click', function () {
        $('.reg').hide()
        $('.login').show()
    })

    // 校验密码
    var form = layui.form
    var layer = layui.layer
    form.verify({

        psd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repsd: function (value) {
            var val = $('.reg [name=password]').val()
            if (value !== val) {
                return '两次密码不一致'
            }
        }
    })

    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('#link_login').click()
        })
    })

    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！')
                }
                layer.msg('登陆成功！')
                localStorage.setItem('token', res.token)
                location.href = '/后台管理/code/index.html'
            }
        })
    })
})