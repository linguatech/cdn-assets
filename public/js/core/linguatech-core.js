class Linguatech_Core {
	reloadPage()
	{
		window.location.reload(false);
	}
	
    get currentNeutralCulture() {
        return this.CurrentNeutralCulture;
    }

	getQueryStringByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

    setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value || ""}${expires}; path=/`;
    }

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return "";
    }
	
	/**
	 * @param {any} selector
	 * Selector of the specific items
	 * @param {any} selectorContainer
	 * Selector of the container
	 * 
	 * <items>
	 *  <span id="1"></span>
	 *  <span id="2"></span>
	 * </items>
	 * <items>
	 *  <span id="3"></span>
	 *  <span id="4"></span>
	 * </items>
	 * 
	 * This: ("span", "items")
	 * Will align 1,2 and 3,4
	 */
	alignAllWidthInContainer(selectorContainer, selector) {
		$(selectorContainer).each(function (iContainer, eContainer) {
			var maxWidth = 0;
			$(eContainer).find(selector).each(function (i, e) {
				maxWidth = Math.max($(e).width(), maxWidth);
			});
			$(eContainer).find(selector).width(maxWidth);
		});
	}
}

var _linguatechCore = new Linguatech_Core();