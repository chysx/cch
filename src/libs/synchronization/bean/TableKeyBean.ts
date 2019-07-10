/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:15:34
 */
import {SyncConfig} from '../sync/SyncConfig';

export class TableKeyBean {
    name: string;
    keys: Array<string>;

    constructor(name: string, keys: Array<string>) {
        this.name = name;
        this.keys = keys;
    }

    public getKeysStr(): string {
        return this.keys.join(SyncConfig.PRIMARY_KEY_SEPARATOR);
    }
}
