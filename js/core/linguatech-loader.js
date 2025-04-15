
$(function () {
    initDataLoader();
	console.log("Linguatech loader loaded");
});

function getLoader(size) {
    return `<img src="https://cdn.simplytranslate.nl/public/images/misc/loader-dots.gif" height="${size}px" />`;
}

function initDataLoader()
{
    $(document).on("click", "a[data-loader],input[data-loader],button[data-loader]", function () {
        addLoaderToButton(this);
    });
}

function addLoaderToButton(button) {
    var value = $(button).data("loader");
    $(button).after(`<img src="https://cdn.simplytranslate.nl/public/images/misc/loader-dots.gif" height="10px" style="width: 60px;" id="LoadOnSubmit" class="load-on-submit" data-load-id="${value}" />`);
    $(button).hide();
}


function removeLoader(loadid)
{
    if(loadid && loadid.length > 0)
    {
        //remove loader
        $(`.load-on-submit[data-load-id='${loadid}']`).remove();

        var button = $(`a[data-loader='${loadid}'],input[data-loader='${loadid}'],button[data-loader='${loadid}']`);
        $(button).show();

        var buttonDisabled = $(`a[data-loader-disable='${loadid}'],input[data-loader-disable='${loadid}'],button[data-loader-disable='${loadid}']`);
        $(buttonDisabled).removeAttr("disabled");
        $(buttonDisabled).css("color", "inherit");
    } else {
        $("#LoadOnSubmit").remove();
    }
}

function removeLoaderTimed(loadid, ms)
{
	setTimeout(function(){ removeLoader(loadid); }, ms);
}