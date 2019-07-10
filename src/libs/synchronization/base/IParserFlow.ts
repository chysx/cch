/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:16:45
 */

export interface IParserFlow<T> {
    parse(syncDataBean: T): Promise<boolean>;
}
