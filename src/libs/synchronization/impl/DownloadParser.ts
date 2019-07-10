/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/2:18:28
 */
import {AbstractParser} from '../base/AbstractParser';
import {SyncDataResponseBean} from '../bean/SyncDataResponseBean';
import {sqlite} from 'websql-orm';
import {AppLogManager} from '../../../app/db/service/AppLogManager';
import {ExceptionType} from '../../exception/ExceptionType';
import {SyncConfig} from '../sync/SyncConfig';
import {SyncDownloadLogic} from '../../../app/db/table/SyncDownloadLogic';
import {DB_NAME} from '../../../app/db/table/TableConfig';
import {SyncDownloadUtil} from '../utils/SyncDownloadUtil';

export class DownloadParser extends AbstractParser<SyncDataResponseBean> {
    public async parse(syncDataResponseBean: SyncDataResponseBean): Promise<boolean> {
        console.dir(syncDataResponseBean);
        try {
            if (syncDataResponseBean.Status !== 1) {
                return false;
            }
            const syncContentBean = syncDataResponseBean.Result;
            const syncTableBeanList = syncContentBean.Tables;
            for (const table of syncTableBeanList) {
                const tableName = table.Name;
                if (!this.isTableInDb(tableName)) {
                    return false;
                }
                const fields = table.Fields;
                if (!this.isColumnInTable(this.getFieldNames(fields), tableName)) {
                    return false;
                }
                const primaryKeys = await this.getTablePrimaryKeys(tableName);
                if (!this.isColumnInTable(primaryKeys, tableName)) {
                    return false;
                }
                const rows = table.Rows;
                if (rows != null && rows.length > 0) {
                    this.parseRows(primaryKeys, this.getFieldNames(fields), rows, tableName);
                }
                const timeStamp = table.ParamValues[0];
                this.updateTimeStamp(tableName, timeStamp);
            }
        } catch (e) {
            console.error(e);
            await AppLogManager.insertError(ExceptionType.ERROR, e);
            throw e;
        }

        return true;
    }

    /**
     * 解析指定的表
     * @param primaryKeys 主键列表
     * @param fieldNames 服务端返回的列名数组
     * @param rows 服务端返回的该表所有的行
     * @param tableName 表名
     */
    private async parseRows(primaryKeys: string[], fieldNames: string[], rows: Array<string>, tableName: string) {
        let tempRow = '';
        try {
            if (this.parsePolicy.isAllDataAndAllInsert(tableName)) {
                const sql = 'delete from ' + tableName;
                await sqlite.execSql(new SyncDownloadLogic(), sql, []);
                for (const row of rows) {
                    tempRow = row;

                    const map = this.createContentValues(tableName, fieldNames, this.getRowValue(row), true);
                    const result = this.getSqlInsert(map);
                    const sqlInsert = `insert into ${tableName} ` + `(${result[0]})` + `values (${result[1]})`;
                    await sqlite.execSql(new SyncDownloadLogic(), sqlInsert, this.getArrayByMap(map));
                }
            } else {
                for (const row of rows) {
                    tempRow = row;
                    const rowValue = this.getRowValue(row);
                    if (this.isRowValueInDb(primaryKeys, fieldNames, rowValue, tableName)) {
                        const map = this.createContentValues(tableName, fieldNames, rowValue, false);
                        const result = this.getSqlUpdate(map);
                        const sqlUpdate = `update ${tableName} set ` + `(${result})` +
                            `where (${this.getTableWhereCondition(primaryKeys)})`;
                        await sqlite.execSql(new SyncDownloadLogic(), sqlUpdate,
                            this.getPrimaryKeyValues(primaryKeys, fieldNames, rowValue));
                    } else {
                        const map = this.createContentValues(tableName, fieldNames, rowValue, true);
                        const result = this.getSqlInsert(map);
                        const sqlInsert = `insert into ${tableName} ` + `(${result[0]})` + `values (${result[1]})`;
                        await sqlite.execSql(new SyncDownloadLogic(), sqlInsert, this.getArrayByMap(map));
                    }
                }
            }
        } catch (e) {
            console.error(e, `tableName = ${tableName}`, `row = ${tempRow}`);
            await AppLogManager.insertErrorMsg(ExceptionType.ERROR, `tableName = ${tableName} row = ${tempRow}`, e);
            throw e;
        }
    }

    private getSqlInsert(map: Map<string, string>): string[] {
        const keyList = [];
        const tempList = [];

        map.forEach((value, key) => {
            keyList.push(key);
            tempList.push('?');
        });

        const result = [];
        result.push(keyList.join(','));
        result.push(tempList.join(','));
        return result;
    }

    private getSqlUpdate(map: Map<string, string>): string {
        const result = [];
        map.forEach((value, key) => {
            result.push(''.concat(key).concat(' = ').concat(value));
        });
        return result.join(',');
    }

    private getArrayByMap(map: Map<string, string>): string[] {
        const valueList = [];
        map.forEach((value, key) => {
            valueList.push(value);
        });
        return valueList;
    }

    /**
     * 创建数据库行对象
     * @param fieldNames 服务端返回的列名数组
     * @param rowValue 服务端返回的某行
     * @return xxx
     */
    private createContentValues(tableName: string, fieldNames: string[], rowValue: string[], isAddId: boolean): Map<string, string> {
        const contentValues = new Map<string, string>();
        let index = 0;
        for (const fieldName of fieldNames) {
            contentValues.set(fieldName, rowValue[index++]);
        }
        const uuidContentValues = SyncDownloadUtil.createContentValue(tableName, isAddId);
        if (uuidContentValues != null) {
            uuidContentValues.forEach((value, key) => {
                contentValues.set(key, value);
            });
        }
        return contentValues;
    }

    /**
     * 获取主键列表对应的各个值
     * @param primaryKeys 主键列表
     * @param fieldNames 服务端返回的列名数组
     * @param rowValue 服务端返回的某行
     * @return xxx
     */
    private getPrimaryKeyValues(primaryKeys: string[], fieldNames: string[], rowValue: string[]): string[] {
        const primaryKeyValues = [];
        let index = 0;
        let position = 0;
        for (const primaryKey of primaryKeys) {
            position = 0;
            for (const fieldName of fieldNames) {
                if (fieldName.toLowerCase() === primaryKey.toLowerCase()) {
                    primaryKeyValues[index] = rowValue[position];
                }
                position++;
            }
            index++;
        }
        return primaryKeyValues;
    }


    /**
     * 根据主键列表查询该行是否存在本地数据库中
     * @param primaryKeys 主键列表
     * @param fieldNames 服务端返回的列名数组
     * @param rowValue 服务端返回的某行
     * @param tableName 表名
     * @return xxx
     */
    private async isRowValueInDb(primaryKeys: string[], fieldNames: string[], rowValue: string[], tableName: string): Promise<boolean> {
        try {
            const selection = this.getTableWhereCondition(primaryKeys);

            const values = this.getPrimaryKeyValues(primaryKeys, fieldNames, rowValue);
            if (values.length === 0) {
                return false;
            } // 没有指定跟新的主键
            if (!values[0]) {
                return false;
            } // 指定跟新的主键不在服务端返回的列名数组中

            const sql = `select * from ${tableName} where ` + selection;
            const result = await sqlite.fromSqlByJs(DB_NAME, sql, values);
            if (result) {
                return true;
            }
        } catch (e) {
            console.error(e);
            await AppLogManager.insertError(ExceptionType.ERROR, e);
            throw e;
        }
        return false;
    }

    /**
     * 根据主键列表拼接where子句（例如 key1 = ? and key2 = ?）
     * @param primaryKeys 主键列表
     * @return xxx
     */
    private getTableWhereCondition(primaryKeys: string[]): string {
        let selection = '';
        for (const key of primaryKeys) {
            selection = selection.concat(key).concat(' = ? and ');
        }
        if (selection.length > 0) {
            return selection.substring(0, selection.length - 4);
        }
        return selection.toString();
    }

    /**
     * 得到表名的主键列表
     * @param tableName 表名
     * @return xxx
     */
    private async getTablePrimaryKeys(tableName: string): Promise<string[]> {
        try {
            const result = await sqlite.queryFirst(new SyncDownloadLogic(), {TableName: tableName});
            if (result) {
                const primaryKeyStr = result.keys;
                return this.getPrimaryKeys(primaryKeyStr);
            }
        } catch (e) {
            console.error(e);
            await AppLogManager.insertError(ExceptionType.ERROR, e);
            throw e;
        }
        return null;
    }

    /**
     * 将行字符串转化为字符串数组（例如：no1|name1|age1）
     * @param rowValueStr ML_PDADownloadLogic表中的主键列表字符串
     * @return xxx
     */
    private getRowValue(rowValueStr: string): string[] {
        return rowValueStr.split(SyncConfig.ROW_SEPARATOR, -1);
    }

    /**
     * 将主键列表字符串转化为字符串数组（例如：no1;no2;no3）
     * @param primaryKeyStr ML_PDADownloadLogic表中的主键列表字符串
     * @return xxx
     */
    private getPrimaryKeys(primaryKeyStr: string): string[] {
        return primaryKeyStr.split(SyncConfig.PRIMARY_KEY_SEPARATOR);
    }

    /**
     * 将列明字符串转化为字符串数组（例如：no,name,age）
     * @param fields 服务端返回的列明字符串
     * @return xxx
     */
    private getFieldNames(fields: string): string[] {
        return fields.split(SyncConfig.FIELD_SEPARATOR);
    }

    /**
     * 指定表是否在本地数据库中
     * @param tableName 表名
     * @return xxx
     */
    private async isTableInDb(tableName: string): Promise<boolean> {
        try {
            const sql = `select * from sqlite_master where type = 'table' and lower(NAME) = ?`;
            const result = await sqlite.fromSqlFirstByJs(DB_NAME, sql, [tableName.toLowerCase()]);
            if (!result) {
                console.error(`表不存在:${tableName}`);
                await AppLogManager.insert(ExceptionType.ERROR, `表不存在:${tableName}`);
                return false;
            }
        } catch (e) {
            console.error(e);
            await AppLogManager.insertError(ExceptionType.ERROR, e);
            throw e;
        }
        return true;
    }

    /**
     * 指定的列名是否存在本地数据库中
     * @param fieldNames 列名字符串数组
     * @param tableName 表名
     * @return xxx
     */
    private async isColumnInTable(fieldNames: string[], tableName: string): Promise<boolean> {
        try {
            for (const fieldName of fieldNames) {
                const sql = `select * from sqlite_master where type = 'table' and lower(NAME) = ? and sql like ?`;
                const result = await sqlite.fromSqlFirstByJs(DB_NAME, sql, [tableName.toLowerCase(), `%${fieldName.toLowerCase()}%`]);
                if (!result) {
                    console.log(`表: ${tableName} 不存在字段: ${fieldName}`);
                    await AppLogManager.insert(ExceptionType.ERROR, `表: ${tableName} 不存在字段: ${fieldName}`);
                    return false;
                }
            }
        } catch (e) {
            console.log(e);
            await AppLogManager.insert(ExceptionType.ERROR, e);
            throw e;
        }
        return true;
    }

    /**
     * 跟新时间戳
     * @param sqLiteDatabase 数据库访问对象
     * @param tableName 表名
     * @param timeStamp 时间戳
     */
    private async updateTimeStamp(tableName: string, timeStamp: string) {
        const sql = 'select * from SyncDownloadLogic where tableName = ?';
        const syncDownloadLogic = await sqlite.fromSqlFirst(new SyncDownloadLogic(), sql, [tableName]);
        syncDownloadLogic.timeStamp = timeStamp;
        syncDownloadLogic.transferred = '1';
        await sqlite.update(syncDownloadLogic);
    }

}
