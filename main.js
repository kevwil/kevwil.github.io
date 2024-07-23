$(function () {
    $.getJSON('https://api.github.com/users/kevwil/repos?callback=?', function (data) {
        var repos = $.grep(data.data, function (repo, i) {
            return repo.description;
        });

        repos.sort(function (a, b) {
            return b.watchers - a.watchers
        });

        $.each(repos.slice(0, 30), function () {
            if (this.fork) {
                $('#forks').append('<dt><a href="' + this.html_url + '">' + this.name + '</a> <span class="label warning">fork</span></dt><dd>' + this.description + '</dd>');
            } else {
                $('#mycode').append('<dt><a href="' + this.html_url + '">' + this.name + '</a></dt><dd>' + this.description + '</dd>');
            }
        });
    });
    $.getJSON('https://api.github.com/users/kevwil?callback=?', {}, function (data) {
        $('#me_link').attr('title', 'github user #' + data.data.id);
        $('#user_id').text('Github User #' + data.data.id);
    });
});
