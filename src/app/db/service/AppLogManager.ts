/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/4:15:19
 */
import {AppLogEntity} from '../table/AppLogEntity';
import {UuidUtil} from '../../../libs/uitls/UuidUtil';
import {SyncDirtyStatus} from '../../../libs/synchronization/sync/SyncDirtyStatus';
import {sqlite} from 'websql-orm';
import {TimeUtil} from '../../../libs/uitls/TimeUtil';

export class AppLogManager {

    static insert(type: string, content: string) {
        try {
            AppLogManager.insertEntity(AppLogManager.createAppLogEntity(type, content));
        } catch (e) {

        }
    }

    static insertErrorMsg(type: string, msg: string, error: Error) {
        AppLogManager.insert(type, msg + '  \n' + error.message);
    }

    static insertError(type: string, error: Error) {
        AppLogManager.insert(type, error.message);
    }

    static async insertEntity(entity: AppLogEntity) {
        await sqlite.insert(entity);
    }

    static createAppLogEntity(type: string, content: string): AppLogEntity {
        const entity = new AppLogEntity();
        entity.id = UuidUtil.getGuid();
        entity.versionName = '';
        entity.type = '';
        entity.device = AppLogManager.createDeviceInfo();
        entity.content = content;
        entity.stackTrace = '';
        entity.time = TimeUtil.getNowTimeString(TimeUtil.SECOND);
        entity.dirty = SyncDirtyStatus.DEFAULT;
        return entity;
    }


    static createDeviceInfo(): string {
        const sb = '';
        sb.concat('VersionName = ').concat('').concat(';');
        sb.concat('VersionCode = ').concat('').concat(';');
        sb.concat('Resolution = ').concat('').concat(';');
        sb.concat('Density = ').concat('').concat(';');
        sb.concat('DensityDpi = ').concat('').concat(';');
        sb.concat('SdkLevel = ').concat('').concat(';');
        sb.concat('SdkVersion = ').concat('').concat(';');
        sb.concat('Brand = ').concat('').concat(';');
        sb.concat('Model = ').concat('').concat(';');
        return sb.toString();
    }
}
