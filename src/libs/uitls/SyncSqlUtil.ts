/**
 * Copyright  Shanghai eBest Information Technology Co. Ltd  2019 All rights reserved.
 *
 * Author:    张国鹏
 * email:     guopeng.zhang@ebestmobile.com
 * Date:      2019/7/4:17:07
 */

export class SyncSqlUtil {
    private static readonly PRIMARY_VALUE_SEPARATOR = ';';
    private static readonly MARK = 'UPLOAD_UNIQUE_ID_VALUES_MARK';
    private static readonly EQ = '=';
    private static readonly IN = 'in';

    static getStringByUniqueIdValues(uniqueIdValues: string[]): string {
        if (uniqueIdValues == null || uniqueIdValues.length === 0) {
            return null;
        }

        let sb = '';
        for (const str of uniqueIdValues) {
            sb = sb.concat(str).concat(SyncSqlUtil.PRIMARY_VALUE_SEPARATOR);
        }
        return sb.substring(0, sb.length - 1);
    }

    static getUniqueIdValuesByString(uniqueIdValuesStr: string): string[] {
        if (uniqueIdValuesStr == null) {
            return null;
        }
        return uniqueIdValuesStr.split(SyncSqlUtil.PRIMARY_VALUE_SEPARATOR);
    }

    static buildSql(resSql: string, uniqueIdValues: string[]): string {
        if (!resSql.includes(SyncSqlUtil.MARK)) {
            return resSql;
        }
        if (uniqueIdValues == null || uniqueIdValues.length === 0) {
            throw new Error('SQL里面主键指定了，但是没有传值');
        }
        let replace = '';
        if (uniqueIdValues.length === 1) {
            replace = replace.concat(SyncSqlUtil.EQ).concat('\'').concat(uniqueIdValues[0]).concat('\'');
        } else {
            replace = replace.concat(SyncSqlUtil.IN).concat('(');
            for (let i = 0; i < uniqueIdValues.length; i++) {
                if (i < uniqueIdValues.length - 1) {
                    replace = replace.concat('\'').concat(uniqueIdValues[i]).concat('\'').concat(',');
                } else {
                    replace = replace.concat('\'').concat(uniqueIdValues[i]).concat('\'');
                }
            }
            replace.concat(')');
        }
        const buildSql = resSql.replace(SyncSqlUtil.MARK, replace);
        console.log(buildSql);
        return buildSql;
    }

}
