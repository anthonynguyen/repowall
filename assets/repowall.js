function repowall(username) {
	$.getJSON("https://api.github.com/users/" + username + "?callback=?", function(data) {
		var userinfo = data.data;
		document.title = userinfo.login + "'"  + (userinfo.login[userinfo.login.length-1] != "s" ? "s" : "") + " repowall";
		var userdiv = $("<div>").attr("id", "user");
		var av = $("<a>").attr("href", userinfo.html_url).attr("title", (userinfo.name != null ? userinfo.name : userinfo.login));
		var ulist = $("<ul>");
		av.append($("<img>").attr("src", userinfo.avatar_url));
		if (userinfo.name != null)
			av.append("<h2>" + userinfo.name + "</h2>\n<h3>" + userinfo.login + "</h3>\n");
		else
			av.append("<h2>" + userinfo.login + "</h2>\n");
		if (userinfo.location != null)
			ulist.append("<li>Lives in <span class=\"quan\">" + userinfo.location + "</span></li>\n")
		if (userinfo.blog != null)
			ulist.append("<li><a href=\"" + userinfo.blog + "\">" + userinfo.blog + "</a></li>\n");
		if (userinfo.email != null)
			ulist.append("<li><a href=\"mailto:" + userinfo.email + "\">" + userinfo.email + "</a></li>\n");
		ulist.append("<li>&nbsp</li>\n");
		ulist.append("<li><span class=\"quan\">" + userinfo.public_repos + "</span> public repo" + (userinfo.public_repos != 1 ? "s" : "") + "</li>\n");
		ulist.append("<li><span class=\"quan\">" + userinfo.public_gists + "</span> public gist" + (userinfo.public_gists != 1 ? "s" : "") + "</li>\n");
		ulist.append("<li>&nbsp</li>\n");
		ulist.append("<li><span class=\"quan\">" + userinfo.followers + "</span> follower" + (userinfo.followers != 1 ? "s" : "") + "</li>\n");
		ulist.append("<li><span class=\"quan\">" + userinfo.following + "</span> following</li>\n");
		userdiv.append(av);
		userdiv.append(ulist);
		userdiv.prependTo($("#wrapper"));
	});
	$.getJSON("https://api.github.com/users/" + username + "/repos?callback=?", function(data) {
		var repos = data.data;
		repos.sort(function(a, b) {
			if (a.watchers > b.watchers) {
				return -1;
			} else if (a.watchers < b.watchers) {
				return 1;
			} else {
				return 0;
			};
		});
		$("<div>").attr("id", "repos").appendTo($("#wrapper"));
		repos.map(function (r) {
			var repo = $("<a>").addClass("repo");
			var name = $("<h2>");
			var info = $("<div>").addClass("info");
			var lastupdate = $("<div>").addClass("upd");
			var description = $("<div>").addClass("description");
			repo.attr("href", r.html_url);
			repo.attr("title", r.name);
			if (r.language != null)
				repo.addClass(r.language.toLowerCase().replace(/#/g, "sharp").replace(/\+/g, "p"));
			name.html(r.name);
			info.html((r.language != null ? r.language : "Unknown") + ", " + r.watchers + " watcher" + (r.watchers != 1 ? "s" : ""));
			lastupdate.html("Last Update: " + r.updated_at.slice(0, 10));
			description.html(r.description);
			repo.append(name);
			repo.append(info);
			repo.append(lastupdate);
			repo.append(description);
			repo.appendTo($("#repos"));
		});
	});
};