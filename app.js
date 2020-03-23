Zepto(function ($) {
    loadConfig('/nav.yml', function (data) {
        var target = $(document.body)
        data.websites.forEach(function (item) {
            target.append(renderSection(item))
            target.append(renderList(item.list))
        })
    })

    function renderSection(info) {
        var html = '<h2>' + info.title + '</h2>'
        if (info.description) {
            html += '<div class="s-desc">' +
                info.description + '</div>'
        }
        return html
    }

    function renderList(list) {
        var html = '<div class="list">'
        html += list.map(function (item) {
            var it = '<a href="' + item.url + '" class="item">'
            if (item.icon) {
                it += '<img src="' + item.icon + '" />'
            } else {
                it += '<img src="' + extractIcon(item.url) + '" />'
            }
            it += '<span>' + item.title + '</span></a>'
            return it
        }).join('')
        return html + '</div>'
    }

    function loadConfig(uri, done) {
        fetch(uri).then(function (res) {
            return res.text()
        }).then(function (data) {
            done(YAML.parse(data))
        })
    }

    function extractIcon(uri) {
        var root = uri.match(/^https?:\/\/[a-z0-9\-_\.]+\/?/i)
        if (!root) return ''
        root = root[0]
        return root.slice(-1) === '/' ? root + 'favicon.ico' :
            root + '/favicon.ico'
    }
})