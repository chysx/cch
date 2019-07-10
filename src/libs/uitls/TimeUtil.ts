import * as moment from 'moment';

/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/4:16:37
 */

export class TimeUtil {
    public static readonly DAY = 'YYYY-MM-DD';
    public static readonly SECOND = 'YYYY-MM-DD HH:mm:ss';

    static getNowTimeString(pattern: string): string {
        return moment().format(pattern);
    }
}
