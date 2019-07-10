/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/8:17:25
 */
import {UuidUtil} from '../../uitls/UuidUtil';
import {SyncDirtyStatus} from '../sync/SyncDirtyStatus';

export class SyncDownloadUtil {
    /**
     * 数据下载时，为某些指定字段插入默认值
     *
     * @param tableName 表名
     * @param isAddId 是否插入id
     * @return xxx
     */
    public static createContentValue(tableName: string, isAddId: boolean): Map<string, string> {
        let contentValues = null;
        const tableMap = SyncDownloadUtil.getTableMap(isAddId);
        if (tableMap.get(tableName)) {
            contentValues = new Map<string, string>();
            const fieldMap = tableMap.get(tableName);
            fieldMap.forEach((value, key) => {
                contentValues.set(key, value);
            });
        }
        return contentValues;
    }

    private static getTableMap(isAddId: boolean): Map<string, Map<string, string>> {

        const tableMap = new Map<string, Map<string, string>>();

        tableMap.set('DSD_T_ShipmentHeader', SyncDownloadUtil.getFieldMapByDirty());
        tableMap.set('DSD_T_ShipmentHelper', SyncDownloadUtil.getFieldMapByIdOrDirty(isAddId));
        tableMap.set('DSD_T_ShipmentItem', SyncDownloadUtil.getFieldMapByIdOrDirty(isAddId));
        tableMap.set('DSD_T_ShipmentFinance', SyncDownloadUtil.getFieldMapByIdOrDirty(isAddId));

        tableMap.set('DSD_T_TruckStock', SyncDownloadUtil.getFieldMapByIdOrDirty(isAddId));
        tableMap.set('DSD_T_TruckStockTracking', SyncDownloadUtil.getFieldMapByDirty());

        tableMap.set('DSD_T_Visit', SyncDownloadUtil.getFieldMapByIdOrDirty(isAddId));
        tableMap.set('DSD_T_DeliveryHeader', SyncDownloadUtil.getFieldMapByIdOrDirty(isAddId));
        tableMap.set('DSD_T_DeliveryItem', SyncDownloadUtil.getFieldMapByIdOrDirty(isAddId));
        tableMap.set('DSD_T_DeliveryBilling', SyncDownloadUtil.getFieldMapByIdOrDirty(isAddId));

        tableMap.set('DSD_T_DayTimeTracking', SyncDownloadUtil.getFieldMapByDirty());

        tableMap.set('DSD_T_TruckCheckResult', SyncDownloadUtil.getFieldMapByDirty());
        tableMap.set('DSD_T_ARCollection', SyncDownloadUtil.getFieldMapByDirty());
        tableMap.set('DSD_M_ShipmentVanSalesRoute', SyncDownloadUtil.getFieldMapByIdOrDirty(isAddId));

        tableMap.set('DSD_T_Order', SyncDownloadUtil.getFieldMapByDirty());
        tableMap.set('DSD_T_OrderItem', SyncDownloadUtil.getFieldMapByDirty());

        return tableMap;
    }

    private static getFieldMapByIdOrDirty(isAddId: boolean): Map<string, string> {
        const fieldMap = new Map<string, string>();
        if (isAddId) {
            fieldMap.set('Id', UuidUtil.getGuid());
        }
        fieldMap.set('dirty', SyncDirtyStatus.EXIST);
        return fieldMap;
    }

    private static getFieldMapByDirty(): Map<string, string> {
        const fieldMap = new Map<string, string>();
        fieldMap.set('dirty', SyncDirtyStatus.EXIST);
        return fieldMap;
    }
}
