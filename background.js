
//Runs wen selecting the Youtube Tab
browser.tabs.onActivated.addListener(function (activeInfo) {

    browser.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {

        //Check whether URL formats are matching
        var url = tabs[0].url;
        var patternYoutube = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v)?(?:\?.*v=|\/))([a-zA-Z0-9\-_]+)(&list=[\S]*)?/;
        var patternFacebook = /^(https?\:\/\/)?((www\.)?facebook\.com\/(?:video\.php\?v=\d+|.*?\/videos\/\d+)).+$/;
        var patternVimeo = /(https?\:\/\/)?((www\.)?vimeo\.com\/(\d+)).+$/;
        var patternPornhub = /(https?\:\/\/)?((www\.)?pornhub\.com\/(?:view_video\.php\?viewkey=\w+)).+$/;

        if (patternYoutube.test(tabs[0].url) || patternVimeo.test(tabs[0].url) || patternPornhub.test(tabs[0].url)) {
            axios.post('https://backend/ext_video', { //Calling for backend API
                url: url
            })
                .then(function (response) {
                    localStorage.setItem("video", JSON.stringify(response.data.meta)) //Set Local storage
                    browser.browserAction.setBadgeText({ text: 'Get!' });
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            browser.browserAction.setBadgeText({ text: '' });
            localStorage.clear()
        }


    });
});

//Runs when on update the Tabs
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    var url = changeInfo.url;
    if (changeInfo.url) {

        var url = changeInfo.url;
        var patternYoutube = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v)?(?:\?.*v=|\/))([a-zA-Z0-9\-_]+)(&list=[\S]*)?/;
        var patternFacebook = /^(https?\:\/\/)?((www\.)?facebook\.com\/(?:video\.php\?v=\d+|.*?\/videos\/\d+)).+$/;
        var patternVimeo = /(https?\:\/\/)?((www\.)?vimeo\.com\/(\d+)).+$/;
        var patternPornhub = /(https?\:\/\/)?((www\.)?pornhub\.com\/(?:view_video\.php\?viewkey=\w+)).+$/;

        if (patternYoutube.test(url) || patternVimeo.test(url) || patternPornhub.test(url)) {

            axios.post('https://backend/ext_video', {
                url: url
            })
                .then(function (response) {
                    localStorage.setItem("video", JSON.stringify(response.data.meta))
                    browser.browserAction.setBadgeText({ text: 'Get!' });
                })
                .catch(function (error) {
                    console.log(error);
                });

        }else {
            browser.browserAction.setBadgeText({ text: '' });
            localStorage.clear()
        }

    }
});