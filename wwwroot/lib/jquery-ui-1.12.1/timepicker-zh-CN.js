/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Ressol (ressol@gmail.com). */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "../jquery.ui.timepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.timepicker );
	}
}(function( timepicker ) {
	timepicker.regional['zh-CN'] = {
	    timeOnlyTitle: '选择时间',
	    timeText: '时间',
	    hourText: '小时',
	    minuteText: '分钟',
	    secondText: '秒钟',
	    millisecText: '微秒',
	    timezoneText: '时区',
	    currentText: '现在时间',
	    closeText: '关闭',
	    timeFormat: 'HH:mm:ss',
	    stepHour: 1,
	    stepMinute: 1,
	    stepSecond: 1
	};
	timepicker.setDefaults(timepicker.regional['zh-CN']);

	return timepicker.regional['zh-CN'];

}));
