import {Injectable} from '@angular/core';
import {sqlite} from 'websql-orm';
import {SyncUploadEntity} from '../table/SyncUploadEntity';
import {SyncStatus} from '../../../libs/synchronization/sync/SyncStatus';
import {UuidUtil} from '../../../libs/uitls/UuidUtil';

/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/4:12:01
 */

export class SyncUploadEntityManager {
    static async insert(entity: SyncUploadEntity) {
        await sqlite.insert(entity);
    }

    static async deleteAndInsert(entity: SyncUploadEntity) {
        if (entity.uniqueIdValues == null || entity.uniqueIdValues.length === 0) {
            // 如果没有关键字UniqueIdValues，load状态不用保存到数据，不然就会有两条数据
            if (entity.status === SyncStatus.SYNC_LOAD) {
                return;
            }
            // （如果有关键字UniqueIdValues，可以根据关键字来跟新状态，不会存在多条）
            entity.id = UuidUtil.getGuid();
            entity.uniqueIdValues = UuidUtil.getGuid();
            await sqlite.insert(entity);
        } else {
            const result = await sqlite.queryFirst(new SyncUploadEntity(),
                {uniqueIdValues: entity.uniqueIdValues, type: entity.type});

            if (result == null) {
                entity.id = UuidUtil.getGuid();
                await sqlite.insert(entity);
            } else {
                entity.id = result.id;
                await sqlite.delete(new SyncUploadEntity(), result.id);
                await sqlite.insert(entity);
            }
        }
    }
}
