var CONFIG = function(){
    if(typeof(Storage) !== "undefined") {
        var LOCAL_STORAGE_ID = 'asdasdWorkAppIdasdasdasd';
        CONFIG = {};
        CONFIG.SAVE_FREQUENCY = 1000 * 60 * 5; //msec * sec * min
        CONFIG.SCREENSHOT_FREQUENCY = 1000 * 60 * 60;
        CONFIG.LOCAL_STORAGE_ID = LOCAL_STORAGE_ID;
        CONFIG.AUTO_START = true;
        CONFIG.START_DATE_LS_ID = 'asdasdWorkAppStartDateLsIdasdasd';
        CONFIG.WORK_HOURS_LEFT_ID = 'asdasdWorkAppWorkHoursLeftasdasd'
        CONFIG.NUMBER_OF_TIPS = 8;
        CONFIG.FULL_WORK_HOURS = 28800;
        return CONFIG;
    } else {
        // Sorry! No Web Storage support..
        alert('You have no Web Storage support. Upgrade your browser please!');
    }
}();

var SETTINGS = function(){
    if(typeof(Storage) !== "undefined") {
        var LOCAL_STORAGE_ID = 'asdasdWorkAppSettingsIdasdasd';
        var SETTINGS = window.localStorage.getItem(LOCAL_STORAGE_ID) || undefined;
        if (!SETTINGS) {
            SETTINGS = {};
            SETTINGS.LOCAL_STORAGE_ID = LOCAL_STORAGE_ID;
            SETTINGS.THEME = {
                primaryPalette: "red",
                accentPalette: "blue"
            };
            window.localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(SETTINGS));
            return SETTINGS;
        }
        return JSON.parse(SETTINGS);
    } else {
        // Sorry! No Web Storage support..
        alert('You have no Web Storage support. Upgrade your browser please!');
    }
}();